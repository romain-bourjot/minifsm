/**
 * @packageDocumentation
 *
 * Defines types, functions, and utilities for working with Finite State Machines (FSMs).
 *
 * This module provides essential components for constructing, managing, and interacting with FSMs,
 * including types for representing states, transitions, and actions, as well as functions for performing
 * transitions, serializing/deserializing FSMs, and creating transitions/actions.
 *
 */

/**
 * @categoryDescription Type
 *
 * Defines types used to represent Finite State Machines (FSMs) and their components.
 * These types are fundamental for defining FSMs, including states, transitions, conditions, and actions.
 * They provide a flexible and type-safe way to construct FSMs for various applications.
 */

/**
 * @categoryDescription MainFunction
 *
 * Contains functions for performing transitions within Finite State Machines (FSMs).
 * These functions are essential for driving FSM behavior and state changes.
 */

/**
 * @categoryDescription Utils
 *
 * Provides utility functions for creating, serializing, and deserializing FSMs, as well as defining null transitions and actions.
 * These utilities streamline the implementation and management of FSMs.
 */

/**
 * Represents a condition function used in Finite State Machine (FSM) transitions.
 * Conditions are predicates that evaluate to true or false based on the FSM context and input.
 * They determine whether a transition should occur from the current state to a new state.
 * Conditions play a critical role in defining the behavior and logic of FSMs.
 *
 * @category Type
 * @includeExample examples/snippets/fsm-condition.ts
 *
 * @typeparam FSMContext - Type of the FSM context.
 * @typeparam FSMInput - Type of the FSM input.
 */
export type FSMCondition<FSMContext, FSMInput> = (_: { context: FSMContext, input: FSMInput }) => boolean

/**
 * Represents an action function used in Finite State Machine (FSM) transitions.
 * Actions are functions that transform the FSM context based on the current state and input.
 * They modify the context to reflect the effects of transitioning to a new state.
 * Actions are essential for updating the state of an FSM and performing side effects.
 *
 * @category Type
 * @includeExample examples/snippets/fsm-action.ts
 *
 * @typeparam FSMContext - Type of the FSM context.
 * @typeparam FSMInput - Type of the FSM input.
 */
export type FSMAction<FSMContext, FSMInput> = (_: { context: FSMContext, input: FSMInput }) => FSMContext

/**
 * Represents a transition in a Finite State Machine (FSM).
 * Transitions define the movement from one state to another in response to specific conditions and actions.
 * They encapsulate the next state and the action to be performed upon transitioning.
 * Transitions are the building blocks of FSM behavior and logic.
 *
 * @category Type
 * @includeExample examples/snippets/fsm-transition.ts
 *
 * @typeparam FSMState - Type of the FSM state.
 * @typeparam FSMContext - Type of the FSM context.
 * @typeparam FSMInput - Type of the FSM input.
 */
export interface FSMTransition<FSMState, FSMContext, FSMInput> {
  nextState: FSMState
  action: FSMAction<FSMContext, FSMInput>
}

/**
 * Represents a conditional transition in a Finite State Machine (FSM).
 * Conditional transitions allow for more complex FSM behavior by introducing conditions that must be satisfied for a transition to occur.
 * They combine a condition function with a transition, enabling dynamic state changes based on context and input.
 * Conditional transitions provide flexibility and expressiveness in FSM design.
 *
 * @category Type
 * @includeExample examples/snippets/fsm-conditional-transition.ts
 *
 * @typeparam FSMState - Type of the FSM state.
 * @typeparam FSMContext - Type of the FSM context.
 * @typeparam FSMInput - Type of the FSM input.
 */
export type FSMConditionalTransition<FSMState, FSMContext, FSMInput> = {
  condition: FSMCondition<FSMContext, FSMInput>
} & FSMTransition<FSMState, FSMContext, FSMInput>

/**
 * Represents the definition of a state in a Finite State Machine (FSM).
 * State definitions encapsulate the transitions available from a particular state and the default transition when no conditions are met.
 * They provide a structured way to organize and manage the behavior of individual states within an FSM.
 * State definitions are essential for specifying the behavior and transitions of FSM states.
 *
 * @category Type
 * @includeExample examples/snippets/fsm-state-definition.ts
 *
 * @typeparam FSMState - Type of the FSM state.
 * @typeparam FSMContext - Type of the FSM context.
 * @typeparam FSMInput - Type of the FSM input.
 */
export interface FSMStateDefinition<FSMState, FSMContext, FSMInput> {
  transitions: Array<FSMConditionalTransition<FSMState, FSMContext, FSMInput>>
  defaultTransition: FSMTransition<FSMState, FSMContext, FSMInput>
}

