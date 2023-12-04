// npm run snippet:create-machine

import 'module-alias/register'

import { createMachine } from '@minifsm/core'

// Define types for state and context
type MyState = 'STATE_A' | 'STATE_B'

interface MyContext {
  data: string
}

// Define initial state and context
const initialState: MyState = 'STATE_A'
const initialContext: MyContext = { data: 'Initial data' }

// Create a machine instance
const machine = createMachine({ currentState: initialState, context: initialContext })

// Log the machine instance
console.log('Machine Instance:', machine)
