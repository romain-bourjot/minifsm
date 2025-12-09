/**
 * @packageDocumentation
 *
 * Defines types, functions, and utilities for working with Finite State Machines (FSMs).
 *
 * This module provides essential components for constructing, managing, and interacting with FSMs,
 * using a function-based state handler approach where each state is represented by a handler function
 * that processes inputs and returns the new machine state.
 */

/**
 * @categoryDescription Type
 *
 * Defines types used to represent Finite State Machines (FSMs) and their components.
 * These types are fundamental for defining FSMs, including states, machine definitions, and inputs.
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
 * Provides utility functions for creating, serializing, and deserializing FSMs.
 * These utilities streamline the implementation and management of FSMs.
 */

/**
 * Base constraint for context types.
 * This ensures context is always an object with string keys.
 *
 * @category Type
 */
export type ContextConstraint = Record<string, unknown>

/**
 * Base constraint for input types.
 * All inputs must have a `type` discriminator field that identifies the input kind.
 * This enables type-safe discrimination of input variants in state handlers.
 *
 * @category Type
 *
 * @typeParam Type - The discriminator string literal type. Defaults to `string` for flexibility.
 *
 * @example
 * ```typescript
 * // Define specific input types
 * interface ClickInput extends BaseInput<'CLICK'> {
 *   x: number;
 *   y: number;
 * }
 *
 * interface KeyInput extends BaseInput<'KEY'> {
 *   key: string;
 * }
 *
 * type AppInput = ClickInput | KeyInput;
 * ```
 */
export interface BaseInput<Type extends string = string> {
  type: Type
}

/**
 * Represents the state of a finite state machine.
 * Contains the current state label and associated context data.
 *
 * @category Type
 *
 * @typeParam State - Union of valid state string literals
 * @typeParam Context - Shape of the context data
 *
 * @example
 * ```typescript
 * type CounterMachine = MachineState<'idle' | 'counting', { count: number }>;
 *
 * const machine: CounterMachine = {
 *   currentState: 'idle',
 *   context: { count: 0 }
 * };
 * ```
 */
export interface MachineState<State extends string, Context> {
  currentState: State
  context: Context
}

/**
 * A state handler function that processes inputs for a specific state.
 * Returns the new machine state, or undefined to remain in the current state.
 *
 * @category Type
 *
 * @typeParam States - Union of all valid state string literals
 * @typeParam Context - The context type
 * @typeParam Inputs - Union of all valid input types
 *
 * @example
 * ```typescript
 * const idleHandler: StateHandler<'idle' | 'running', MyContext, MyInput> = ({ context, input }) => {
 *   if (input.type === 'START') {
 *     return { currentState: 'running', context: { ...context, startTime: Date.now() } };
 *   }
 *   return undefined; // Stay in current state
 * };
 * ```
 */
export type StateHandler<States extends string, Context, Inputs extends BaseInput> = (params: {
  context: Context
  input: Inputs
}) => MachineState<States, Context> | undefined

/**
 * Definition of a finite state machine using the function-based handler approach.
 * Maps each state to its handler function.
 *
 * Each handler receives the current context and input, and returns either:
 * - A new machine state (to transition)
 * - undefined (to stay in the current state)
 *
 * @category Type
 *
 * @typeParam States - Union of all valid state string literals
 * @typeParam Context - The context type
 * @typeParam Inputs - Union of all valid input types
 *
 * @example
 * ```typescript
 * const definition: MachineDef<'idle' | 'running', MyContext, MyInput> = {
 *   idle: ({ context, input }) => {
 *     if (input.type === 'START') {
 *       return { currentState: 'running', context };
 *     }
 *     return undefined;
 *   },
 *   running: ({ context, input }) => {
 *     if (input.type === 'STOP') {
 *       return { currentState: 'idle', context };
 *     }
 *     return undefined;
 *   }
 * };
 * ```
 */
export type MachineDef<States extends string, Context, Inputs extends BaseInput> = Record<
  States,
  StateHandler<States, Context, Inputs>
>

