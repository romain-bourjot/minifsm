// npm run snippet:fsm-serialized-machine

import 'module-alias/register'

import { type FSMSerializedMachine } from '@minifsm/core'

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
const serializedMachineStringEnum: FSMSerializedMachine<MyContext> = {
  currentState: StringEnumState.IN_PROGRESS,
  context: { progress: 75, message: 'Processing...' }
}

console.log('Serialized Machine with String Enum State:', serializedMachineStringEnum)

// 2. State is a string constant union
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type StringConstantUnionState = 'START' | 'IN_PROGRESS' | 'COMPLETE'

// Create a serialized machine with State as a string constant union
const serializedMachineStringUnion: FSMSerializedMachine<MyContext> = {
  currentState: 'IN_PROGRESS',
  context: { progress: 75, message: 'Processing...' }
}

console.log('Serialized Machine with String Constant Union State:', serializedMachineStringUnion)

// 3. State is a numeric enum
enum NumericEnumState {
  START,
  IN_PROGRESS,
  COMPLETE
}

// Create a serialized machine with State as a numeric enum
const serializedMachineNumericEnum: FSMSerializedMachine<MyContext> = {
  currentState: NumericEnumState.IN_PROGRESS.toString(),
  context: { progress: 75, message: 'Processing...' }
}

console.log('Serialized Machine with Numeric Enum State:', serializedMachineNumericEnum)
