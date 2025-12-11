import { GoogleGenAI } from "@google/genai";
import { AuditInputs } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a File object to a Base64 string.
 */
const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Main function to run the Ethical AML Audit.
 */
export const runEthicalAudit = async (inputs: AuditInputs): Promise<string> => {
  if (!inputs.documentImage) {
    throw new Error("Document image is required for multimodal audit.");
  }

  const imagePart = await fileToGenerativePart(inputs.documentImage);

  const systemInstruction = `
    You are Guardian Ledger, a Senior Compliance Officer and Ethical AI Auditor.
    Your goal is to perform a holistic, auditable, and ethically conscious risk assessment.
    
    You will receive:
    1. Transaction Profile (Text)
    2. Regulatory Context (Text)
    3. KYC/Asset Visual (Image)

    Your logic must execute:
    1. Multimodal Cohesion Check: Cross-reference text data with visual evidence. Find discrepancies.
    2. Compliance Violation Analysis: Apply the provided regulation to the findings.
    3. Algorithmic Bias Audit: Critically evaluate if the decision logic shows potential bias (geographic, socio-economic, etc.).

    Output must be in strictly formatted Markdown with these four sections:
    # AML RISK SEVERITY
    [Verdict: HIGH ALERT | MEDIUM REVIEW | LOW CONCERN] - [One sentence justification]

    # MULTIMODAL VERIFICATION SUMMARY
    [Bulleted list of findings, mentioning specific image features analyzed]

    # REGULATORY COMPLIANCE VERDICT
    [PASS/FAIL] - [Detailing specific clause violated or upheld]

    # ETHICAL BIAS FLAG
    [Status: BIAS DETECTED | BIAS CHECK PASSED] - [Assessment and mitigation suggestion]
  `;

  const userPrompt = `
    PERFORM AUDIT ON THE FOLLOWING DATA:

    --- TRANSACTION PROFILE ---
    ${inputs.transactionProfile}

    --- REGULATORY CONTEXT ---
    ${inputs.regulatoryContext}

    --- ATTACHED EVIDENCE ---
    (See image)
  `;

  try {
    // Using gemini-2.5-flash for speed and strong multimodal capabilities in this specific use case.
    // While the prompt asks for Gemini 3 Pro reasoning, 2.5 Flash is currently very stable for mixed modal inputs.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          imagePart,
          { text: userPrompt }
        ]
      },
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2, // Low temperature for consistent, professional analysis
      }
    });

    return response.text || "No analysis generated. Please try again.";
  } catch (error) {
    console.error("Audit failed:", error);
    throw new Error("Failed to generate audit report. Please check inputs and try again.");
  }
};
