export interface AuditInputs {
  transactionProfile: string;
  regulatoryContext: string;
  imageFile: File | null;
  imageBase64: string | null;
}

export interface AuditResult {
  rawMarkdown: string;
  sections: {
    riskSeverity: string;
    verificationSummary: string;
    complianceVerdict: string;
    ethicalBiasFlag: string;
  };
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}