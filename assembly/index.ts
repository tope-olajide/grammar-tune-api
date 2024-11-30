import { models } from "@hypermode/modus-sdk-as"
import {
  OpenAIChatModel,
  ResponseFormat,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat"
import { generateSummaryInstruction, grammarCheckerInstruction, SummaryCategory } from "./instructions";



export function sayHello(name: string | null = null): string {

  return `hello ${name || "world"}`;}


const grammarCheckerModel: string = "grammar-error-checker"
const summarizeTextModel:string = "text-summarizer"
export function checkGrammarErrors(text: string): string {
  const model = models.getModel<OpenAIChatModel>(grammarCheckerModel)
  const input = model.createInput([
    new SystemMessage(grammarCheckerInstruction),
    new UserMessage(text),
  ])
  input.temperature = 0.7
  const output = model.invoke(input)
  return output.choices[0].message.content.trim()
}

export function summarizeText(text: string, length:SummaryCategory): string {
  const model = models.getModel<OpenAIChatModel>(summarizeTextModel)
  const summarizeTextInstruction = generateSummaryInstruction(length)
  const input = model.createInput([
    new SystemMessage(summarizeTextInstruction),
    new UserMessage(text),
  ])
  const output = model.invoke(input)
  return output.choices[0].message.content.trim()
}

