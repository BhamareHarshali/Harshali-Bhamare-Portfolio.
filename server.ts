import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const DATA_DIR = path.resolve(process.cwd(), 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'contact_messages.json');
const ADMIN_CONFIG_FILE = path.join(DATA_DIR, 'admin_config.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory active admin sessions (token -> expiry timestamp)
const activeSessions = new Map<string, number>();

// Helper to hash password with salt
function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, actualSalt, 64);
  return {
    hash: derivedKey.toString('hex'),
    salt: actualSalt,
  };
}

function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(Buffer.from(storedHash, 'hex'), derivedKey);
}

// Initialize Admin Config
function getAdminConfig() {
  if (fs.existsSync(ADMIN_CONFIG_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(ADMIN_CONFIG_FILE, 'utf-8'));
    } catch {
      // Fallback
    }
  }

  // Initial setup: Default admin password is set from env or created as "HarshaliAdmin2026!"
  const initialPassword = process.env.ADMIN_PASSWORD || 'HarshaliAdmin2026!';
  const { hash, salt } = hashPassword(initialPassword);
  const config = {
    username: 'admin',
    email: 'harshalibhamare729@gmail.com',
    passwordHash: hash,
    salt,
    isDefaultPassword: !process.env.ADMIN_PASSWORD,
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(ADMIN_CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
  return config;
}

// Load contact messages
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
  ip?: string;
}

function getMessages(): ContactMessage[] {
  if (fs.existsSync(MESSAGES_FILE)) {
    try {
      const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading messages file, returning empty array:', e);
      return [];
    }
  }
  return [];
}

function saveMessages(messages: ContactMessage[]) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
}

// Seed initial demo message if empty so Harshali can test dashboard immediately
const currentMessages = getMessages();
if (currentMessages.length === 0) {
  const initialSeed: ContactMessage[] = [
    {
      id: 'msg-seed-001',
      name: 'Tech Recruiter',
      email: 'recruiter@techventures.example',
      subject: 'Interview Invitation: Python / Full-Stack Developer',
      message: 'Hello Harshali, your portfolio and projects (especially the Digital Ration Card System and VisionFly AI) are very impressive. We have an opening for a Python / Full-Stack engineer.',
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      is_read: false,
    },
  ];
  saveMessages(initialSeed);
}

// Middleware
app.use(express.json({ limit: '100kb' }));

// Auth middleware for protected admin endpoints
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid authorization token.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const expiry = activeSessions.get(token);

  if (!expiry || expiry < Date.now()) {
    activeSessions.delete(token);
    res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
    return;
  }

  // Extend session by 2 hours
  activeSessions.set(token, Date.now() + 1000 * 60 * 60 * 2);
  next();
}

// Rate limiting in memory map for contact form submissions (max 5 per 15 minutes per IP)
const submissionRateMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 5;

  const timestamps = submissionRateMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false;
  }

  validTimestamps.push(now);
  submissionRateMap.set(ip, validTimestamps);
  return true;
}

/* ==========================================================================
   API ENDPOINTS
   ========================================================================== */

// 1. Submit contact message (Public)
app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

    if (!checkRateLimit(ip)) {
      res.status(429).json({
        error: 'Too many requests. Please wait a few minutes before submitting another message.',
      });
      return;
    }

    const { name, email, subject, message } = req.body;

    // Field presence validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      res.status(400).json({ error: 'Full Name is required.' });
      return;
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      res.status(400).json({ error: 'Email Address is required.' });
      return;
    }

    // Email format validation (RFC-compliant regex check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      res.status(400).json({ error: 'Subject is required.' });
      return;
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Message content is required.' });
      return;
    }

    if (name.length > 100 || subject.length > 150 || message.length > 3000) {
      res.status(400).json({ error: 'Input exceeds maximum allowed length.' });
      return;
    }

    const newMessage: ContactMessage = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      created_at: new Date().toISOString(),
      is_read: false,
    };

    const messages = getMessages();
    messages.unshift(newMessage);
    saveMessages(messages);

    res.status(201).json({
      success: true,
      message: 'Your enquiry has been received successfully! Harshali will get back to you shortly.',
      id: newMessage.id,
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to save enquiry due to an internal server error.' });
  }
});

// 2. Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    if (!password || typeof password !== 'string') {
      res.status(400).json({ error: 'Password is required.' });
      return;
    }

    const config = getAdminConfig();
    const isValid = verifyPassword(password, config.passwordHash, config.salt);

    if (!isValid) {
      res.status(401).json({ error: 'Invalid administrator password.' });
      return;
    }

    // Generate secure session token
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 1000 * 60 * 60 * 4; // 4 hours
    activeSessions.set(token, expiry);

    res.json({
      success: true,
      token,
      admin: {
        username: config.username,
        email: config.email,
        isDefaultPassword: config.isDefaultPassword,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
});

// 3. Admin Change Password
app.post('/api/admin/change-password', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      res.status(400).json({ error: 'New password must be at least 8 characters long.' });
      return;
    }

    const config = getAdminConfig();
    const isValid = verifyPassword(currentPassword, config.passwordHash, config.salt);
    if (!isValid) {
      res.status(401).json({ error: 'Current password incorrect.' });
      return;
    }

    const { hash, salt } = hashPassword(newPassword);
    config.passwordHash = hash;
    config.salt = salt;
    config.isDefaultPassword = false;
    config.updatedAt = new Date().toISOString();

    fs.writeFileSync(ADMIN_CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');

    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ error: 'Failed to update password.' });
  }
});

// 4. Admin Get Messages (Protected)
app.get('/api/admin/messages', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const messages = getMessages();
    const { search, status } = req.query;

    let filtered = [...messages];

    if (status === 'unread') {
      filtered = filtered.filter((m) => !m.is_read);
    } else if (status === 'read') {
      filtered = filtered.filter((m) => m.is_read);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.subject.toLowerCase().includes(q) ||
          m.message.toLowerCase().includes(q)
      );
    }

    const total = messages.length;
    const unreadCount = messages.filter((m) => !m.is_read).length;

    res.json({
      messages: filtered,
      stats: {
        total,
        unread: unreadCount,
        read: total - unreadCount,
      },
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// 5. Admin Mark Message Read/Unread (Protected)
app.patch('/api/admin/messages/:id/read', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { is_read } = req.body;
    const messages = getMessages();
    const messageIndex = messages.findIndex((m) => m.id === id);

    if (messageIndex === -1) {
      res.status(404).json({ error: 'Message not found.' });
      return;
    }

    messages[messageIndex].is_read = typeof is_read === 'boolean' ? is_read : true;
    saveMessages(messages);

    res.json({ success: true, message: messages[messageIndex] });
  } catch (error) {
    console.error('Update message error:', error);
    res.status(500).json({ error: 'Failed to update message.' });
  }
});

// 6. Admin Delete Message (Protected)
app.delete('/api/admin/messages/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const messages = getMessages();
    const newMessages = messages.filter((m) => m.id !== id);

    if (newMessages.length === messages.length) {
      res.status(404).json({ error: 'Message not found.' });
      return;
    }

    saveMessages(newMessages);
    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ error: 'Failed to delete message.' });
  }
});

// 7. System status & check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Harshali Bhamare Portfolio Full-Stack API',
    pythonBackendCompanion: 'Available in /backend_flask',
  });
});

/* ==========================================================================
   VITE DEV / PRODUCTION INTEGRATION
   ========================================================================== */

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
