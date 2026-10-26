import React from 'react';
import { Download, Shield, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenResumePreview: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenResumePreview }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#040711] text-slate-400 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <a href="#" className="text-base font-bold text-white hover:text-cyan-400 transition-colors">
              {PERSONAL_INFO.name}
            </a>
            <p className="text-xs text-slate-400">
              Python Developer · Full-Stack Developer · Computer Science Engineer
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#achievements" className="hover:text-cyan-400 transition-colors">Achievements</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
            </a>
            <button
              onClick={onOpenResumePreview}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
              title="Preview Resume"
              aria-label="Preview Resume"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4 text-purple-400" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} Harshali Bhamare. Built with React, TypeScript & Python-ready backend architecture.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download={PERSONAL_INFO.resumeFilename}
              className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>
            <span aria-hidden="true" className="text-slate-800">·</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-cyan-400 transition-colors"
            >
              Admin Access
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
