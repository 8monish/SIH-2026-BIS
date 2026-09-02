import React from 'react';
import { MessageSquareCode, BookOpenCheck, MapPin, Milestone, CheckCircle2 } from 'lucide-react';

export type ActiveTab = 'chat' | 'standards' | 'roadmap' | 'labs' | 'gap_analysis';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'chat', label: 'AI Compliance Chat', icon: MessageSquareCode, badge: 'Live RAG' },
    { id: 'standards', label: 'Indian Standards Matrix', icon: BookOpenCheck, count: '10+ IS' },
    { id: 'roadmap', label: '5-Phase Roadmap', icon: Milestone },
    { id: 'labs', label: 'Testing Labs Finder', icon: MapPin },
    { id: 'gap_analysis', label: 'MSME Audit Readiness', icon: CheckCircle2, badge: 'Self-Test' },
  ] as const;

  return (
    <div className="w-full bg-bis-navy-900 border-b border-bis-navy-700/60 sticky top-16 z-30 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as ActiveTab)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 btn-press ${
                  isActive
                    ? 'bg-bis-saffron text-white shadow-glow-saffron font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-bis-navy-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {'badge' in tab && tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                      isActive ? 'bg-black/20 text-white' : 'bg-bis-saffron/20 text-bis-saffron'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
                {'count' in tab && tab.count && (
                  <span className="text-[10px] text-slate-400 font-normal">({tab.count})</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
