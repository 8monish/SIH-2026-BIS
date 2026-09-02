import React from 'react';
import { Shield, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-bis-navy-900 border-t border-bis-navy-700/50 text-slate-400 text-xs py-8 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center space-x-2 text-white font-heading font-bold text-sm">
              <Shield className="w-4 h-4 text-bis-saffron" />
              <span>BIS Intelligent Compliance Assistant</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed max-w-md">
              Developed for **Smart India Hackathon 2026** (Problem Statement ID: SIH26107). 
              Grounded on official Bureau of Indian Standards (BIS) gazette notifications, Indian Standards (IS), and Manakonline regulatory schemes.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 mb-2.5 text-xs uppercase tracking-wider">Official Portals</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <a href="https://www.bis.gov.in" target="_blank" rel="noreferrer" className="hover:text-bis-saffron flex items-center gap-1 transition-colors">
                  Bureau of Indian Standards <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://manakonline.in" target="_blank" rel="noreferrer" className="hover:text-bis-saffron flex items-center gap-1 transition-colors">
                  Manakonline e-BIS Portal <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://www.crsbis.in" target="_blank" rel="noreferrer" className="hover:text-bis-saffron flex items-center gap-1 transition-colors">
                  CRS Electronics Registration <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://egazette.gov.in" target="_blank" rel="noreferrer" className="hover:text-bis-saffron flex items-center gap-1 transition-colors">
                  eGazette Notifications <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 mb-2.5 text-xs uppercase tracking-wider">Compliance Schemes</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><span className="text-slate-300">Scheme-I:</span> ISI Standard Mark</li>
              <li><span className="text-slate-300">Scheme-II:</span> Compulsory Registration (CRS)</li>
              <li><span className="text-slate-300">Scheme-IV:</span> Foreign Manufacturers (FMCS)</li>
              <li><span className="text-slate-300">Scheme-V:</span> Hallmarking (6-digit HUID)</li>
              <li><span className="text-slate-300">Eco-Mark:</span> Sustainability Standard</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <div>
            © 2026 Bureau of Indian Standards (SIH 2026 Prototype). All citations verified from official BIS sources.
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center text-emerald-400 gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              All RAG Knowledge Bases Synced
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
