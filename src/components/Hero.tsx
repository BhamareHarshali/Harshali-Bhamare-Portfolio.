import React from 'react';
import { ArrowRight, Download, Mail, Terminal, Award, Code2, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResumePreview: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumePreview }) => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Available for Software & Full-Stack Engineering Roles</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Nashik, India</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">{PERSONAL_INFO.name}</span>
            </h1>

            <p className="text-2xl sm:text-3xl font-semibold text-slate-200 tracking-tight">
              {PERSONAL_INFO.role}
            </p>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              {PERSONAL_INFO.tagline}
            </p>

            {/* 3 Prominent Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                download={PERSONAL_INFO.resumeFilename}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-slate-600 rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-800/40 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick Resume View link */}
            <div className="pt-1">
              <button
                onClick={onOpenResumePreview}
                className="text-xs text-slate-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Direct PDF viewer available (no download required)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Container */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Outer decorative gradient frame */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-sm opacity-75 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0b1126] shadow-2xl">
                {/* Visual Header Strip */}
                <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">harshali_portfolio.py</span>
                  <span className="text-[11px] font-mono text-cyan-400">Python 3.12</span>
                </div>

                {/* Hero Image */}
                <img
                  src="/images/hero_dev_workspace_1793010974800.jpg"
                  alt="Harshali Bhamare developer workstation with Python programming environment"
                  className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Glassmorphic code banner */}
                <div className="p-4 bg-slate-950/80 backdrop-blur-md border-t border-slate-800/80">
                  <div className="font-mono text-xs text-slate-300 space-y-1">
                    <p className="text-slate-500"># Focus: Python Web Services & Computer Vision</p>
                    <p>
                      <span className="text-purple-400">def</span> <span className="text-cyan-300">build_solution</span>(concept, tech_stack):
                    </p>
                    <p className="pl-4 text-emerald-400">return "Practical, responsive, reliable software"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proof & Credentials Row below the Hero Split */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400">
              <GraduationCap className="w-4 h-4" />
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Education</span>
            </div>
            <div className="text-xl font-bold text-white tabular-nums">8.93 CGPA</div>
            <p className="text-xs text-slate-400">B.Tech Computer Science, Sandip University</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-purple-400">
              <Code2 className="w-4 h-4" />
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Internships</span>
            </div>
            <div className="text-xl font-bold text-white tabular-nums">3 Roles</div>
            <p className="text-xs text-slate-400">Nexanova, YBI Foundation & Caliber InfoTech</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-400">
              <Terminal className="w-4 h-4" />
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Core Stack</span>
            </div>
            <div className="text-xl font-bold text-white">Python & Flask</div>
            <p className="text-xs text-slate-400">With React, MySQL & REST APIs</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400">
              <Award className="w-4 h-4" />
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Competition</span>
            </div>
            <div className="text-xl font-bold text-white">1st Place</div>
            <p className="text-xs text-slate-400">National Level among 200+ engineers</p>
          </div>
        </div>
      </div>
    </section>
  );
};
