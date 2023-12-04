// npm run snippet:do-transition

import 'module-alias/register'

import { doTransition, type FSMDefinition, type FSMMachine } from '@minifsm/core'

// Define types for state, context, and input
type MyState = 'STATE_A' | 'STATE_B'

interface MyContext {
  data: string
}

interface MyInput {
  action: string
}

// Define an FSM definition
const fsmDefinition: FSMDefinition<MyState, MyContext, MyInput> = {
  STATE_A: {
    transitions: [
      {
        condition: ({ input }) => input.action === 'go_to_B',
        nextState: 'STATE_B',
        action: ({ context }) => ({ ...context, data: 'Transitioned to STATE_B' })
      }
    ],
    defaultTransition: { nextState: 'STATE_A', action: ({ context }) => context }
  },
  STATE_B: {
    transitions: [],
    defaultTransition: { nextState: 'STATE_B', action: ({ context }) => context }
  }
}

// Define an FSM machine instance
const machine: FSMMachine<MyState, MyContext> = {
  currentState: 'STATE_A',
  context: { data: 'Initial data' }
}

// Define an input triggering transition to STATE_B
const inputToStateB: MyInput = { action: 'go_to_B' }

// Perform the transition based on the input
const updatedMachine = doTransition({
  definition: fsmDefinition,
  input: inputToStateB,
  machine
})

// Log the updated machine after transition
console.log('Updated Machine after transition:', updatedMachine)
