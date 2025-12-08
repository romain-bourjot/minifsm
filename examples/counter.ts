import 'module-alias/register'
import {
  createMachine,
  deserializeMachine,
  doTransition,
  type MachineDef,
  type MachineState,
  type BaseInput,
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

interface MyInput extends BaseInput<'INCREMENT'> {
  increment: number
}

// Define FSM with function-based handlers
const fsmDefinition: MachineDef<MyState, MyContext, MyInput> = {
  [MyState.START]: ({ context, input }) => {
    if (input.increment > 0) {
      return {
        currentState: MyState.IN_PROGRESS,
        context: {
          ...context,
          progress: context.progress + input.increment
        }
      }
    }
    return undefined
  },

  [MyState.IN_PROGRESS]: ({ context, input }) => {
    const newProgress = context.progress + input.increment
    if (newProgress >= 100) {
      return {
        currentState: MyState.COMPLETE,
        context: { ...context, progress: newProgress }
      }
    }
    return {
      currentState: MyState.IN_PROGRESS,
      context: { ...context, progress: newProgress }
    }
  },

  [MyState.COMPLETE]: () => undefined
}

// Define initial context and input
const initialContext: MyContext = { progress: 0 }
const input: MyInput = { type: 'INCREMENT', increment: 20 }

// Create initial FSM machine
const machine = createMachine({
  currentState: MyState.START,
  context: initialContext
})

// Perform transition
const updatedMachine = doTransition(
  fsmDefinition,
  machine,
  input
)

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

let mutatedMachine: MachineState<MyState, MyContext> = createMachine({
  currentState: MyState.START,
  context: initialContext
})

while (mutatedMachine.currentState !== MyState.COMPLETE) {
  mutatedMachine = doTransition(
    fsmDefinition,
    mutatedMachine,
    input
  )
}

console.log('Complete Machine: ', mutatedMachine)
