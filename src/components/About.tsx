import React from 'react';
import { Database, Server, Laptop, Cpu, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Server,
      title: 'Python & Backend Architecture',
      description:
        'Building scalable Python services, lightweight Flask web apps, and cleanly structured RESTful APIs with efficient request handling.',
    },
    {
      icon: Database,
      title: 'Relational Database Engineering',
      description:
        'Designing relational schemas, performing CRUD operations, and writing indexed queries across MySQL and SQLite environments.',
    },
    {
      icon: Laptop,
      title: 'Modern Web Frontends',
      description:
        'Developing responsive, intuitive user interfaces with modern React, JavaScript (ES6+), semantic HTML5, and responsive styling.',
    },
    {
      icon: Cpu,
      title: 'Computer Vision & AI Logic',
      description:
        'Applying OpenCV and MediaPipe landmark tracking to create gesture-controlled human-computer interfaces and intelligent game systems.',
    },
  ];

  return (
    <section id="about" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Story & Background */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>01</span>
              <span aria-hidden="true">/</span>
              <span>About Me</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              A disciplined foundation in software engineering and practical problem-solving.
            </h2>

            <div className="text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base">
              <p>
                I am a Computer Science graduate holding a Bachelor of Technology in Computer Science from <strong className="text-white font-semibold">Sandip University, Nashik</strong> with an academic record of <strong className="text-cyan-400 font-semibold tabular-nums">8.93 CGPA</strong>, preceded by a Diploma in Computer Engineering from Rajshri Shahu Maharaj Polytechnic (76%).
              </p>
              <p>
                My passion lies in crafting reliable software solutions—ranging from web-based record management portals and automated workflows to real-time computer vision interfaces. I have practical experience writing Python applications, developing Flask backends, and integrating dynamic frontends with relational databases.
              </p>
              <p>
                As an aspiring software engineer, I prioritize writing clean, maintainable code guided by Object-Oriented principles, efficient algorithms, and robust testing. I am eager to contribute to forward-thinking engineering teams and solve meaningful real-world challenges.
              </p>
            </div>

            {/* Quick verification points */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Object-Oriented Programming (OOP)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Data Structures & Algorithms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>REST API & CRUD Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Git & GitHub Version Control</span>
              </div>
            </div>
          </div>

          {/* Right Column: Focus Areas */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}

            {/* Summary Highlight Box */}
            <div className="sm:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 to-purple-950/40 border border-blue-900/40 space-y-2">
              <div className="text-xs font-mono text-cyan-300">Degree & Performance</div>
              <div className="text-sm font-semibold text-white">
                B.Tech in Computer Science · Sandip University, Nashik
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <span>Current CGPA: <strong className="text-cyan-400 font-bold tabular-nums">8.93 / 10</strong></span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Graduating 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
