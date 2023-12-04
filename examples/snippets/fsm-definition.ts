// npm run snippet:fsm-definition

import 'module-alias/register'

import { type FSMDefinition, type FSMStateDefinition } from '@minifsm/core'

// Define types for state, context, and input
type MyState = 'STATE_A' | 'STATE_B'

interface MyContext {
  data: string
}

interface MyInput {
  action: string
}

// Define a state definition for each state
const stateADefinition: FSMStateDefinition<MyState, MyContext, MyInput> = {
  transitions: [],
  defaultTransition: { nextState: 'STATE_A', action: ({ context }) => ({ ...context }) } // No-op default transition
}
const stateBDefinition: FSMStateDefinition<MyState, MyContext, MyInput> = {
  transitions: [],
  defaultTransition: { nextState: 'STATE_B', action: ({ context }) => ({ ...context }) } // No-op default transition
}

// Define the FSM definition
const fsmDefinition: FSMDefinition<MyState, MyContext, MyInput> = {
  STATE_A: stateADefinition,
  STATE_B: stateBDefinition
}

// Log the FSM definition
console.log('FSM Definition:', fsmDefinition)
