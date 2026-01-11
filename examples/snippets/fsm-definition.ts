// npm run snippet:fsm-definition

import 'module-alias/register'

import { type MachineDef, type BaseInput } from '@minifsm/core'

// Define types for state, context, and input
type MyState = 'STATE_A' | 'STATE_B'

interface MyContext {
  data: string
}

interface MyInput extends BaseInput<'ACTION'> {
  action: string
}

// Define the FSM definition with function-based handlers
const fsmDefinition: MachineDef<MyState, MyContext, MyInput> = {
  STATE_A: () => undefined,
  STATE_B: () => undefined
}

// Log the FSM definition
console.log('FSM Definition:', fsmDefinition)
