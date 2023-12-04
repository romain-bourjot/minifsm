// npm run snippet:create-null-state-definition

import 'module-alias/register'

import { createNullStateDefinition } from '@minifsm/core'

// Define types for state, context, and input
type MyState = 'STATE_A' | 'STATE_B'

interface MyContext {
  data: string
}

interface MyInput {
  action: string
}

// Create a null state definition for STATE_A
const nullStateDefinitionA = createNullStateDefinition<MyState, MyContext, MyInput>('STATE_A')

// Create a null state definition for STATE_B
const nullStateDefinitionB = createNullStateDefinition<MyState, MyContext, MyInput>('STATE_B')

// Log the null state definitions
console.log('Null State Definition for STATE_A:', nullStateDefinitionA)
console.log('Null State Definition for STATE_B:', nullStateDefinitionB)
