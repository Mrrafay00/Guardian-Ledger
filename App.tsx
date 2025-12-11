import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputDashboard } from './components/OutputDashboard';
import { AuditInputs } from './types';
import { runEthicalAudit } from './services/geminiService';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<AuditInputs>({
    transactionProfile: '',
    regulatoryContext: '',
    documentImage: null,
  });

  const [auditReport, setAuditReport] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRunAudit = async () => {
    setIsProcessing(true);
    setAuditReport(null);
    setError(null);

    try {
      const report = await runEthicalAudit(inputs);
      setAuditReport(report);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during the audit.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-5 space-y-6">
             <div className="mb-2">
                <h2 className="text-2xl font-bold text-white">New Audit Request</h2>
                <p className="text-slate-400">Configure multimodal inputs for analysis.</p>
             </div>
             <InputSection 
               inputs={inputs}
               setInputs={setInputs}
               isProcessing={isProcessing}
               onRunAudit={handleRunAudit}
             />
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7">
             <div className="mb-4">
                <h2 className="text-2xl font-bold text-white">Audit Findings</h2>
                <p className="text-slate-400">Real-time ethical compliance reporting.</p>
             </div>
             
             {error && (
               <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 animate-in fade-in">
                 <p className="text-red-400 text-sm font-medium">{error}</p>
               </div>
             )}

             {!auditReport && !isProcessing && !error && (
               <div className="h-[600px] bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-600">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">🛡️</span>
                  </div>
                  <p className="font-medium">Waiting for audit execution</p>
                  <p className="text-sm mt-2 max-w-xs text-center">Fill in the transaction details, upload evidence, and define regulations to begin.</p>
               </div>
             )}

             {isProcessing && (
                <div className="h-[600px] bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
                   <div className="relative w-24 h-24 mb-8">
                     <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                     <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-2xl">👁️</span>
                     </div>
                   </div>
                   <h3 className="text-xl font-semibold text-white mb-2">Analyzing Vectors</h3>
                   <div className="space-y-2 text-center">
                     <p className="text-slate-400 text-sm animate-pulse">Cross-referencing transaction data...</p>
                     <p className="text-slate-400 text-sm animate-pulse delay-100">Scanning document features...</p>
                     <p className="text-slate-400 text-sm animate-pulse delay-200">Evaluating ethical bias...</p>
                   </div>
                </div>
             )}

             {auditReport && (
               <OutputDashboard report={auditReport} />
             )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
