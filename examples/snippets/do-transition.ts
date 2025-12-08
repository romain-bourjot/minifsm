// npm run snippet:do-transition

import 'module-alias/register'

import { doTransition, type MachineDef, type MachineState, type BaseInput } from '@minifsm/core'

// Define types for state, context, and input
type MyState = 'STATE_A' | 'STATE_B'

interface MyContext {
  data: string
}

interface MyInput extends BaseInput<'go_to_B' | 'stay'> {}

type MyMachine = MachineState<MyState, MyContext>

// Define an FSM definition with function-based handlers
const fsmDefinition: MachineDef<MyState, MyContext, MyInput> = {
  STATE_A: ({ context, input }) => {
    if (input.type === 'go_to_B') {
      return {
        currentState: 'STATE_B',
        context: { ...context, data: 'Transitioned to STATE_B' }
      }
    }
    return undefined // Stay in STATE_A
  },
  STATE_B: () => undefined
}

// Define an FSM machine instance
const machine: MyMachine = {
  currentState: 'STATE_A',
  context: { data: 'Initial data' }
}

// Define an input triggering transition to STATE_B
const inputToStateB: MyInput = { type: 'go_to_B' }

// Perform the transition based on the input
const updatedMachine = doTransition(
  fsmDefinition,
  machine,
  inputToStateB
)

// Log the updated machine after transition
console.log('Updated Machine after transition:', updatedMachine)
