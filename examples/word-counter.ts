import { createMachine, doTransition, type FSMDefinition } from '../src'

// noinspection SpellCheckingInspection
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789?'
const CONTRACTION = '\''

type WordCountState = 'IDLE' | 'IN_WORD' | 'IN_CONTRACTION'

interface WordCountContext {
  currentToken: string
  tokens: string[]
  bufferChar: string
}

type WordCountInput = string

function validWordCharCondition ({
  input
}: {
  context: WordCountContext
  input: WordCountInput
}): boolean {
  return ALPHABET.includes(input.toLowerCase())
}

function contractionCondition ({
  input
}: {
  context: WordCountContext
  input: WordCountInput
}): boolean {
  return CONTRACTION.includes(input.toLowerCase())
}

function resetTokenAction ({
  context
}: {
  context: WordCountContext
  input: WordCountInput
}): WordCountContext {
  return {
    currentToken: '',
    bufferChar: '',
    tokens: context.tokens
  }
}

function appendToCurrentTokenAction ({
  context,
  input
}: {
  context: WordCountContext
  input: WordCountInput
}): WordCountContext {
  return {
    currentToken: `${context.currentToken}${context.bufferChar}${input.toLowerCase()}`,
    bufferChar: '',
    tokens: context.tokens
  }
}

function appendToBufferCharAction ({
  context,
  input
}: {
  context: WordCountContext
  input: WordCountInput
}): WordCountContext {
  return {
    currentToken: context.currentToken,
    bufferChar: input.toLowerCase(),
    tokens: context.tokens
  }
}

function pushTokenAction ({
  context
}: {
  context: WordCountContext
  input: WordCountInput
}): WordCountContext {
  return {
    tokens: [...context.tokens, context.currentToken],
    currentToken: '',
    bufferChar: ''
  }
}

export const wordCountFsmDefinition: FSMDefinition<WordCountState, WordCountContext, WordCountInput> = {
  IDLE: {
    transitions: [
      {
        nextState: 'IN_WORD',
        condition: validWordCharCondition,
        action: appendToCurrentTokenAction
      }
    ],
    defaultTransition: {
      nextState: 'IDLE',
      action: resetTokenAction
    }
  },
  IN_WORD: {
    transitions: [
      {
        nextState: 'IN_WORD',
        condition: validWordCharCondition,
        action: appendToCurrentTokenAction
      },
      {
        nextState: 'IN_CONTRACTION',
        condition: contractionCondition,
        action: appendToBufferCharAction
      }
    ],
    defaultTransition: {
      nextState: 'IDLE',
      action: pushTokenAction
    }
  },
  IN_CONTRACTION: {
    transitions: [
      {
        condition: validWordCharCondition,
        action: appendToCurrentTokenAction,
        nextState: 'IN_WORD'
      }
    ],
    defaultTransition: {
      nextState: 'IDLE',
      action: pushTokenAction
    }
  }
}

function count (txt: string): void {
  let machine = createMachine({
    currentState: 'IDLE',
    context: {
      currentToken: '',
      bufferChar: '',
      tokens: [] as string[]
    }
  })
  for (const input of [...(txt + '\n')]) {
    machine = doTransition({ definition: wordCountFsmDefinition, input, machine })
  }

  console.log(txt, ': ', machine.context.tokens)
}

count('word')
count('one of each')
count('one fish two fish red fish blue fish')
count('one,two,three')
count('one,\ntwo,\nthree')
count('car: carpet as java: javascript!!&@$%^&"')
count('testing, 1, 2 testing')
count('go Go GO Stop stop')
count("'First: don't laugh. Then: don't cry. You're getting it.'")
