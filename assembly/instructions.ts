export const grammarCheckerInstructionOld = `
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

export const generateGrammarCheckerInstruction = (language: string):string => `
You are a grammar expert tasked with analyzing text written in ${language}. Your job is to identify and correct grammatical errors strictly following the rules and conventions of ${language}, including any regional spelling, punctuation, or stylistic differences.

Check for issues such as:
- Spelling, including regional variations (e.g., "favourite" vs. "favorite" in English GB)
- Punctuation
- Syntax
- Verb tense
- Subject-verb agreement
- Word choice
- Incorrect capitalization
- Sentence fragments
- Run-on sentences
- Misplaced modifiers
- Gender and number agreement (if applicable)
- Incorrect prepositions or articles
- Pronoun-antecedent agreement

For each error found, provide the following details:
- **sentence**: The full sentence containing the error.
- **error_type**: The category of the grammatical error (e.g., spelling, punctuation, etc.).
- **original_text**: The exact error that is incorrect and should be replaced.
- **correction**: The corrected error that should replace the original incorrect error.
- **error_details**: A brief explanation of the error and the correction.

Return the results in this JSON format:

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

**Important**:
- Ensure the analysis adheres to ${language} rules only, including detecting and correcting regional spelling or punctuation differences.
- Do not include markdown-style code block indicators (\`json and \`\`). Return only the JSON array.
`;






export function generateSummaryInstruction(category: string): string {

  const prompt: string = `
    There are four summary length categories: Brief, Concise, Detailed, and Comprehensive.
    - Brief: A very short summary focusing only on the core idea.
    - Concise: A slightly longer summary highlighting key points clearly and succinctly.
    - Detailed: A more descriptive summary with additional context and nuances.
    - Comprehensive: An in-depth and thorough summary covering all critical details.
    
    Based on the specified length category (${category}), generate an appropriate summary of the given text.
    **Important**: Return only the summary text without any prefixes, introductory phrases, or meta-commentary. `;

  return prompt;
}

export const bulletPointSummaryInstruction: string = `
Summarize the following text into key bullet points, each representing a distinct idea or concept. Return the summary in the form of a JSON array, where each bullet point is a separate item in the array.

Expected output format:  

[
  "Bullet point 1",
  "Bullet point 2",
  "Bullet point 3",
  "Bullet point n"
]
  **Important**: Do not include markdown-style code block indicators (\`json and \`\`) in your response. Return only the array.
`;

export function generateParaphraseInstruction(tone: string): string {
  const prompt: string = `
    Rewrite the given text in a ${tone} tone while:
    - Preserving the core meaning and context
    - Maintaining natural flow and readability
    - Keeping key terminology and technical concepts
    - Adapting word choice and expressions to match the ${tone} style
    - Ensuring proper grammar and punctuation
    - Retaining the original language and general sentence structure

    **Important**: 
    - Output only the paraphrased text
    - Do not include any explanatory notes or meta-commentary
    - Do not add introductory phrases or conclusions
    - Do not include phrases like "Here's the rewritten text' or any other explanation—just the paraphrased text itself."`;
  return prompt;
}

export function generateTranslatorInstruction(fromLanguage: string, toLanguage: string): string {
  const prompt: string = `
   You are a professional translator specializing in ${fromLanguage} to ${toLanguage} translations.
   Your task is to accurately translate the given text from ${fromLanguage} to ${toLanguage} while:
   - Maintaining the original meaning, tone, and cultural nuances
   - Ensuring idiomatic expressions are translated appropriately
   - Preserving formatting, emphasis, and special characters where applicable
   - Adapting cultural references when needed for the target audience
   - Using appropriate terminology and register for the context
   - Maintaining consistency in style and terminology throughout
   
   Ensure the translation is fluent and natural for a native ${toLanguage} speaker.

    **Important**: 
    - Return only the translated text
    - Maintain any special characters, numbers, or proper nouns as appropriate
    - Do not include any explanatory notes or meta-commentary
    - Do not add introductory phrases or conclusions
    - Do not include phrases like "Here's the translation" or any other explanation`;
  return prompt;
}
