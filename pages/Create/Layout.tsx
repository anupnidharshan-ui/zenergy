import React from 'react';
import Sidebar from '../../components/Sidebar';
import { CreatePost } from './CreatePost';

export const Layout: React.FC = () => {
  return (
    <div id="layout-root" className="min-h-screen bg-[#0b0f1a] text-white font-sans relative overflow-x-hidden">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 size-[500px] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 size-[600px] bg-cyan-400/8 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(188,0,255,0.08)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(0,212,255,0.06)_0px,transparent_50%)]"></div>
      </div>

      <div className="flex max-w-[1400px] mx-auto min-h-screen relative">
        <Sidebar />
        
        <main className="ml-64 flex-1 flex flex-col items-center justify-center p-6 md:p-12 min-h-screen">
          <CreatePost />
        </main>
      </div>
    </div>
  );
};
