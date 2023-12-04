// npm run snippet:deserialize-machine

import 'module-alias/register'

import { deserializeMachine, type FSMDefinition } from '@minifsm/core'

// Define types for state, context, and input
type MyState = 'STATE_A' | 'STATE_B'

interface MyContext {
  data: string
}

interface MyInput {
  action: string
}

// Define an FSM definition
const fsmDefinition: FSMDefinition<MyState, MyContext, MyInput> = {
  STATE_A: {
    transitions: [],
    defaultTransition: { nextState: 'STATE_A', action: ({ context }) => context }
  },
  STATE_B: {
    transitions: [],
    defaultTransition: { nextState: 'STATE_B', action: ({ context }) => context }
  }
}

// Define a serialized machine
const serializedMachine = {
  currentState: 'STATE_A',
  context: { data: 'Serialized data' }
}

// Deserialize the serialized machine
const deserializedMachine = deserializeMachine({
  serialized: serializedMachine,
  definition: fsmDefinition
})

// Log the deserialized machine
console.log('Deserialized Machine:', deserializedMachine)
