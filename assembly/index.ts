import { models } from "@hypermode/modus-sdk-as"
import {
  OpenAIChatModel,
  ResponseFormat,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat"



const instruction: string = `
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



export function sayHello(name: string | null = null): string {

  return instruction
}


const modelName: string = "grammar-error-checker"

export function checkGrammarErrors( prompt: string): string {
  const model = models.getModel<OpenAIChatModel>(modelName)
  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(prompt),
  ])

  input.temperature = 0.7

  const output = model.invoke(input)
  return output.choices[0].message.content.trim()
}