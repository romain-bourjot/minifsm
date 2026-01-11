// npm run snippet:serialize-machine

import 'module-alias/register'

import { type MachineState, serializeMachine } from '@minifsm/core'

// Define types for state, context, and input
enum MyStateEnum {
  STATE_A = 'STATE_A',
  STATE_B = 'STATE_B'
}

type MyStateUnion = 'STATE_A' | 'STATE_B'

interface MyContext {
  data: string
}

// Define an FSM machine instance with State as a string enum
const machineEnum: MachineState<MyStateEnum, MyContext> = {
  currentState: MyStateEnum.STATE_A,
  context: { data: 'Serialized data' }
}

// Serialize the FSM machine with State as a string enum
const serializedMachineEnum = serializeMachine(machineEnum)

// Log the serialized machine with State as a string enum
console.log('Serialized Machine with State as string enum:', serializedMachineEnum)

// Define an FSM machine instance with State as a string constant union
const machineUnion: MachineState<MyStateUnion, MyContext> = {
  currentState: 'STATE_A',
  context: { data: 'Serialized data' }
}

// Serialize the FSM machine with State as a string constant union
const serializedMachineUnion = serializeMachine(machineUnion)

// Log the serialized machine with State as a string constant union
console.log('Serialized Machine with State as string constant union:', serializedMachineUnion)
