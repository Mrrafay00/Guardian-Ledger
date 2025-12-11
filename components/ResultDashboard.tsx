import React from 'react';
import { AuditResult } from '../types';

interface ResultDashboardProps {
  result: AuditResult;
}

const ResultDashboard: React.FC<ResultDashboardProps> = ({ result }) => {
  const { sections } = result;
  
  // Determine severity color
  const getSeverityColor = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('high alert')) return 'text-red-400 border-red-500/30 bg-red-900/10';
    if (lower.includes('medium')) return 'text-orange-400 border-orange-500/30 bg-orange-900/10';
    if (lower.includes('low')) return 'text-emerald-400 border-emerald-500/30 bg-emerald-900/10';
    return 'text-slate-300 border-slate-600 bg-slate-800';
  };

  const severityClass = getSeverityColor(sections.riskSeverity);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-xl font-bold text-white mb-6 border-l-4 border-emerald-500 pl-4">Audit Dashboard</h2>
      
      {/* Top Row: Severity & Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AML Risk Severity */}
        <div className={`p-6 rounded-xl border ${severityClass} transition-all duration-500`}>
          <div className="flex items-center mb-3">
             <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
             <h3 className="text-sm font-bold uppercase tracking-wider opacity-80">AML Risk Severity</h3>
          </div>
          <div className="text-lg font-medium">
             {sections.riskSeverity || "Analysis Pending..."}
          </div>
        </div>

        {/* Regulatory Verdict */}
        <div className="p-6 rounded-xl border border-blue-500/30 bg-blue-900/10">
          <div className="flex items-center mb-3 text-blue-400">
             <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
             <h3 className="text-sm font-bold uppercase tracking-wider opacity-80">Regulatory Compliance Verdict</h3>
          </div>
          <div className="text-lg font-medium text-blue-100">
             {sections.complianceVerdict || "Analysis Pending..."}
          </div>
        </div>
      </div>

      {/* Middle Row: Multimodal Verification */}
      <div className="p-6 rounded-xl border border-purple-500/30 bg-purple-900/5">
        <div className="flex items-center mb-4 text-purple-400">
          <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-80">Multimodal Verification Summary</h3>
        </div>
        <div className="prose prose-invert prose-sm max-w-none text-slate-300">
          {sections.verificationSummary 
            ? sections.verificationSummary.split('\n').map((line, i) => <p key={i} className="mb-1">{line}</p>)
            : <p className="italic text-slate-500">Waiting for image and text correlation analysis...</p>
          }
        </div>
      </div>

      {/* Bottom Row: Ethical Bias Flag */}
      <div className="p-6 rounded-xl border border-amber-500/30 bg-amber-900/10">
        <div className="flex items-center mb-3 text-amber-400">
          <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-80">Ethical Bias Flag (Algorithmic Audit)</h3>
        </div>
        <div className="text-slate-200">
             {sections.ethicalBiasFlag || "Pending ethical review..."}
        </div>
      </div>
    </div>
  );
};

export default ResultDashboard;
