import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-700 py-6 px-8 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">Guardian Ledger</h1>
            <p className="text-xs text-emerald-400 font-medium tracking-wider">MULTIMODAL ETHICAL AML AUDITOR</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-mono border border-slate-700">
            SYSTEM: ONLINE
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-mono border border-slate-700">
            MODEL: GEMINI 3 PRO
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
