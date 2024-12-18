import { models } from "@hypermode/modus-sdk-as";
import {
  OpenAIChatModel,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";
import {
  bulletPointSummaryInstruction,
  contentGeneratorInstruction,
  generateGrammarCheckerInstruction,
  generateParaphraseInstruction,
  generateSummaryInstruction,
  generateTranslatorInstruction,
} from "./instructions";

export function sayHello(name: string | null = null): string {
  return "hello " + (name != null ? name : "world");
}


export function checkGrammarErrors(text: string, language: string, aiModel:string): string {
  const model = models.getModel<OpenAIChatModel>(aiModel)
  const prompt = generateGrammarCheckerInstruction(language)
  const input = model.createInput([
    new SystemMessage(prompt),
    new UserMessage(text),
  ])
  input.temperature = 0.7
  const output = model.invoke(input)
  return output.choices[0].message.content.trim()
}

export function summarizeText(text: string, length:string, summaryMode:string, aiModel:string ): string {
  const model = models.getModel<OpenAIChatModel>(aiModel)
  const summarizeTextInstruction = generateSummaryInstruction(length)
  const bulletPointSummaryPrompt = bulletPointSummaryInstruction;
  const summaryInstruction = summaryMode === "Bullet Points" ? bulletPointSummaryPrompt : summarizeTextInstruction
  console.log(summaryInstruction)
  const input = model.createInput([
    new SystemMessage(summaryInstruction),
    new UserMessage(text),
  ])
  const output = model.invoke(input)
  return output.choices[0].message.content.trim()
}

export function paraphraseText(text: string,  mode:string, aiModel:string ): string {
  const model = models.getModel<OpenAIChatModel>(aiModel)
  const paraphraseTextInstruction = generateParaphraseInstruction(mode)
  const input = model.createInput([
    new SystemMessage(paraphraseTextInstruction),
    new UserMessage(text),
  ])
  const output = model.invoke(input)
  return output.choices[0].message.content.trim()
}

export function translateText(text: string, translateFromLanguage: string, translateToLanguage: string, aiModel:string): string {
  const model = models.getModel<OpenAIChatModel>(aiModel)
  const translateTextInstruction = generateTranslatorInstruction(translateFromLanguage, translateToLanguage)
  const input = model.createInput([
    new SystemMessage(translateTextInstruction), 
    new UserMessage(text),
  ])
  const output = model.invoke(input)
  return output.choices[0].message.content.trim()
}

export function generateContent(topic: string, aiModel:string): string {
  const model = models.getModel<OpenAIChatModel>(aiModel)
  const input = model.createInput([
    new SystemMessage(contentGeneratorInstruction), 
    new UserMessage(topic),
  ])
  const output = model.invoke(input)
  return output.choices[0].message.content.trim()
}