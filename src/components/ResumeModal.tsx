import React from 'react';
import { X, Download, FileText, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-4xl h-[92vh] sm:h-[90vh] bg-[#0b1126] border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h3 id="resume-modal-title" className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2 truncate">
                <span className="truncate">Harshali Bhamare — Resume</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified PDF
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 truncate">
                Sandip University B.Tech CS (8.93 CGPA) · Python & Full-Stack Developer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download={PERSONAL_INFO.resumeFilename}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close resume viewer (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Iframe Viewer with robust fallback */}
        <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-hidden relative flex flex-col">
          <object
            data={`${PERSONAL_INFO.resumeUrl}#toolbar=1&navpanes=0`}
            type="application/pdf"
            className="w-full h-full rounded-lg border border-slate-800 bg-white"
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900 rounded-lg border border-slate-800 space-y-4">
              <FileText className="w-12 h-12 text-cyan-400 mx-auto" />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">Harshali Bhamare Resume PDF</h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  Your browser does not support inline PDF preview. You can view or download the actual resume directly:
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700"
                >
                  Open in New Tab
                </a>
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  download={PERSONAL_INFO.resumeFilename}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </object>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 gap-2 shrink-0">
          <p className="truncate">
            Source: <code className="text-cyan-300 font-mono text-[11px]">public/Harshali_Bhamare_Resume.pdf</code>
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              Open in new tab
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
