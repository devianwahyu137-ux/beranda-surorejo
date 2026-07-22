'use client';

import { useState, type ReactNode, Children } from 'react';

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
        {Children.map(children, (child, index) => {
          const isActive = tabs[index].id === activeTab;
          return (
            <div
              key={tabs[index].id}
              className={`transition-opacity duration-300 ${
                isActive ? 'block animate-fade-in opacity-100' : 'hidden opacity-0'
              }`}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
