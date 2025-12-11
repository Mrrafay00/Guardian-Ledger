import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultDashboard from './components/ResultDashboard';
import { runEthicalAudit } from './services/geminiService';
import { AuditInputs, AuditResult, LoadingState } from './types';

function App() {
  const [inputs, setInputs] = useState<AuditInputs>({
    transactionProfile: '',
    regulatoryContext: '',
    imageFile: null,
    imageBase64: null,
  });

  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleRunAudit = async () => {
    if (!inputs.transactionProfile || !inputs.regulatoryContext || !inputs.imageBase64) {
      return;
    }

    setLoadingState(LoadingState.ANALYZING);
    setError(null);
    setAuditResult(null);

    try {
      const result = await runEthicalAudit(
        inputs.transactionProfile,
        inputs.regulatoryContext,
        inputs.imageBase64
      );
      setAuditResult(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      setLoadingState(LoadingState.ERROR);
      setError("An error occurred during the audit process. Please check your API key and try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-emerald-500/30">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
           <h2 className="text-3xl font-light text-white mb-2">New Ethical Audit</h2>
           <p className="text-slate-400">Provide multimodal data below to initiate a Gemini 3 Pro compliance review.</p>
        </div>

        <InputSection 
          inputs={inputs} 
          setInputs={setInputs} 
          onRunAudit={handleRunAudit}
          loadingState={loadingState}
        />

        {error && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {auditResult && (
          <ResultDashboard result={auditResult} />
        )}
      </main>

      <footer className="w-full text-center py-8 text-slate-600 text-sm border-t border-slate-800 mt-12">
        <p>© 2024 Guardian Ledger Financial Systems. Powered by Gemini 3 Pro.</p>
      </footer>
    </div>
  );
}

export default App;