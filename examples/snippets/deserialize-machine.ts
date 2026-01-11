// npm run snippet:deserialize-machine

import 'module-alias/register'

import { deserializeMachine, type MachineDef, type BaseInput } from '@minifsm/core'

// Define types for state, context, and input
type MyState = 'STATE_A' | 'STATE_B'

interface MyContext {
  data: string
}

interface MyInput extends BaseInput<'ACTION'> {}

// Define an FSM definition with function-based handlers
const fsmDefinition: MachineDef<MyState, MyContext, MyInput> = {
  STATE_A: () => undefined,
  STATE_B: () => undefined
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
