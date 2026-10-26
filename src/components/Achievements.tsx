import React from 'react';
import { Trophy, Award, ShieldCheck, CheckCircle } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>05</span>
            <span aria-hidden="true">/</span>
            <span>Honors & Validation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Awards, Hackathons & Professional Certifications
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Recognitions earned through competitive hackathons, technical symposiums, and professional skill verifications.
          </p>
        </div>

        {/* Highlight 1st Place National Level Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 border border-amber-500/30 backdrop-blur-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <span>First Place Champion</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>200+ Participants</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  National Level Project Competition
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Secured 1st place among over 200 competitive engineering teams for developing and presenting innovative, high-impact software architecture.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Verified Achievement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid of the 4 other honors & certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACHIEVEMENTS_DATA.slice(1).map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-cyan-300 bg-slate-800/60 px-2.5 py-1 rounded border border-slate-700">
                  {item.category}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Issued by {item.organization}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                {item.details}
              </p>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Documented in Official Resume</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
