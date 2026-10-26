import React, { useState } from 'react';
import { Terminal, Database, Layout, Wrench, Binary, Layers } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.title)];

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case 'Programming Languages':
        return Terminal;
      case 'Backend Development':
        return Layers;
      case 'Frontend Development':
        return Layout;
      case 'Databases & Storage':
        return Database;
      case 'Developer Tools':
        return Wrench;
      case 'Computer Science Fundamentals':
        return Binary;
      default:
        return Terminal;
    }
  };

  const displayedCategories =
    activeCategory === 'All'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.title === activeCategory);

  return (
    <section id="skills" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>02</span>
            <span aria-hidden="true">/</span>
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Technical Skills & Computer Science Foundation
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Practical proficiencies across Python engineering, modern frontend interfaces, relational database design, and algorithmic problem-solving.
          </p>
        </div>

        {/* Prominent Python Spotlight Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900/60 border border-cyan-500/30 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-[circle_at_right,rgba(56,189,248,0.1),transparent_70%] pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-sm bg-cyan-400" />
                <span>Primary Specialization</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Python Core & Application Ecosystem</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Proficient in Python for building web backends (Flask), computer vision pipelines (OpenCV & MediaPipe), desktop graphical interfaces (Tkinter), and data handling.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/90 text-cyan-300 border border-cyan-500/30 font-mono">Python 3.x</span>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700 font-mono">Flask APIs</span>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700 font-mono">OpenCV / MediaPipe</span>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700 font-mono">OOP & Algorithms</span>
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((category) => {
            const Icon = getCategoryIcon(category.title);
            return (
              <div
                key={category.title}
                className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white tracking-tight">
                        {category.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills List in Category */}
                  <div className="space-y-3 pt-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700/60 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold ${skill.featured ? 'text-cyan-300' : 'text-slate-200'}`}>
                            {skill.name}
                          </span>
                          {skill.featured && (
                            <span className="text-[10px] font-mono text-cyan-400">Core</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
