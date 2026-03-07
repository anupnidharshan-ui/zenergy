
import React, { useState } from 'react';
import { SettingsTab } from '../types';
import Sidebar from '../components/Sidebar';
import ProfileSettings from '../components/ProfileSetting';
import SecuritySettings from '../components/SecuritySetting ';
import SignOutModal from '../components/SignOutModal';
import Privacy from './Privacy';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(SettingsTab.EDIT_PROFILE);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const tabs = [
    { id: SettingsTab.EDIT_PROFILE, label: 'Edit Profile', icon: 'person' },
    { id: SettingsTab.PRIVACY,label:'Privacy ',  icon: 'lock' },
    { id: SettingsTab.SECURITY, label: 'Security & 2FA', icon: 'shield' },
  ];

  return (
    <div className=" settings-mesh-gradient flex max-w-[1600px] mx-auto min-h-screen relative font-sans ">
      <Sidebar currentTab="settings" />
      
      <main className="ml-64 flex-1 flex flex-col md:flex-row h-screen overflow-hidden">
        {/* Settings Secondary Navigation */}
        <div className="w-full md:w-80 border-r border-white/5 p-8 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex justify-between items-center md:block mb-8 px-2">
            <h2 className="text-2xl font-bold">Settings</h2>
            <button 
              onClick={() => setIsSignOutModalOpen(true)}
              className="md:hidden size-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
          
          <div className="space-y-2 flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,212,255,0.1)]' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsSignOutModalOpen(true)}
            className="hidden md:flex mt-auto items-center gap-4 p-4 rounded-2xl text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-black/20">
          <header className="p-8 pb-0 md:p-10 md:pb-0">
            <h2 className="text-3xl font-bold mb-2">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            
          </header>

          <div className="flex-1 flex min-h-0 ">
            {activeTab === SettingsTab.EDIT_PROFILE ? (
              <ProfileSettings />
              ) : activeTab === SettingsTab.PRIVACY ? (
             <Privacy />
            ) : activeTab === SettingsTab.SECURITY ? (
              <SecuritySettings />
            ) : (
              <div className="flex-1 flex items-center justify-center p-10 ">
                <div className="text-center">
                  <span className="material-symbols-outlined text-6xl mb-4">construction</span>
                  <p className="text-xl font-medium italic">Content for {activeTab} is coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Decorative Gradients */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 size-[500px] bg-neon-purple/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 size-[600px] bg-neon-cyan/5 blur-[150px] rounded-full"></div>
      </div>

      <SignOutModal 
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onConfirm={() => {
          setIsSignOutModalOpen(false);
          alert('Signed out successfully!');
        }}
      />
    </div>
  );
};

export default Settings;