/**
 * Represents the serialized form of a Finite State Machine (FSM).
 * Serialized FSMs provide a compact representation of FSM instances that can be stored or transmitted.
 * They consist of the current state and context of the FSM, allowing for easy reconstruction of the FSM state.
 * Serialized FSMs are useful for persistence, communication, and debugging purposes.
 *
 * @category Type
 *
 * @typeParam Context - Type of the FSM context.
 */
export interface SerializedMachine<Context> {
  currentState: string
  context: Context
}

/**
 * Performs a state transition based on the current state and input.
 * Calls the appropriate state handler and returns the new machine state.
 * If the handler returns undefined, the original state is returned unchanged.
 *
 * @category MainFunction
 *
 * @typeParam States - Union of all valid state string literals
 * @typeParam Context - The context type
 * @typeParam Inputs - Union of all valid input types
 *
 * @param machineDef - The state machine definition mapping states to handlers
 * @param machine - The current machine state
 * @param input - The input to process
 *
 * @returns The new machine state after processing the input
 *
 * @example
 * ```typescript
 * const newMachine = doTransition(definition, machine, { type: 'START' });
 * ```
 */
export function doTransition<States extends string, Context, Inputs extends BaseInput> (
  machineDef: MachineDef<States, Context, Inputs>,
  machine: MachineState<States, Context>,
  input: Inputs
): MachineState<States, Context> {
  const handler = machineDef[machine.currentState]
  const newState = handler({
    context: machine.context,
    input
  })
  return newState ?? machine
}

/**
 * Creates a Finite State Machine (FSM) with the specified current state and context.
 * FSM instances represent the current state and context of an FSM.
 * They encapsulate the state and context data required for performing transitions and tracking the FSM's state.
 * FSM instances provide a convenient way to manage and manipulate FSMs within applications.
 *
 * @category Utils
 *
 * @typeParam State - Type of the FSM state.
 * @typeParam Context - Type of the FSM context.
 *
 * @param proto
 * @param proto.currentState - The current state of the FSM.
 * @param proto.context - The context of the FSM.
 *
 * @returns A new FSM instance.
 */
export function createMachine<State extends string, Context> ({ currentState, context }: {
  currentState: State
  context: Context
}): MachineState<State, Context> {
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
 *
 * @typeParam State - Type of the FSM state.
 * @typeParam Context - Type of the FSM context.
 *
 * @param machine - The FSM to serialize.
 *
 * @returns The serialized form of the FSM.
 */
export function serializeMachine<State extends string, Context> (
  machine: MachineState<State, Context>
): SerializedMachine<Context> {
  return {
    currentState: machine.currentState,
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
 *
 * @typeParam States - Union of all valid state string literals
 * @typeParam Context - The context type
 * @typeParam Inputs - Union of all valid input types
 *
 * @param params
 * @param params.serialized - The serialized form of the FSM.
 * @param params.definition - The definition of the FSM.
 *
 * @returns The deserialized FSM instance.
 *
 * @throws Error if the serialized state does not match any state in the FSM definition.
 */
export function deserializeMachine<States extends string, Context, Inputs extends BaseInput> ({
  serialized,
  definition
}: {
  serialized: SerializedMachine<Context>
  definition: MachineDef<States, Context, Inputs>
}): MachineState<States, Context> {
  const states = Object.keys(definition) as States[]
  const found = states.find(x => x === serialized.currentState)

  if (typeof found === 'undefined') {
    throw new Error('MINIFSM_DESERIALIZE_ERROR: Unable to find corresponding state!')
  }

  return createMachine({
    currentState: found,
    context: serialized.context
  })
}

// Legacy type aliases for backward compatibility documentation
// These are exported for reference but the old API is no longer supported

/**
 * @deprecated Use MachineState instead. This is a legacy alias.
 */
export interface FSMMachine<FSMState, FSMContext> {
  currentState: FSMState
  context: FSMContext
}

/**
 * @deprecated Use SerializedMachine instead. This is a legacy alias.
 */
export interface FSMSerializedMachine<FSMContext> {
  currentState: string
  context: FSMContext
}
