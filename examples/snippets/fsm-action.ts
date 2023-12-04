// npm run snippet:fsm-action

import 'module-alias/register'

import { type FSMAction } from '@minifsm/core'

// Define types for context and input
interface MyContext {
  count: number
}

interface MyInput {
  action: 'increment' | 'decrement'
}

// Define an action function
const actionFunction: FSMAction<MyContext, MyInput> = ({ context, input }) => {
  if (input.action === 'increment') {
    return { ...context, count: context.count + 1 }
  } else if (input.action === 'decrement') {
    return { ...context, count: context.count - 1 }
  }
  return context // No change for unknown actions
}

// Simulate the action with an input
const initialContext: MyContext = { count: 0 }
const input1: MyInput = { action: 'increment' }
const input2: MyInput = { action: 'decrement' }

// Apply the action function with different inputs
const updatedContext1 = actionFunction({ context: initialContext, input: input1 })
const updatedContext2 = actionFunction({ context: updatedContext1, input: input2 })

// Log the updated contexts
console.log('Updated Context after increment:', updatedContext1)
console.log('Updated Context after decrement:', updatedContext2)
