import React from 'react';
import { ShieldCheck, Moon, Sun, Sparkles, ExternalLink } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenGapTest: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, onToggleTheme, onOpenGapTest }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-bis-navy-700/20 bg-bis-navy-800 text-white shadow-md">
      {/* Top Banner / Gazette Ticker */}
      <div className="bg-bis-navy-900 border-b border-bis-navy-700/40 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-bis-saffron text-white uppercase tracking-wider animate-pulse">
              Live QCO Alert
            </span>
            <span className="truncate text-slate-300">
              Mandatory QCO notified for Footwear, Toys (IS 9873), EV Batteries (IS 16046) & Solar Panels | All manufacturers must obtain BIS License
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-[11px] text-slate-300 shrink-0">
            <a href="https://manakonline.in" target="_blank" rel="noreferrer" className="hover:text-bis-saffron flex items-center gap-1 transition-colors">
              Manakonline Portal <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-medium">SIH 2026: PS SIH26107</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Official Emblem & Branding */}
          <div className="flex items-center space-x-3.5">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-bis-saffron to-amber-400 text-bis-navy-900 font-black shadow-glow-saffron">
              <ShieldCheck className="w-7 h-7 text-bis-navy-900 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  BIS Intelligent Compliance
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bis-saffron/20 border border-bis-saffron/40 text-bis-saffron">
                  AI Grounded
                </span>
              </div>
              <p className="text-[11px] text-slate-300 tracking-wide font-normal">
                Bureau of Indian Standards • Ministry of Consumer Affairs, Food & Public Distribution
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenGapTest}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-slate-100 hover:text-white transition-all btn-press shadow-sm"
              title="Run MSME Compliance Gap Self-Assessment"
            >
              <Sparkles className="w-3.5 h-3.5 text-bis-saffron" />
              <span>MSME Readiness Score</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-lg bg-bis-navy-900/80 hover:bg-bis-navy-700 text-slate-300 hover:text-white border border-bis-navy-700/60 transition-colors btn-press"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
