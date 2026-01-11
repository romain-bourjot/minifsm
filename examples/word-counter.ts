import { createMachine, doTransition, type MachineDef, type MachineState, type BaseInput } from '../src'

// noinspection SpellCheckingInspection
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789?'
const CONTRACTION = '\''

type WordCountState = 'IDLE' | 'IN_WORD' | 'IN_CONTRACTION'

interface WordCountContext {
  currentToken: string
  tokens: string[]
  bufferChar: string
}

interface WordCountInput extends BaseInput<'CHAR'> {
  char: string
}

function isValidWordChar (char: string): boolean {
  return ALPHABET.includes(char.toLowerCase())
}

function isContraction (char: string): boolean {
  return CONTRACTION.includes(char.toLowerCase())
}

export const wordCountFsmDefinition: MachineDef<WordCountState, WordCountContext, WordCountInput> = {
  IDLE: ({ context, input }) => {
    if (isValidWordChar(input.char)) {
      return {
        currentState: 'IN_WORD',
        context: {
          currentToken: input.char.toLowerCase(),
          bufferChar: '',
          tokens: context.tokens
        }
      }
    }
    // Reset token on non-word char
    return {
      currentState: 'IDLE',
      context: {
        currentToken: '',
        bufferChar: '',
        tokens: context.tokens
      }
    }
  },

  IN_WORD: ({ context, input }) => {
    if (isValidWordChar(input.char)) {
      return {
        currentState: 'IN_WORD',
        context: {
          currentToken: `${context.currentToken}${context.bufferChar}${input.char.toLowerCase()}`,
          bufferChar: '',
          tokens: context.tokens
        }
      }
    }

    if (isContraction(input.char)) {
      return {
        currentState: 'IN_CONTRACTION',
        context: {
          currentToken: context.currentToken,
          bufferChar: input.char.toLowerCase(),
          tokens: context.tokens
        }
      }
    }

    // End of word - push token
    return {
      currentState: 'IDLE',
      context: {
        tokens: [...context.tokens, context.currentToken],
        currentToken: '',
        bufferChar: ''
      }
    }
  },

  IN_CONTRACTION: ({ context, input }) => {
    if (isValidWordChar(input.char)) {
      return {
        currentState: 'IN_WORD',
        context: {
          currentToken: `${context.currentToken}${context.bufferChar}${input.char.toLowerCase()}`,
          bufferChar: '',
          tokens: context.tokens
        }
      }
    }

    // End of word (contraction wasn't followed by valid char)
    return {
      currentState: 'IDLE',
      context: {
        tokens: [...context.tokens, context.currentToken],
        currentToken: '',
        bufferChar: ''
      }
    }
  }
}

function count (txt: string): void {
  let machine: MachineState<WordCountState, WordCountContext> = createMachine({
    currentState: 'IDLE',
    context: {
      currentToken: '',
      bufferChar: '',
      tokens: []
    }
  })

  for (const char of [...(txt + '\n')]) {
    machine = doTransition(wordCountFsmDefinition, machine, { type: 'CHAR', char })
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
