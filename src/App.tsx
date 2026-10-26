import React, { useState } from 'react';
import { BackgroundGrid } from './components/BackgroundGrid';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { EducationExperience } from './components/EducationExperience';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { AdminDashboard } from './components/AdminDashboard';
import { PERSONAL_INFO } from './data/portfolioData';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);

  // Structured JSON-LD schema for high-precision technical SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    jobTitle: 'Python Developer & Full-Stack Developer',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Sandip University, Nashik',
    },
    url: 'https://harshali-bhamare.example.com',
    email: PERSONAL_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nashik',
      addressRegion: 'Maharashtra',
      addressCountry: 'India',
    },
    sameAs: [
      PERSONAL_INFO.githubUrl,
      PERSONAL_INFO.linkedinUrl,
    ],
    knowsAbout: [
      'Python',
      'Flask',
      'React',
      'MySQL',
      'Computer Vision',
      'OpenCV',
      'MediaPipe',
      'REST APIs',
      'Full-Stack Web Development',
    ],
  };

  return (
    <div className="relative min-h-screen bg-[#060a16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Search Engine Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Atmospheric Grid & Subtle Ambient Glow */}
      <BackgroundGrid />

      {/* Navigation Bar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenResumePreview={() => setIsResumePreviewOpen(true)}
      />

      {/* Page Sections */}
      <main className="flex-1">
        <Hero onOpenResumePreview={() => setIsResumePreviewOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <EducationExperience />
        <Achievements />
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenResumePreview={() => setIsResumePreviewOpen(true)}
      />

      {/* Full-Screen Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumePreviewOpen}
        onClose={() => setIsResumePreviewOpen(false)}
      />

      {/* Protected Admin Management Portal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
