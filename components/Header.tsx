import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-500/10 p-2 rounded-lg">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Guardian Ledger</h1>
            <p className="text-xs text-slate-400 font-medium tracking-wider">MULTIMODAL ETHICAL AML AUDITOR</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
            <span className="text-xs text-slate-300 font-mono">SYSTEM: ONLINE</span>
          </div>
          <Lock className="h-5 w-5 text-slate-500" />
        </div>
      </div>
    </header>
  );
};
