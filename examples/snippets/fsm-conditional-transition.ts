// npm run snippet:fsm-conditional-transition

import 'module-alias/register'

import { type FSMConditionalTransition } from '@minifsm/core'

// Define types for state, context, and input
type MyState = 'STATE_A' | 'STATE_B'

interface MyContext {
  data: string
}

interface MyInput {
  action: string
}

// Define a conditional transition
const conditionalTransition: FSMConditionalTransition<MyState, MyContext, MyInput> = {
  condition: ({ input }) => input.action === 'perform_transition',
  nextState: 'STATE_B',
  action: ({ context }) => ({ ...context, data: 'Transition occurred' })
}

// Simulate the conditional transition with an input
const currentContext: MyContext = { data: 'Initial data' }
const input: MyInput = { action: 'perform_transition' }

// Check if the transition should occur based on the condition
const shouldTransition = conditionalTransition.condition({ context: currentContext, input })

// If the condition is met, apply the transition action
const updatedContext = shouldTransition
  ? conditionalTransition.action({
    context: currentContext,
    input
  })
  : currentContext

// Log the updated context
console.log('Updated Context after conditional transition:', updatedContext)
