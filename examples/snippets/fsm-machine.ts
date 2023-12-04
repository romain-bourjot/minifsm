// npm run snippet:fsm-machine

import 'module-alias/register'

import { type FSMMachine } from '@minifsm/core'

// Define types for state and context
type MyState = 'START' | 'IN_PROGRESS' | 'COMPLETE'

interface MyContext {
  progress: number
}

// Define an initial machine state
const initialMachineState: FSMMachine<MyState, MyContext> = {
  currentState: 'START',
  context: { progress: 0 }
}

// Log initial machine state
console.log('Initial Machine State:', initialMachineState)

// Simulate a transition
const updatedMachineState: FSMMachine<MyState, MyContext> = {
  currentState: 'IN_PROGRESS',
  context: { progress: 50 }
}

// Log updated machine state after transition
console.log('Updated Machine State:', updatedMachineState)
