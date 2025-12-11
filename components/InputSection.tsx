import React, { useCallback } from 'react';
import { AuditInputs, LoadingState } from '../types';

interface InputSectionProps {
  inputs: AuditInputs;
  setInputs: React.Dispatch<React.SetStateAction<AuditInputs>>;
  onRunAudit: () => void;
  loadingState: LoadingState;
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, setInputs, onRunAudit, loadingState }) => {
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputs(prev => ({
          ...prev,
          imageFile: file,
          imageBase64: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  }, [setInputs]);

  const handleChange = (field: keyof AuditInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = inputs.transactionProfile && inputs.regulatoryContext && inputs.imageBase64;
  const isAnalyzing = loadingState === LoadingState.ANALYZING;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
      {/* Transaction Profile */}
      <div className="lg:col-span-4 bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Transaction Profile
        </label>
        <textarea
          className="w-full h-40 bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none placeholder-slate-600"
          placeholder="Paste high-risk transaction details here (e.g., Sender: John Doe, Amount: $50,000, Receiver: Offshore Shell Corp...)"
          value={inputs.transactionProfile}
          onChange={(e) => handleChange('transactionProfile', e.target.value)}
          disabled={isAnalyzing}
        />
      </div>

      {/* KYC Visual */}
      <div className="lg:col-span-4 bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm flex flex-col">
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          KYC / Asset Visual
        </label>
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-lg hover:border-slate-500 transition-colors bg-slate-900 relative overflow-hidden group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            disabled={isAnalyzing}
          />
          {inputs.imageBase64 ? (
            <div className="relative w-full h-full">
               <img 
                src={inputs.imageBase64} 
                alt="Upload preview" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <p className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">Click to Change</p>
              </div>
            </div>
          ) : (
            <div className="text-center p-4">
              <svg className="mx-auto h-8 w-8 text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-1 text-sm text-slate-400">Upload KYC/Chart</p>
              <p className="mt-1 text-xs text-slate-600">PNG, JPG up to 5MB</p>
            </div>
          )}
        </div>
      </div>

      {/* Regulatory Context */}
      <div className="lg:col-span-4 bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          Regulatory Context
        </label>
        <textarea
          className="w-full h-40 bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none placeholder-slate-600"
          placeholder="Paste relevant AML regulation or policy here..."
          value={inputs.regulatoryContext}
          onChange={(e) => handleChange('regulatoryContext', e.target.value)}
          disabled={isAnalyzing}
        />
      </div>

      {/* Action Button */}
      <div className="lg:col-span-12 flex justify-center mt-2">
        <button
          onClick={onRunAudit}
          disabled={!isFormValid || isAnalyzing}
          className={`
            relative group px-12 py-4 rounded-lg font-bold text-sm tracking-wider uppercase transition-all duration-300 overflow-hidden
            ${!isFormValid 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed border border-slate-600' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50 border border-emerald-400/50'}
          `}
        >
          {isAnalyzing ? (
             <div className="flex items-center space-x-2">
               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               <span>Running Ethical Audit...</span>
             </div>
          ) : (
            <span className="flex items-center">
              RUN ETHICAL AUDIT
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;