/**
 * Represents the definition of a Finite State Machine (FSM).
 * FSM definitions define the states and their corresponding state definitions in an FSM.
 * They provide a high-level overview of the FSM structure and behavior, allowing developers to specify the states and transitions of the FSM.
 * FSM definitions serve as blueprints for constructing FSM instances.
 *
 * @category Type
 * @includeExample examples/snippets/fsm-definition.ts
 *
 * @typeparam FSMState - Type of the FSM state.
 * @typeparam FSMContext - Type of the FSM context.
 * @typeparam FSMInput - Type of the FSM input.
 */
export type FSMDefinition<FSMState extends string, FSMContext, FSMInput> = Record<
FSMState,
FSMStateDefinition<FSMState, FSMContext, FSMInput>
>

/**
 * A **Machine** is an instance of an object encapsulating a current state and a context.
 * It is the object that serves as input and output to doTransition.
 *
 * The **Context** in MiniFSM is an object that is accessible from the machine. It can also be read from outside, as we
 * will see further.
 *
 * The **State** in MiniFSM is a label pointing to one of a finite number of states the machine can be in.
 *
 * @category Type
 * @includeExample examples/snippets/fsm-machine.ts
 *
 * @typeparam FSMState - Type of the state for this machine.
 * @typeparam FSMContext - Type of the data encapsulated in the machine.
 */
export interface FSMMachine<FSMState, FSMContext> {
  currentState: FSMState
  context: FSMContext
}

/**
 * Represents the serialized form of a Finite State Machine (FSM).
 * Serialized FSMs provide a compact representation of FSM instances that can be stored or transmitted.
 * They consist of the current state and context of the FSM, allowing for easy reconstruction of the FSM state.
 * Serialized FSMs are useful for persistence, communication, and debugging purposes.
 *
 * @category Type
 * @includeExample examples/snippets/fsm-serialized-machine.ts
 *
 * @typeparam FSMContext - Type of the FSM context.
 */
export interface FSMSerializedMachine<FSMContext> {
  currentState: string
  context: FSMContext
}

/**
 * Performs a transition in a Finite State Machine (FSM) based on the given input.
 * The `doTransition` function is the primary mechanism for driving FSM behavior by transitioning between states.
 * It evaluates the available transitions from the current state based on the input and executes the appropriate transition.
 * `doTransition` encapsulates the core logic of FSM state changes and is crucial for implementing FSM-based systems.
 *
 * @category MainFunction
 * @includeExample examples/snippets/do-transition.ts
 *
 * @typeparam FSMState - Type of the FSM state.
 * @typeparam FSMContext - Type of the FSM context.
 * @typeparam FSMInput - Type of the FSM input.
 *
 * @param config
 * @param config.definition - The definition of the FSM.
 * @param config.input - The input to trigger the transition.
 * @param config.machine - The current state and context of the FSM.
 *
 * @returns The updated state and context of the FSM after the transition.
 */
export function doTransition<FSMState extends string, FSMContext, FSMInput> ({
  definition,
  input,
  machine
}: {
  definition: FSMDefinition<FSMState, FSMContext, FSMInput>
  input: FSMInput
  machine: FSMMachine<FSMState, FSMContext>
}): FSMMachine<FSMState, FSMContext> {
  const currentState = definition[machine.currentState]
  const transition = currentState.transitions.find(
    x => x.condition({ context: machine.context, input })
  ) ?? currentState.defaultTransition

  return {
    currentState: transition.nextState,
    context: transition.action({ context: machine.context, input })
  }
}

/**
 * Creates a null action function that returns the context unchanged.
 * Null actions are placeholder functions that do not modify the FSM context.
 * They are useful for defining default actions when no specific action is required for a transition.
 * Null actions provide a convenient way to handle transitions that do not involve context modifications.
 *
 * @category Utils
 * @includeExample examples/snippets/create-null-action.ts
 *
 * @typeparam FSMContext - Type of the FSM context.
 * @typeparam FSMInput - Type of the FSM input.
 *
 * @returns A null action function.
 */
export function createNullAction<FSMContext, FSMInput> (): FSMAction<FSMContext, FSMInput> {
  return ({ context }: { context: FSMContext, input: FSMInput }): FSMContext => context
}

/**
 * Creates a null transition that transitions to the specified next state and performs a null action.
 * Null transitions represent transitions that do not involve any state changes or context modifications.
 * They are placeholders used when no specific transition logic is required for a given state.
 * Null transitions simplify FSM definition by providing default behavior for state transitions.
 *
 * @category Utils
 * @includeExample examples/snippets/create-null-transition.ts
 *
 * @typeparam FSMState - Type of the FSM state.
 * @typeparam FSMContext - Type of the FSM context.
 * @typeparam FSMInput - Type of the FSM input.
 *
 * @param nextState - The next state after the transition.
 *
 * @returns A null transition.
 */
