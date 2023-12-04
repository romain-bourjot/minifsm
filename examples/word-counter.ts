import { type FSMMachine, type FSMDefinition, doTransition } from '../src'

// noinspection SpellCheckingInspection
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789?'
const CONTRACTION = '\''

const STATES = {
  IDLE: Symbol('IDLE'),
  IN_WORD: Symbol('IN_WORD'),
  IN_CONTRACTION: Symbol('IN_CONTRACTION')
} as const

type WordCountState = typeof STATES[keyof typeof STATES]

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

function nullAction ({
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

export function createInitialMachine (): FSMMachine<WordCountState, WordCountContext> {
  return {
    currentState: STATES.IDLE,
    context: {
      tokens: [],
      currentToken: '',
      bufferChar: ''
    }
  }
}

export const wordCountFsmDefinition: FSMDefinition<WordCountState, WordCountContext, WordCountInput> = {
  [STATES.IDLE]: {
    transitions: [
      {
        nextState: STATES.IN_WORD,
        condition: validWordCharCondition,
        action: appendToCurrentTokenAction
      }
    ],
    defaultTransition: {
      nextState: STATES.IDLE,
      action: nullAction
    }
  },
  [STATES.IN_WORD]: {
    transitions: [
      {
        nextState: STATES.IN_WORD,
        condition: validWordCharCondition,
        action: appendToCurrentTokenAction
      },
      {
        nextState: STATES.IN_CONTRACTION,
        condition: contractionCondition,
        action: appendToBufferCharAction
      }
    ],
    defaultTransition: {
      nextState: STATES.IDLE,
      action: pushTokenAction
    }
  },
  [STATES.IN_CONTRACTION]: {
    transitions: [
      {
        condition: validWordCharCondition,
        action: appendToCurrentTokenAction,
        nextState: STATES.IN_WORD
      }
    ],
    defaultTransition: {
      nextState: STATES.IDLE,
      action: pushTokenAction
    }
  }
}

function count (txt: string): void {
  let machine = createInitialMachine()
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
