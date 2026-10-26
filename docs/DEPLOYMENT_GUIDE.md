# Harshali Bhamare - Portfolio Setup & Free Deployment Guide

This guide explains how your full-stack portfolio works, how to manage it, and how to deploy it for free with zero watermarks.

---

## 1. Project Architecture Overview

Your portfolio is designed with clean, modular, production-grade architecture:

- **Frontend**: React 19 + TypeScript + Tailwind CSS with high-performance animations (`motion`), responsive layout, and dark-navy/purple computer-engineering theme.
- **Active Backend (Default)**: Full-stack Express server (`server.ts`) running directly in Node.js. It handles the contact form API, database persistence in `./data/contact_messages.json`, cryptographic password hashing with salts, and secure admin token sessions.
- **Python Companion Backend**: Located in `backend_flask/app.py`. If you prefer running Python Flask, you can run this script directly with `python backend_flask/app.py`.
- **Database**:
  - Out of the box: Embedded persistent atomic JSON database in `./data/contact_messages.json` (no external service required).
  - PostgreSQL / Supabase: Schema and Row-Level Security rules provided in `database/schema.sql`.
- **Resume PDF**: Stored directly in `/public/Harshali_Bhamare_Resume.pdf` and `/public/assets/aistudio/Harshali_Bhamare_Resume__4__68ae79a9.pdf`.

---

## 2. Managing Your Resume PDF

1. **Location**:
   Your resume is located at:
   `public/Harshali_Bhamare_Resume.pdf`
2. **Replacing It**:
   Whenever you update your resume, simply export your new resume as a PDF, rename it to `Harshali_Bhamare_Resume.pdf`, and replace the file in the `public` folder.
3. **Download Button**:
   The website's "Download Resume" buttons directly trigger the download with the professional filename `Harshali_Bhamare_Resume.pdf`. No login required for recruiters!

---

## 3. Administrator Dashboard & Security

1. **Accessing the Dashboard**:
   Click the **Admin Portal** lock icon in the top navigation bar or the footer link "Admin Access".
2. **Default Credentials**:
   - Username: `admin`
   - Default Setup Password: `HarshaliAdmin2026!`
3. **Changing Your Password**:
   - Once logged into the Admin Dashboard, click the **Settings** tab.
   - Enter your current password and choose your new private password (minimum 8 characters).
   - Alternatively, you can set the environment variable `ADMIN_PASSWORD` in your hosting provider's dashboard.
4. **Features**:
   - View real-time message count, unread count, and read count.
   - Read message contents with visitor timestamps.
   - Mark messages as read / unread.
   - Delete test or spam messages.
   - Search across names, emails, subjects, and message body.

---

## 4. Free Deployment Options (Zero Watermark)

You have multiple free options to host your portfolio with your own custom domain or free subdomains:

### Option A: Vercel or Netlify (Fastest & 100% Free)
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Harshali's portfolio"
   git remote add origin https://github.com/BhamareHarshali/portfolio.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) using your GitHub account.
3. Click **"Add New Project"** and select your repository.
4. Framework preset: **Vite**.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Click **Deploy**. Your site will be live on `https://harshali-bhamare.vercel.app` in seconds!

### Option B: Render or Railway (For Full-Stack with Server & DB)
If you want the Node.js or Python backend running continuously:
1. Go to [Render](https://render.com) (Free Web Service tier).
2. Connect your GitHub repository.
3. Build command: `npm install && npm run build`.
4. Start command: `npm start`.
5. Add Environment Variable:
   - `ADMIN_PASSWORD`: Your secret admin password.

### Option C: Supabase (Free PostgreSQL Database)
1. Create a free account at [Supabase](https://supabase.com).
2. Click **New Project** and name it `harshali-portfolio`.
3. Open the **SQL Editor** in the Supabase dashboard.
4. Copy and paste the contents of `database/schema.sql` and click **Run**.
5. Your database table `contact_messages` with secure Row Level Security policies is immediately active!

---

## 5. Customizing Your Social & Project Links

All your project information, skill items, education records, and social URLs are organized in one single file:
`src/data/portfolioData.ts`

- To update your GitHub or LinkedIn URLs:
  Change `githubUrl` and `linkedinUrl` in `PERSONAL_INFO`.
- To update your project repository links:
  Change `githubUrl` in `PROJECTS`.