export function createNullTransition<FSMState, FSMContext, FSMInput> (
  nextState: FSMState
): FSMTransition<FSMState, FSMContext, FSMInput> {
  return { nextState, action: createNullAction<FSMContext, FSMInput>() }
}

/**
 * Creates a null state definition with no transitions, only a default null transition.
 * Null state definitions represent states with no outgoing transitions.
 * They are useful for defining terminal states or states with default behavior that always leads to the same next state.
 * Null state definitions simplify FSM construction by providing a default transition for states without explicit transitions.
 *
 * @category Utils
 * @includeExample examples/snippets/create-null-state-definition.ts
 *
 * @typeparam FSMState - Type of the FSM state.
 * @typeparam FSMContext - Type of the FSM context.
 * @typeparam FSMInput - Type of the FSM input.
 *
 * @param state The state label.
 *
 * @returns A null state definition.
 */
export function createNullStateDefinition<FSMState extends string, FSMContext, FSMInput> (
  state: FSMState
): FSMStateDefinition<FSMState, FSMContext, FSMInput> {
  return {
    transitions: [],
    defaultTransition: createNullTransition(state)
  }
}

/**
 * Creates a Finite State Machine (FSM) with the specified current state and context.
 * FSM instances represent the current state and context of an FSM.
 * They encapsulate the state and context data required for performing transitions and tracking the FSM's state.
 * FSM instances provide a convenient way to manage and manipulate FSMs within applications.
 *
 * @category Utils
 * @includeExample examples/snippets/create-machine.ts
 *
 * @typeparam FSMState - Type of the FSM state.
 * @typeparam FSMContext - Type of the FSM context.
 *
 * @param proto
 * @param proto.currentState - The current state of the FSM.
 * @param proto.context - The context of the FSM.
 *
 * @returns A new FSM instance.
 */
export function createMachine<FSMState, FSMContext> ({ currentState, context }: {
  currentState: FSMState
  context: FSMContext
}): FSMMachine<FSMState, FSMContext> {
  return {
    currentState,
    context
  }
}

/**
 * Serializes a Finite State Machine (FSM) to a plain object representation.
 * Serialization converts an FSM instance into a format that can be stored, transmitted, or persisted.
 * Serialized FSMs typically include the current state and context of the FSM, allowing for reconstruction of the FSM state.
 * Serialization is useful for persistence, communication, and debugging purposes.
 *
 * @category Utils
 * @includeExample examples/snippets/serialize-machine.ts
 *
 * @typeparam FSMState - Type of the FSM state.
 * @typeparam FSMContext - Type of the FSM context.
 *
 * @param machine - The FSM to serialize.
 *
 * @returns The serialized form of the FSM.
 */
export function serializeMachine<FSMState extends string | number, FSMContext> (
  machine: FSMMachine<FSMState, FSMContext>
): FSMSerializedMachine<FSMContext> {
  return {
    currentState: machine.currentState.toString(),
    context: machine.context
  }
}

/**
 * Deserializes a plain object representation of a Finite State Machine (FSM) to an FSM instance.
 * Deserialization reconstructs an FSM instance from its serialized form, restoring the FSM's state and context.
 * It typically involves parsing the serialized data and creating a new FSM instance with the restored state and context.
 * Deserialization is essential for restoring FSM instances from storage or communication channels.
 *
 * @category Utils
 * @includeExample examples/snippets/deserialize-machine.ts
 *
 * @typeparam FSMState - Type of the FSM state.
 * @typeparam FSMContext - Type of the FSM context.
 * @typeparam FSMInput - Type of the FSM input.
 *
 * @param _
 * @param _.serialized - The serialized form of the FSM.
 * @param _.definition - The definition of the FSM.
 *
 * @returns The deserialized FSM instance.
 *
 * @throws Error if the serialized state does not match any state in the FSM definition.
 */
export function deserializeMachine<FSMState extends string, FSMContext, FSMInput> ({
  serialized,
  definition
}: {
  serialized: FSMSerializedMachine<FSMContext>
  definition: FSMDefinition<FSMState, FSMContext, FSMInput>
}): FSMMachine<FSMState, FSMContext> {
  const states = Object.getOwnPropertyNames(definition) as FSMState[]
  const found = states.find(x => x === serialized.currentState)

  if (typeof found === 'undefined') {
    throw new Error('MINIFSM_DESERIALIZE_ERROR: Unable to find corresponding state!')
  }

  return createMachine({
    currentState: found,
    context: serialized.context
  })
}
