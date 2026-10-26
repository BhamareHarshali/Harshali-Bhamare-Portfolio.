import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Mail,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Settings,
  Shield,
  Key,
  Calendar,
  User,
  Inbox,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { ContactMessage } from '../types/portfolio';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('admin_token'));
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'messages' | 'settings'>('messages');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [fetching, setFetching] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Settings state (Password change)
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState('');
  const [passChangeError, setPassChangeError] = useState('');
  const [passLoading, setPassLoading] = useState(false);

  useEffect(() => {
    if (token && isOpen) {
      fetchMessages();
    }
  }, [token, isOpen, statusFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setLoginError('Please enter the administrator password.');
      return;
    }

    setLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid administrator password.');
      }

      setToken(data.token);
      sessionStorage.setItem('admin_token', data.token);
      setPassword('');
    } catch (err: any) {
      setLoginError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem('admin_token');
    setMessages([]);
    setSelectedMessage(null);
  };

  const fetchMessages = async () => {
    if (!token) return;
    setFetching(true);

    try {
      let url = `/api/admin/messages?status=${statusFilter}`;
      if (searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      setMessages(data.messages || []);
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setFetching(false);
    }
  };

  const handleToggleRead = async (id: string, currentReadStatus: boolean) => {
    if (!token) return;

    try {
      const res = await fetch(`/api/admin/messages/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_read: !currentReadStatus }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, is_read: !currentReadStatus } : m))
        );
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage({ ...selectedMessage, is_read: !currentReadStatus });
        }
        setStats((prev) => ({
          ...prev,
          unread: currentReadStatus ? prev.unread + 1 : Math.max(0, prev.unread - 1),
          read: currentReadStatus ? Math.max(0, prev.read - 1) : prev.read + 1,
        }));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }
        setStats((prev) => ({
          ...prev,
          total: Math.max(0, prev.total - 1),
        }));
      }
    } catch (err) {
      console.error('Failed to delete enquiry:', err);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      setPassChangeError('Please fill in both current and new password.');
      return;
    }

    if (newPass.length < 8) {
      setPassChangeError('New password must be at least 8 characters long.');
      return;
    }

    setPassLoading(true);
    setPassChangeError('');
    setPassChangeSuccess('');

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: currentPass,
          newPassword: newPass,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update password.');
      }

      setPassChangeSuccess('Password updated successfully! Keep your new password safe.');
      setCurrentPass('');
      setNewPass('');
    } catch (err: any) {
      setPassChangeError(err.message || 'Error updating password.');
    } finally {
      setPassLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-dashboard-title"
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] bg-[#0b1126] border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Administrator Dashboard</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  Protected
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Manage contact enquiries, review client opportunities, and configure security
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Log out of session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!token ? (
          /* Authentication Screen */
          <div className="flex-1 overflow-y-auto p-6 sm:p-12 flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Admin Authorization</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Enter your administrator password to view and manage persistent messages.
                </p>
              </div>

              {/* Informative credentials callout */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <Key className="w-4 h-4" />
                  <span>Setup Credentials</span>
                </div>
                <p className="text-slate-400">
                  Initial setup passkey: <code className="text-cyan-300 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">HarshaliAdmin2026!</code>
                </p>
                <p className="text-[11px] text-slate-500">
                  You can immediately update this to your private password in the Settings tab after logging in, or specify <code className="text-slate-400 font-mono">ADMIN_PASSWORD</code> in your environment variables.
                </p>
              </div>

              {loginError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Administrator Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter administrator password..."
                      disabled={loading}
                      autoFocus
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-xl transition-colors cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Unlock Dashboard</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Subheader Navigation */}
            <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'messages'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Inbox className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Enquiries ({stats.total})</span>
                  {stats.unread > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                      {stats.unread} new
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5 text-purple-400" />
                  <span>Security & Settings</span>
                </button>
              </div>

              {activeTab === 'messages' && (
                <button
                  onClick={fetchMessages}
                  disabled={fetching}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Refresh list"
                >
                  <RefreshCw className={`w-4 h-4 ${fetching ? 'animate-spin text-cyan-400' : ''}`} />
                </button>
              )}
            </div>

            {activeTab === 'messages' ? (
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left pane: Messages List & Filters */}
                <div className="w-full md:w-5/12 border-r border-slate-800 flex flex-col bg-slate-950/40">
                  {/* Search and Filters */}
                  <div className="p-4 border-b border-slate-800 space-y-3">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && fetchMessages()}
                        placeholder="Search enquiries..."
                        className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setStatusFilter('all')}
                          className={`px-2 py-0.5 rounded ${
                            statusFilter === 'all'
                              ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          All ({stats.total})
                        </button>
                        <span>·</span>
                        <button
                          onClick={() => setStatusFilter('unread')}
                          className={`px-2 py-0.5 rounded ${
                            statusFilter === 'unread'
                              ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Unread ({stats.unread})
                        </button>
                        <span>·</span>
                        <button
                          onClick={() => setStatusFilter('read')}
                          className={`px-2 py-0.5 rounded ${
                            statusFilter === 'read'
                              ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Read ({stats.read})
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* List Container */}
                  <div className="flex-1 overflow-y-auto divide-y divide-slate-850">
                    {messages.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 space-y-2">
                        <Inbox className="w-8 h-8 mx-auto text-slate-600" />
                        <p className="text-xs">No contact enquiries found.</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          onClick={() => setSelectedMessage(msg)}
                          className={`p-4 cursor-pointer transition-colors relative ${
                            selectedMessage?.id === msg.id
                              ? 'bg-slate-800/80 border-l-2 border-cyan-400'
                              : 'hover:bg-slate-900/60'
                          }`}
                        >
                          {!msg.is_read && (
                            <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-cyan-500/20" />
                          )}
                          <div className="space-y-1 pr-4">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-slate-200 truncate">
                                {msg.name}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {new Date(msg.created_at).toLocaleDateString([], {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                            <p className="text-xs font-medium text-cyan-300 truncate">
                              {msg.subject}
                            </p>
                            <p className="text-[11px] text-slate-400 line-clamp-1">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Right pane: Message details view */}
                <div className="w-full md:w-7/12 flex flex-col bg-[#0b1126] overflow-y-auto">
                  {selectedMessage ? (
                    <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-6">
                        {/* Detail Header */}
                        <div className="border-b border-slate-800 pb-5 space-y-3">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-[11px] font-mono text-cyan-400">
                              ID: {selectedMessage.id}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleToggleRead(selectedMessage.id, selectedMessage.is_read)
                                }
                                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                              >
                                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                                <span>
                                  {selectedMessage.is_read ? 'Mark Unread' : 'Mark as Read'}
                                </span>
                              </button>
                              <button
                                onClick={() => handleDelete(selectedMessage.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                                title="Delete enquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-white tracking-tight">
                            {selectedMessage.subject}
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-purple-400 shrink-0" />
                              <span>{selectedMessage.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                              <a
                                href={`mailto:${selectedMessage.email}`}
                                className="text-cyan-400 hover:underline truncate"
                              >
                                {selectedMessage.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 sm:col-span-2 text-slate-400">
                              <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                              <span>
                                {new Date(selectedMessage.created_at).toLocaleString([], {
                                  dateStyle: 'full',
                                  timeStyle: 'short',
                                })}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Message content */}
                        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                          <div className="text-[11px] font-mono text-slate-500">MESSAGE CONTENT</div>
                          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                            {selectedMessage.message}
                          </p>
                        </div>
                      </div>

                      {/* Reply Quick Action */}
                      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                        <a
                          href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                            selectedMessage.subject
                          )}`}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply via Email Client</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-500 space-y-3">
                      <Inbox className="w-12 h-12 text-slate-700" />
                      <p className="text-sm font-medium text-slate-400">
                        Select an enquiry from the list to view full details
                      </p>
                      <p className="text-xs text-slate-500 max-w-sm">
                        You can read messages, reply directly through your email client, or toggle status.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Settings & Security Tab */
              <div className="p-6 sm:p-10 max-w-2xl mx-auto space-y-8 overflow-y-auto">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">Security & Passkey Settings</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Update your administrator password to secure access to inquiries and prevent unauthorized access.
                  </p>
                </div>

                {passChangeSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{passChangeSuccess}</span>
                  </div>
                )}

                {passChangeError && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{passChangeError}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="Enter current password..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      New Password (minimum 8 characters)
                    </label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Enter new strong password..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={passLoading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-xl transition-colors cursor-pointer"
                  >
                    {passLoading ? 'Updating Password...' : 'Save New Password'}
                  </button>
                </form>

                {/* Database instructions */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
                  <p className="font-semibold text-slate-300">Production Deployment Tip:</p>
                  <p>
                    When deploying to Render, Vercel, or Railway, define the <code className="text-cyan-400 font-mono">ADMIN_PASSWORD</code> environment variable in your host dashboard to securely set your secret passkey.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
