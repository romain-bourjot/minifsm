// npm run snippet:fsm-serialized-machine

import 'module-alias/register'

import { type SerializedMachine } from '@minifsm/core'

// Define types for context
interface MyContext {
  progress: number
  message: string
}

// 1. State is a string enum
enum StringEnumState {
  START = 'START',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE'
}

// Create a serialized machine with State as a string enum
const serializedMachineStringEnum: SerializedMachine<MyContext> = {
  currentState: StringEnumState.IN_PROGRESS,
  context: { progress: 75, message: 'Processing...' }
}

console.log('Serialized Machine with String Enum State:', serializedMachineStringEnum)

// 2. State is a string constant union
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type StringConstantUnionState = 'START' | 'IN_PROGRESS' | 'COMPLETE'

// Create a serialized machine with State as a string constant union
const serializedMachineStringUnion: SerializedMachine<MyContext> = {
  currentState: 'IN_PROGRESS',
  context: { progress: 75, message: 'Processing...' }
}

console.log('Serialized Machine with String Constant Union State:', serializedMachineStringUnion)
