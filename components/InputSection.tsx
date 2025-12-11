import React, { ChangeEvent, useRef } from 'react';
import { Upload, FileText, Scale, Image as ImageIcon, X, ShieldCheck } from 'lucide-react';
import { AuditInputs } from '../types';

interface InputSectionProps {
  inputs: AuditInputs;
  setInputs: React.Dispatch<React.SetStateAction<AuditInputs>>;
  isProcessing: boolean;
  onRunAudit: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ inputs, setInputs, isProcessing, onRunAudit }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (field: keyof AuditInputs) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setInputs(prev => ({ ...prev, documentImage: e.target.files![0] }));
    }
  };

  const clearFile = () => {
    setInputs(prev => ({ ...prev, documentImage: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isFormValid = inputs.transactionProfile && inputs.regulatoryContext && inputs.documentImage;

  return (
    <div className="space-y-6">
      <div className="bg-slate-850 rounded-xl p-6 border border-slate-800 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-indigo-400" />
          1. Transaction Profile
        </h2>
        <p className="text-sm text-slate-400 mb-3">Paste detailed transaction data (JSON, CSV, or narrative).</p>
        <textarea
          value={inputs.transactionProfile}
          onChange={handleTextChange('transactionProfile')}
          placeholder="e.g., TXN-ID: 99283 | SENDER: Corp A (Cayman) | RECEIVER: Shell Co B (London) | AMT: $2.5M | DATE: 2024-05-12..."
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-mono resize-none transition-all"
        />
      </div>

      <div className="bg-slate-850 rounded-xl p-6 border border-slate-800 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
          <ImageIcon className="w-5 h-5 mr-2 text-emerald-400" />
          2. KYC / Asset Visual Evidence
        </h2>
        <p className="text-sm text-slate-400 mb-3">Upload visual proof (Passport, Bank Statement, Asset Chart).</p>
        
        {!inputs.documentImage ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all group"
          >
            <div className="bg-slate-800 p-3 rounded-full mb-3 group-hover:bg-slate-700 transition-colors">
              <Upload className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-slate-300">Click to upload document</p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, JPEG supported</p>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center overflow-hidden">
                <img 
                  src={URL.createObjectURL(inputs.documentImage)} 
                  alt="Preview" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-white truncate max-w-[200px]">{inputs.documentImage.name}</p>
                <p className="text-xs text-emerald-500">Ready for analysis</p>
              </div>
            </div>
            <button 
              onClick={clearFile}
              className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-red-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      <div className="bg-slate-850 rounded-xl p-6 border border-slate-800 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Scale className="w-5 h-5 mr-2 text-amber-400" />
          3. Regulatory Context
        </h2>
        <p className="text-sm text-slate-400 mb-3">Specify the exact regulation or internal policy to audit against.</p>
        <textarea
          value={inputs.regulatoryContext}
          onChange={handleTextChange('regulatoryContext')}
          placeholder="e.g., EU 5th Anti-Money Laundering Directive (5AMLD), Article 19 regarding high-risk third countries..."
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none font-mono resize-none transition-all"
        />
      </div>

      <div className="sticky bottom-6 z-40 pt-4">
        <button
          onClick={onRunAudit}
          disabled={!isFormValid || isProcessing}
          className={`w-full py-4 px-6 rounded-lg font-bold text-sm tracking-wide uppercase transition-all shadow-lg flex items-center justify-center space-x-2
            ${!isFormValid || isProcessing 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
              : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20 hover:shadow-emerald-500/30'
            }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing Audit...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              <span>Run Ethical Audit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
