import React from 'react';
import { X, ExternalLink, FileCheck2, BookmarkCheck, Shield } from 'lucide-react';
import { CitedSource } from '../../types/bis';

interface CitationModalProps {
  citation: CitedSource | null;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({ citation, onClose }) => {
  if (!citation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
        {/* Modal Header */}
        <div className="bg-bis-navy-800 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-bis-saffron" />
            <span className="font-heading font-bold text-sm tracking-wide">
              Official BIS Source Citation
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-slate-800 dark:text-slate-100">
          <div className="flex items-start justify-between gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-bis-saffron/15 text-bis-saffron dark:bg-bis-saffron/25">
              <FileCheck2 className="w-3.5 h-3.5 mr-1" />
              {citation.documentType}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              Ref: {citation.referenceNumber}
            </span>
          </div>

          <div>
            <h3 className="font-heading font-bold text-base text-bis-navy-800 dark:text-white">
              {citation.title}
            </h3>
            {citation.clauseOrSection && (
              <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-1">
                Clause / Section: {citation.clauseOrSection}
              </p>
            )}
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
              <BookmarkCheck className="w-3.5 h-3.5 text-bis-saffron" />
              Grounded Citation Text
            </div>
            "{citation.snippet}"
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">
              Verified against BIS statutory records.
            </span>
            {citation.officialUrl && (
              <a
                href={citation.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-bis-saffron hover:text-bis-saffron-hover font-medium transition-colors"
              >
                <span>Open in Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
