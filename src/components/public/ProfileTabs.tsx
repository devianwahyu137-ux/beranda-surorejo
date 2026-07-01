'use client';

import { useState, type ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon: ReactNode;
}

interface ProfileTabsProps {
  tabs: Tab[];
  children: ReactNode[];
}

export default function ProfileTabs({ tabs, children }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeIndex = tabs.findIndex((t) => t.id === activeTab);

  return (
    <div>
      {/* Tab Navigation */}
      <div className="tab-nav border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span className="hidden sm:inline">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        <div className="animate-fade-in" key={activeTab}>
          {children[activeIndex]}
        </div>
      </div>
    </div>
  );
}
