// npm run snippet:fsm-state-definition

import 'module-alias/register'

import { type FSMStateDefinition } from '@minifsm/core'

// Define a string enum for the state
enum MyState {
  START = 'START',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE'
}

// Define types for context and input
interface MyContext {
  progress: number
}

interface MyInput {
  action: string
}

// Define a state definition for a specific state
const startStateDefinition: FSMStateDefinition<MyState, MyContext, MyInput> = {
  transitions: [
    {
      condition: ({ input }) => input.action === 'start',
      nextState: MyState.IN_PROGRESS,
      action: ({ context }) => ({ ...context, progress: 25 })
    }
  ],
  defaultTransition: {
    nextState: MyState.START,
    action: ({ context }) => ({ ...context }) // No action for the default transition
  }
}

// Log the state definition
console.log('Start State Definition:', startStateDefinition)
