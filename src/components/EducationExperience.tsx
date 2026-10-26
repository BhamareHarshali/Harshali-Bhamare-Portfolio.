import React, { useState } from 'react';
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2, Building2 } from 'lucide-react';
import { EDUCATION_DATA, EXPERIENCE_DATA } from '../data/portfolioData';

export const EducationExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  return (
    <section id="experience" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header with Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>04</span>
              <span aria-hidden="true">/</span>
              <span>Career Trajectory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Work Experience & Academic Education
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Software engineering internships and formal computer science qualifications documented accurately from resume credentials.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'experience'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Experience ({EXPERIENCE_DATA.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'education'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education ({EDUCATION_DATA.length})</span>
            </button>
          </div>
        </div>

        {/* Content View */}
        {activeTab === 'experience' ? (
          <div className="space-y-6">
            {EXPERIENCE_DATA.map((exp, index) => (
              <div
                key={exp.id}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 transition-all space-y-6"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-400">0{index + 1}</span>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                      <span className="flex items-center gap-1 font-medium text-slate-200">
                        <Building2 className="w-3.5 h-3.5 text-purple-400" />
                        {exp.company}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60 self-start sm:self-center">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Achievements points */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Tools utilized */}
                <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-800/60">
                  <span className="text-xs font-mono text-slate-400">Tools:</span>
                  {exp.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono text-slate-300 bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION_DATA.map((edu) => (
              <div
                key={edu.id}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-cyan-400">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-700">
                      {edu.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">
                      {edu.institution}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {edu.location}
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                    {edu.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 shrink-0 font-bold">›</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Score Banner */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{edu.scoreLabel}</span>
                  <span className="text-base font-bold text-cyan-400 font-mono tabular-nums">
                    {edu.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
