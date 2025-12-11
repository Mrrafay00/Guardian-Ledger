export interface AuditInputs {
  transactionProfile: string;
  regulatoryContext: string;
  documentImage: File | null;
}

export enum RiskLevel {
  HIGH = 'HIGH ALERT',
  MEDIUM = 'MEDIUM REVIEW',
  LOW = 'LOW CONCERN',
  UNKNOWN = 'UNKNOWN'
}

export interface AuditResponse {
  rawMarkdown: string;
  timestamp: string;
}

export interface LoadingState {
  isLoading: boolean;
  step: string; // e.g., "Analyzing Image", "Checking Regulations", "Detecting Bias"
}
