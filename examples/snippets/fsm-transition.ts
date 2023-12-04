// npm run snippet:fsm-transition

import 'module-alias/register'

import { type FSMTransition } from '@minifsm/core'

// Define types for state, context, and input
type MyState = 'STATE_A' | 'STATE_B'

interface MyContext {
  data: string
}

interface MyInput {
  action: string
}

// Define a transition function
const transitionFunction: FSMTransition<MyState, MyContext, MyInput> = {
  nextState: 'STATE_B',
  action: ({ context }) => ({ ...context, data: 'Transition occurred' })
}

// Simulate the transition
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const currentState: MyState = 'STATE_A'
const currentContext: MyContext = { data: 'Initial data' }
const input: MyInput = { action: 'perform_transition' }

// Apply the transition function
const updatedContext = transitionFunction.action({ context: currentContext, input })

// Log the updated context
console.log('Updated Context:', updatedContext)
