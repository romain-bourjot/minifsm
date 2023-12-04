// npm run snippet:create-null-transition

import 'module-alias/register'

import { createNullTransition } from '@minifsm/core'

// Define types for state, context, and input
type MyState = 'STATE_A' | 'STATE_B'

interface MyContext {
  data: string
}

interface MyInput {
  action: string
}

// Create a null transition for STATE_A
const nullTransitionA = createNullTransition<MyState, MyContext, MyInput>('STATE_A')

// Create a null transition for STATE_B
const nullTransitionB = createNullTransition<MyState, MyContext, MyInput>('STATE_B')

// Log the null transitions
console.log('Null Transition for STATE_A:', nullTransitionA)
console.log('Null Transition for STATE_B:', nullTransitionB)
