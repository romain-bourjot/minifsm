import { type FSMMachine, type FSMDefinition, doTransition } from '../src'

const STATES = {
  ACTIVE: Symbol('ACTIVE')
} as const

type CounterState = typeof STATES[keyof typeof STATES]

interface CounterContext {
  count: number
}

type CounterInput = 'INC' | 'DEC'

function createInitialMachine (): FSMMachine<CounterState, CounterContext> {
  return {
    currentState: STATES.ACTIVE,
    context: {
      count: 0
    }
  }
}

function isIncrementCondition ({
  input
}: {
  context: CounterContext
  input: CounterInput
}): boolean {
  return input === 'INC'
}

function isDecrementCondition ({
  input
}: {
  context: CounterContext
  input: CounterInput
}): boolean {
  return input === 'DEC'
}

function nullAction ({
  context
}: {
  context: CounterContext
  input: CounterInput
}): CounterContext {
  return context
}

function incrementAction ({
  context
}: {
  context: CounterContext
  input: CounterInput
}): CounterContext {
  return { ...context, count: context.count + 1 }
}

function decrementAction ({
  context
}: {
  context: CounterContext
  input: CounterInput
}): CounterContext {
  return { ...context, count: context.count - 1 }
}

const counterFsmDefinition: FSMDefinition<CounterState, CounterContext, CounterInput> = {
  [STATES.ACTIVE]: {
    transitions: [
      {
        nextState: STATES.ACTIVE,
        condition: isIncrementCondition,
        action: incrementAction
      },
      {
        nextState: STATES.ACTIVE,
        condition: isDecrementCondition,
        action: decrementAction
      }
    ],
    defaultTransition: {
      nextState: STATES.ACTIVE,
      action: nullAction
    }
  }
}

const inputs: CounterInput[] = [
  'INC',
  'INC',
  'DEC',
  'DEC',
  'DEC',
  'INC'
]

inputs.reduce(
  (machine, input) => {
    console.log(`--------\nInput: ${input}`)
    console.log(`Before transition: ${machine.context.count}`)
    const newMachine = doTransition({
      definition: counterFsmDefinition,
      input,
      machine
    })

    console.log(`After transition: ${newMachine.context.count}`)

    return newMachine
  },
  createInitialMachine()
)
