import 'module-alias/register'
import {
  createMachine,
  createNullStateDefinition,
  deserializeMachine,
  doTransition,
  type FSMDefinition,
  serializeMachine
} from '@minifsm/core'

// Define FSM states
enum MyState {
  START = 'START',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE'
}

// Define FSM context and input types
interface MyContext {
  progress: number
}

interface MyInput {
  increment: number
}

// Define FSM transitions and actions
const fsmDefinition: FSMDefinition<MyState, MyContext, MyInput> = {
  [MyState.START]: {
    transitions: [
      {
        condition: ({ context, input }) => input.increment > 0,
        nextState: MyState.IN_PROGRESS,
        action: ({ context, input }) => ({
          ...context,
          progress: context.progress + input.increment
        })
      }
    ],
    defaultTransition: {
      nextState: MyState.START,
      action: ({ context }) => context
    }
  },
  [MyState.IN_PROGRESS]: {
    transitions: [
      {
        condition: ({ context }) => context.progress >= 100,
        nextState: MyState.COMPLETE,
        action: ({ context }) => context
      }
    ],
    defaultTransition: {
      nextState: MyState.IN_PROGRESS,
      action: ({ context, input }) => ({
        ...context,
        progress: context.progress + input.increment
      })
    }
  },
  [MyState.COMPLETE]: createNullStateDefinition(MyState.COMPLETE)
}

// Define initial context and input
const initialContext: MyContext = { progress: 0 }
const input: MyInput = { increment: 20 }

// Create initial FSM machine
const machine = createMachine({
  currentState: MyState.START,
  context: initialContext
})

// Perform transition
const updatedMachine = doTransition({
  definition: fsmDefinition,
  input,
  machine
})

// Serialize FSM
const serializedMachine = serializeMachine(updatedMachine)

// Deserialize FSM
const deserializedMachine = deserializeMachine({
  serialized: serializedMachine,
  definition: fsmDefinition
})

// Output
console.log('Initial Machine:', machine)
console.log('Updated Machine:', updatedMachine)
console.log('Serialized Machine:', serializedMachine)
console.log('Deserialized Machine:', deserializedMachine)

let mutatedMachine = createMachine({
  currentState: MyState.START,
  context: initialContext
})

while (mutatedMachine.currentState !== MyState.COMPLETE) {
  mutatedMachine = doTransition({
    definition: fsmDefinition,
    input,
    machine: mutatedMachine
  })
}

console.log('Complete Machine: ', mutatedMachine)
