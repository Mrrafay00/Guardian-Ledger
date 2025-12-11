import { GoogleGenAI } from "@google/genai";
import { AuditResult } from "../types";

const GEMINI_MODEL = "gemini-3-pro-preview"; // Using the pro model for advanced reasoning

const SYSTEM_INSTRUCTION = `
You are 'Guardian Ledger', a Senior Compliance Officer and Ethical AI Auditor. 
Your role is to conduct a holistic, auditable, and ethically conscious risk assessment of financial transactions.

You will receive three inputs:
1. Transaction Profile (Text details).
2. KYC/Asset Visual (Image).
3. Regulatory Context (Rules/Policies).

Your Logic Chain:
1. **Multimodal Cohesion Check**: Cross-reference the financial data with the visual evidence. Identify discrepancies (names, dates, amounts, suspicious visual artifacts).
2. **Compliance Violation Analysis**: Apply the provided regulatory context to your findings.
3. **Algorithmic Bias Audit**: Critically evaluate if the decision logic shows potential bias against specific demographics, geographies, or income levels.

Output Format:
You MUST output a Markdown report. Use specific headers exactly as shown below so they can be parsed programmatically.

## AML RISK SEVERITY
[Verdict: HIGH ALERT / MEDIUM REVIEW / LOW CONCERN]. [One sentence justification].

## MULTIMODAL VERIFICATION SUMMARY
[Detailed breakdown using bullet points. Mention specific image features analyzed].

## REGULATORY COMPLIANCE VERDICT
[PASS/FAIL]. [Details on specific clause violated or satisfied].

## ETHICAL BIAS FLAG
[Status: e.g., BIAS DETECTED: Geographical, or BIAS CHECK: Passed]. [Assessment and mitigation suggestion].
`;

export const runEthicalAudit = async (
  transactionProfile: string,
  regulatoryContext: string,
  imageBase64: string
): Promise<AuditResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const contents = {
      parts: [
        {
          text: `
          TRANSATION PROFILE:
          ${transactionProfile}

          REGULATORY CONTEXT:
          ${regulatoryContext}
          
          Please perform the ethical audit based on these inputs and the attached image.
          `
        },
        {
          inlineData: {
            mimeType: "image/png", // Assuming PNG/JPEG, generic handling. Ideally detect from file.
            data: imageBase64.split(",")[1] // Remove the data:image/xyz;base64, prefix
          }
        }
      ]
    };

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for consistent, analytical results
      }
    });

    const text = response.text || "No response generated.";
    
    return parseGeminiResponse(text);

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

// Helper to parse the markdown into sections for the dashboard
const parseGeminiResponse = (markdown: string): AuditResult => {
  const sections = {
    riskSeverity: "",
    verificationSummary: "",
    complianceVerdict: "",
    ethicalBiasFlag: "",
  };

  // Simple splitting based on headers
  const parts = markdown.split("## ");
  
  parts.forEach(part => {
    if (part.startsWith("AML RISK SEVERITY")) {
      sections.riskSeverity = part.replace("AML RISK SEVERITY", "").trim();
    } else if (part.startsWith("MULTIMODAL VERIFICATION SUMMARY")) {
      sections.verificationSummary = part.replace("MULTIMODAL VERIFICATION SUMMARY", "").trim();
    } else if (part.startsWith("REGULATORY COMPLIANCE VERDICT")) {
      sections.complianceVerdict = part.replace("REGULATORY COMPLIANCE VERDICT", "").trim();
    } else if (part.startsWith("ETHICAL BIAS FLAG")) {
      sections.ethicalBiasFlag = part.replace("ETHICAL BIAS FLAG", "").trim();
    }
  });

  return {
    rawMarkdown: markdown,
    sections
  };
};
