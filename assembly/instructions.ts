const grammarCheckerInstruction = `
You are a grammar expert tasked with analyzing text for grammatical errors. Analyze the provided text for any grammatical errors, including spelling, punctuation, syntax, verb tense, subject-verb agreement, and word choice issues.

For each grammatical error found, provide the following details:

- **sentence**: The full sentence containing the error.
- **error_type**: The type of grammatical error (e.g., subject-verb agreement, punctuation error, etc.).
- **original_text**: The exact error that is incorrect and should be replaced.
- **correction**: The corrected error that should replace the original incorrect error.
- **error_details**: A brief explanation of the error and how it has been corrected.

Return the results in the following JSON format:

[
  {
    "sentence": "<sentence_containing_the_error>",
    "error_type": "<type_of_error>",
    "original_text": "<exact_text_to_be_replaced>",
    "correction": "<correction>",
    "error_details": "<brief_explanation_of_the_error>"
  },
  ...
]

**Important**: Do not include markdown-style code block indicators (\`json and \`\`) in your response. Return only the JSON array.
`;



export type SummaryCategory = "Brief" | "Concise" | "Detailed" | "Comprehensive";
export type SummaryMode = "Bullet" | "Paragraph"
function generateSummaryInstruction(category: SummaryCategory): string {
    // Define category descriptions
    const categoryDescriptions: { [key in SummaryCategory]: string } = {
      Brief: "A very short summary focusing only on the core idea.",
      Concise: "A slightly longer summary highlighting key points clearly and succinctly.",
      Detailed: "A more descriptive summary with additional context and nuances.",
      Comprehensive: "An in-depth and thorough summary covering all critical details."
    };
  
    // Prompt construction
    const prompt = `
      There are four summary length categories: Brief, Concise, Detailed, and Comprehensive.
      - Brief: ${categoryDescriptions.Brief}
      - Concise: ${categoryDescriptions.Concise}
      - Detailed: ${categoryDescriptions.Detailed}
      - Comprehensive: ${categoryDescriptions.Comprehensive}
  
      Based on the specified length category (${category}), generate an appropriate summary of the given text

    `;
  
    return prompt;
  }

const bulletPointSummaryInstruction = `


"Summarize the following text into key bullet points, each representing a distinct idea or concept. Return the summary in the form of a JSON array, where each bullet point is a separate item in the array.


Expected output format:  

[
  "Bullet point 1",
  "Bullet point 2",
  "Bullet point 3",
  "Bullet point n"
]

**Important**: Do not include markdown-style code block indicators (\`json and \`\`) in your response. Return only the array.

`












export { grammarCheckerInstruction, generateSummaryInstruction, bulletPointSummaryInstruction}