/**
 * Documentation Examples Tests
 *
 * This file tests all code snippets from the MiniFSM documentation to ensure they work correctly.
 * Each test corresponds to code examples in the documentation files.
 */

/* eslint-disable @typescript-eslint/no-unnecessary-condition -- documenting explicit type checks */
/* eslint-disable @typescript-eslint/no-unsafe-type-assertion -- test type casting */
/* eslint-disable @typescript-eslint/prefer-destructuring -- matching documentation style */
/* eslint-disable max-lines -- comprehensive documentation coverage */
/* eslint-disable @typescript-eslint/no-unused-vars -- testing assigns to variables */
/* eslint-disable prefer-const -- matching documentation patterns */
/* eslint-disable arrow-body-style -- matching documentation examples */

import { describe, it } from 'mocha'
import assert from 'node:assert'
import {
  createMachine,
  doTransition,
  serializeMachine,
  deserializeMachine,
  type MachineDef,
  type MachineState,
  type BaseInput,
  type SerializedMachine
} from '../src'

// ============================================================================
// README.md - Quick Start Examples
// ============================================================================

void describe('README.md Quick Start', () => {
  // Define your states
  type State = 'idle' | 'loading' | 'success' | 'error'

  // Define your context (data that persists across transitions)
  interface Context {
    data: string | null
    errorMessage: string | null
  }

  // Define your inputs (events that trigger transitions)
  interface FetchInput extends BaseInput<'FETCH'> {}
  interface SuccessInput extends BaseInput<'SUCCESS'> { data: string }
  interface FailureInput extends BaseInput<'FAILURE'> { error: string }
  interface ResetInput extends BaseInput<'RESET'> {}

  type Input = FetchInput | SuccessInput | FailureInput | ResetInput

  // State handlers from README
  const definition: MachineDef<State, Context, Input> = {
    idle: ({ context, input }) => {
      if (input.type === 'FETCH') {
        return { currentState: 'loading', context }
      }
      return undefined
    },

    loading: ({ context, input }) => {
      if (input.type === 'SUCCESS') {
        return {
          currentState: 'success',
          context: { ...context, data: input.data, errorMessage: null }
        }
      }
      if (input.type === 'FAILURE') {
        return {
          currentState: 'error',
          context: { ...context, data: null, errorMessage: input.error }
        }
      }
      return undefined
    },

    success: ({ input }) => {
      if (input.type === 'RESET') {
        return { currentState: 'idle', context: { data: null, errorMessage: null } }
      }
      return undefined
    },

    error: ({ input }) => {
      if (input.type === 'RESET') {
        return { currentState: 'idle', context: { data: null, errorMessage: null } }
      }
      return undefined
    }
  }

  void it('should create a machine and transition to loading', () => {
    const machine = createMachine({
      currentState: 'idle' as State,
      context: { data: null, errorMessage: null }
    })

    const loadingMachine = doTransition(definition, machine, { type: 'FETCH' })
    assert.strictEqual(loadingMachine.currentState, 'loading')
  })

  void it('should complete fetch flow to success', () => {
    let machine: MachineState<State, Context> = createMachine({
      currentState: 'idle' as State,
      context: { data: null, errorMessage: null }
    })

    machine = doTransition(definition, machine, { type: 'FETCH' })
    assert.strictEqual(machine.currentState, 'loading')

    machine = doTransition(definition, machine, { type: 'SUCCESS', data: 'Hello, World!' })
    assert.strictEqual(machine.currentState, 'success')
    assert.strictEqual(machine.context.data, 'Hello, World!')
  })

  void it('should handle failure', () => {
    let machine: MachineState<State, Context> = createMachine({
      currentState: 'idle' as State,
      context: { data: null, errorMessage: null }
    })

    machine = doTransition(definition, machine, { type: 'FETCH' })
    machine = doTransition(definition, machine, { type: 'FAILURE', error: 'Network error' })

    assert.strictEqual(machine.currentState, 'error')
    assert.strictEqual(machine.context.errorMessage, 'Network error')
  })

  void it('should serialize and deserialize machine', () => {
    const machine = createMachine({
      currentState: 'success' as State,
      context: { data: 'test data', errorMessage: null }
    })

    const serialized = serializeMachine(machine)
    const json = JSON.stringify(serialized)

    const parsed = JSON.parse(json) as SerializedMachine<Context>
    const restored = deserializeMachine({
      serialized: parsed,
      definition
    })

    assert.strictEqual(restored.currentState, 'success')
    assert.strictEqual(restored.context.data, 'test data')
  })

  void it('should throw error on invalid state deserialization', () => {
    assert.throws(() => {
      deserializeMachine({
        serialized: { currentState: 'unknown', context: { data: null, errorMessage: null } },
        definition
      })
    }, /MINIFSM_DESERIALIZE_ERROR/)
  })
})

// ============================================================================
// quick-start.md - Traffic Light Example
// ============================================================================

void describe('quick-start.md Traffic Light', () => {
  type TrafficLightState = 'OFF' | 'RED' | 'YELLOW' | 'GREEN'

  interface TrafficLightContext {
    since: number
    durations: {
      red: number
      yellow: number
      green: number
    }
  }

  interface TurnOnInput extends BaseInput<'TURN_ON'> {}
  interface TurnOffInput extends BaseInput<'TURN_OFF'> {}
  interface TickInput extends BaseInput<'TICK'> { timestamp: number }

  type TrafficLightInput = TurnOnInput | TurnOffInput | TickInput

  const trafficLightDef: MachineDef<TrafficLightState, TrafficLightContext, TrafficLightInput> = {
    OFF: ({ context, input }) => {
      if (input.type === 'TURN_ON') {
        return {
          currentState: 'RED',
          context: { ...context, since: Date.now() }
        }
      }
      return undefined
    },

    RED: ({ context, input }) => {
      if (input.type === 'TURN_OFF') {
        return { currentState: 'OFF', context }
      }
      if (input.type === 'TICK' && input.timestamp - context.since >= context.durations.red) {
        return {
          currentState: 'GREEN',
          context: { ...context, since: input.timestamp }
        }
      }
      return undefined
    },

    GREEN: ({ context, input }) => {
      if (input.type === 'TURN_OFF') {
        return { currentState: 'OFF', context }
      }
      if (input.type === 'TICK' && input.timestamp - context.since >= context.durations.green) {
        return {
          currentState: 'YELLOW',
          context: { ...context, since: input.timestamp }
        }
      }
      return undefined
    },

    YELLOW: ({ context, input }) => {
      if (input.type === 'TURN_OFF') {
        return { currentState: 'OFF', context }
      }
      if (input.type === 'TICK' && input.timestamp - context.since >= context.durations.yellow) {
        return {
          currentState: 'RED',
          context: { ...context, since: input.timestamp }
        }
      }
      return undefined
    }
  }

  void it('should start OFF and turn ON to RED', () => {
    const machine = createMachine({
      currentState: 'OFF' as TrafficLightState,
      context: {
        since: 0,
        durations: { red: 5000, yellow: 2000, green: 3000 }
      }
    })

    const onMachine = doTransition(trafficLightDef, machine, { type: 'TURN_ON' })
    assert.strictEqual(onMachine.currentState, 'RED')
  })

  void it('should transition RED to GREEN after duration', () => {
    const startTime = 1000000
    let machine = createMachine({
      currentState: 'RED' as TrafficLightState,
      context: {
        since: startTime,
        durations: { red: 5000, yellow: 2000, green: 3000 }
      }
    })

    // Tick before duration - should stay RED
    machine = doTransition(trafficLightDef, machine, { type: 'TICK', timestamp: startTime + 4000 })
    assert.strictEqual(machine.currentState, 'RED')

    // Tick after duration - should go GREEN
    machine = doTransition(trafficLightDef, machine, { type: 'TICK', timestamp: startTime + 6000 })
    assert.strictEqual(machine.currentState, 'GREEN')
  })

  void it('should complete full cycle', () => {
    const startTime = 1000000
    let machine = createMachine({
      currentState: 'OFF' as TrafficLightState,
      context: {
        since: 0,
        durations: { red: 100, yellow: 50, green: 75 }
      }
    })

    // Turn on
    machine = doTransition(trafficLightDef, machine, { type: 'TURN_ON' })
    assert.strictEqual(machine.currentState, 'RED')
    const redStart = machine.context.since

    // RED -> GREEN
    machine = doTransition(trafficLightDef, machine, { type: 'TICK', timestamp: redStart + 100 })
    assert.strictEqual(machine.currentState, 'GREEN')
    const greenStart = machine.context.since

    // GREEN -> YELLOW
    machine = doTransition(trafficLightDef, machine, { type: 'TICK', timestamp: greenStart + 75 })
    assert.strictEqual(machine.currentState, 'YELLOW')
    const yellowStart = machine.context.since

    // YELLOW -> RED
    machine = doTransition(trafficLightDef, machine, { type: 'TICK', timestamp: yellowStart + 50 })
    assert.strictEqual(machine.currentState, 'RED')
  })

  void it('should turn OFF from any state', () => {
    const states: TrafficLightState[] = ['RED', 'GREEN', 'YELLOW']

    for (const state of states) {
      const machine = createMachine({
        currentState: state,
        context: {
          since: 1000,
          durations: { red: 100, yellow: 50, green: 75 }
        }
      })

      const offMachine = doTransition(trafficLightDef, machine, { type: 'TURN_OFF' })
      assert.strictEqual(offMachine.currentState, 'OFF', `Failed to turn off from ${state}`)
    }
  })
})

// ============================================================================
// examples.md - Counter (Progress Tracker)
// ============================================================================

void describe('examples.md Counter Progress Tracker', () => {
  enum State {
    START = 'START',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETE = 'COMPLETE'
  }

  interface Context {
    progress: number
  }

  interface IncrementInput extends BaseInput<'INCREMENT'> {
    increment: number
  }

  const definition: MachineDef<State, Context, IncrementInput> = {
    [State.START]: ({ context, input }) => {
      if (input.increment > 0) {
        return {
          currentState: State.IN_PROGRESS,
          context: { progress: context.progress + input.increment }
        }
      }
      return undefined
    },

    [State.IN_PROGRESS]: ({ context, input }) => {
      const newProgress = context.progress + input.increment
      if (newProgress >= 100) {
        return { currentState: State.COMPLETE, context: { progress: newProgress } }
      }
      return { currentState: State.IN_PROGRESS, context: { progress: newProgress } }
    },

    [State.COMPLETE]: () => undefined
  }

  void it('should progress from START to COMPLETE', () => {
    let machine: MachineState<State, Context> = createMachine({ currentState: State.START, context: { progress: 0 } })

    const progressValues: number[] = []
    while (machine.currentState !== State.COMPLETE) {
      machine = doTransition(definition, machine, { type: 'INCREMENT', increment: 20 })
      progressValues.push(machine.context.progress)
    }

    assert.deepStrictEqual(progressValues, [20, 40, 60, 80, 100])
    assert.strictEqual(machine.currentState, State.COMPLETE)
  })

  void it('should stay at START with zero increment', () => {
    const machine = createMachine({ currentState: State.START, context: { progress: 0 } })
    const result = doTransition(definition, machine, { type: 'INCREMENT', increment: 0 })
    assert.strictEqual(result.currentState, State.START)
  })
})

// ============================================================================
// examples.md - Traffic Light (simplified cyclic version)
// ============================================================================

void describe('examples.md Traffic Light (Cyclic)', () => {
  type TrafficLightState = 'GREEN' | 'YELLOW' | 'RED'

  interface TrafficLightContext {
    cycleCount: number
  }

  interface TickInput extends BaseInput<'tick'> {}

  const definition: MachineDef<TrafficLightState, TrafficLightContext, TickInput> = {
    RED: ({ context, input }) => {
      if (input.type === 'tick') {
        return { currentState: 'GREEN', context }
      }
      return undefined
    },

    GREEN: ({ context, input }) => {
      if (input.type === 'tick') {
        return { currentState: 'YELLOW', context }
      }
      return undefined
    },

    YELLOW: ({ context, input }) => {
      if (input.type === 'tick') {
        return { currentState: 'RED', context: { cycleCount: context.cycleCount + 1 } }
      }
      return undefined
    }
  }

  void it('should cycle through RED -> GREEN -> YELLOW -> RED', () => {
    let machine: MachineState<TrafficLightState, TrafficLightContext> = {
      currentState: 'RED',
      context: { cycleCount: 0 }
    }

    machine = doTransition(definition, machine, { type: 'tick' })
    assert.strictEqual(machine.currentState, 'GREEN')

    machine = doTransition(definition, machine, { type: 'tick' })
    assert.strictEqual(machine.currentState, 'YELLOW')

    machine = doTransition(definition, machine, { type: 'tick' })
    assert.strictEqual(machine.currentState, 'RED')
    assert.strictEqual(machine.context.cycleCount, 1)
  })
})

// ============================================================================
// examples.md - Vending Machine
// ============================================================================

void describe('examples.md Vending Machine', () => {
  enum State {
    IDLE = 'IDLE',
    SELECTED = 'SELECTED',
    DISPENSING = 'DISPENSING'
  }

  interface Context {
    itemSelected: string
    itemCost: number
    moneyInserted: number
  }

  interface SelectionInput extends BaseInput<'SELECTION'> {
    itemSelected: string
  }

  interface MoneyInsertedInput extends BaseInput<'MONEY_INSERTED'> {
    amount: number
  }

  interface ItemDispensedInput extends BaseInput<'ITEM_DISPENSED'> {}

  type VendingInput = SelectionInput | MoneyInsertedInput | ItemDispensedInput

  const definition: MachineDef<State, Context, VendingInput> = {
    [State.IDLE]: ({ context, input }) => {
      if (input.type === 'SELECTION') {
        return {
          currentState: State.SELECTED,
          context: { ...context, itemSelected: input.itemSelected, itemCost: 2 }
        }
      }
      return undefined
    },

    [State.SELECTED]: ({ context, input }) => {
      if (input.type === 'MONEY_INSERTED') {
        const newTotal = context.moneyInserted + input.amount
        if (newTotal >= context.itemCost) {
          return { currentState: State.DISPENSING, context: { ...context, moneyInserted: newTotal } }
        }
        return { currentState: State.SELECTED, context: { ...context, moneyInserted: newTotal } }
      }
      return undefined
    },

    [State.DISPENSING]: ({ input }) => {
      if (input.type === 'ITEM_DISPENSED') {
        return {
          currentState: State.IDLE,
          context: { itemSelected: '', itemCost: 0, moneyInserted: 0 }
        }
      }
      return undefined
    }
  }

  void it('should complete full purchase flow', () => {
    let machine: MachineState<State, Context> = createMachine({
      currentState: State.IDLE,
      context: { itemSelected: '', itemCost: 0, moneyInserted: 0 }
    })

    // Select a snack
    machine = doTransition(definition, machine, { type: 'SELECTION', itemSelected: 'Chips' })
    assert.strictEqual(machine.currentState, 'SELECTED')

    // Insert money
    machine = doTransition(definition, machine, { type: 'MONEY_INSERTED', amount: 1 })
    assert.strictEqual(machine.context.moneyInserted, 1)

    machine = doTransition(definition, machine, { type: 'MONEY_INSERTED', amount: 1 })
    assert.strictEqual(machine.currentState, 'DISPENSING')

    // Dispense item
    machine = doTransition(definition, machine, { type: 'ITEM_DISPENSED' })
    assert.strictEqual(machine.currentState, 'IDLE')
  })
})

// ============================================================================
// examples.md - Word Counter (Text Tokenizer)
// ============================================================================

void describe('examples.md Word Counter', () => {
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789?'
  const CONTRACTION = "'"

  type State = 'IDLE' | 'IN_WORD' | 'IN_CONTRACTION'

  interface Context {
    currentToken: string
    tokens: string[]
    bufferChar: string
  }

  interface CharInput extends BaseInput<'CHAR'> {
    char: string
  }

  function isValidWordChar (char: string): boolean {
    return ALPHABET.includes(char.toLowerCase())
  }

  function isContraction (char: string): boolean {
    return CONTRACTION.includes(char)
  }

  const definition: MachineDef<State, Context, CharInput> = {
    IDLE: ({ context, input }) => {
      if (isValidWordChar(input.char)) {
        return {
          currentState: 'IN_WORD',
          context: { currentToken: input.char.toLowerCase(), bufferChar: '', tokens: context.tokens }
        }
      }
      return { currentState: 'IDLE', context: { ...context, currentToken: '', bufferChar: '' } }
    },

    IN_WORD: ({ context, input }) => {
      if (isValidWordChar(input.char)) {
        return {
          currentState: 'IN_WORD',
          context: {
            currentToken: `${context.currentToken}${context.bufferChar}${input.char.toLowerCase()}`,
            bufferChar: '',
            tokens: context.tokens
          }
        }
      }
      if (isContraction(input.char)) {
        return {
          currentState: 'IN_CONTRACTION',
          context: { ...context, bufferChar: input.char }
        }
      }
      // End of word
      return {
        currentState: 'IDLE',
        context: { tokens: [...context.tokens, context.currentToken], currentToken: '', bufferChar: '' }
      }
    },

    IN_CONTRACTION: ({ context, input }) => {
      if (isValidWordChar(input.char)) {
        return {
          currentState: 'IN_WORD',
          context: {
            currentToken: `${context.currentToken}${context.bufferChar}${input.char.toLowerCase()}`,
            bufferChar: '',
            tokens: context.tokens
          }
        }
      }
      // Not a contraction, end word
      return {
        currentState: 'IDLE',
        context: { tokens: [...context.tokens, context.currentToken], currentToken: '', bufferChar: '' }
      }
    }
  }

  function tokenize (text: string): string[] {
    let machine: MachineState<State, Context> = createMachine({
      currentState: 'IDLE',
      context: { currentToken: '', bufferChar: '', tokens: [] }
    })

    for (const char of text + '\n') {
      machine = doTransition(definition, machine, { type: 'CHAR', char })
    }

    return machine.context.tokens
  }

  void it('should tokenize contractions correctly', () => {
    const result = tokenize("don't stop believin'")
    // Note: trailing apostrophes are dropped when not followed by a valid word char
    assert.deepStrictEqual(result, ["don't", 'stop', 'believin'])
  })

  void it('should tokenize simple words', () => {
    const result = tokenize('hello world')
    assert.deepStrictEqual(result, ['hello', 'world'])
  })

  void it('should handle numbers', () => {
    const result = tokenize('test123 456')
    assert.deepStrictEqual(result, ['test123', '456'])
  })
})

// ============================================================================
// examples.md - User Lifecycle
// ============================================================================

void describe('examples.md User Lifecycle', () => {
  type UserState = 'WAITING_FOR_VALIDATION' | 'VALIDATED' | 'DELETED'

  interface UserContext {
    email: string
    emailValidationToken: string | null
  }

  interface EmailValidationInput extends BaseInput<'EMAIL_VALIDATION_INPUT'> {
    emailValidationToken: string
  }

  interface DeleteInput extends BaseInput<'DELETE_INPUT'> {}

  type UserInput = EmailValidationInput | DeleteInput

  const userDefinition: MachineDef<UserState, UserContext, UserInput> = {
    WAITING_FOR_VALIDATION: ({ context, input }) => {
      if (input.type === 'DELETE_INPUT') {
        return { currentState: 'DELETED', context }
      }
      if (input.type === 'EMAIL_VALIDATION_INPUT') {
        if (input.emailValidationToken === context.emailValidationToken) {
          return { currentState: 'VALIDATED', context }
        }
      }
      return undefined
    },

    VALIDATED: ({ context, input }) => {
      if (input.type === 'DELETE_INPUT') {
        return { currentState: 'DELETED', context }
      }
      return undefined
    },

    DELETED: () => undefined // Terminal state
  }

  void it('should validate user with correct token', () => {
    let machine: MachineState<UserState, UserContext> = createMachine({
      currentState: 'WAITING_FOR_VALIDATION' as UserState,
      context: { email: 'test@example.com', emailValidationToken: 'abc123' }
    })

    machine = doTransition(userDefinition, machine, {
      type: 'EMAIL_VALIDATION_INPUT',
      emailValidationToken: 'abc123'
    })

    assert.strictEqual(machine.currentState, 'VALIDATED')
  })

  void it('should not validate with wrong token', () => {
    let machine: MachineState<UserState, UserContext> = createMachine({
      currentState: 'WAITING_FOR_VALIDATION' as UserState,
      context: { email: 'test@example.com', emailValidationToken: 'abc123' }
    })

    machine = doTransition(userDefinition, machine, {
      type: 'EMAIL_VALIDATION_INPUT',
      emailValidationToken: 'wrong'
    })

    assert.strictEqual(machine.currentState, 'WAITING_FOR_VALIDATION')
  })

  void it('should allow deletion from any state', () => {
    const states: UserState[] = ['WAITING_FOR_VALIDATION', 'VALIDATED']

    for (const state of states) {
      const machine = createMachine({
        currentState: state,
        context: { email: 'test@example.com', emailValidationToken: 'abc123' }
      })

      const deleted = doTransition(userDefinition, machine, { type: 'DELETE_INPUT' })
      assert.strictEqual(deleted.currentState, 'DELETED', `Failed to delete from ${state}`)
    }
  })

  void it('should not transition from DELETED state', () => {
    const machine = createMachine({
      currentState: 'DELETED' as UserState,
      context: { email: 'test@example.com', emailValidationToken: 'abc123' }
    })

    const result = doTransition(userDefinition, machine, { type: 'DELETE_INPUT' })
    assert.strictEqual(result, machine) // Same reference - no transition
  })
})

// ============================================================================
// examples.md - Async Data Fetching
// ============================================================================

void describe('examples.md Async Data Fetching', () => {
  type FetchState = 'idle' | 'loading' | 'success' | 'error'

  interface FetchContext<T> {
    data: T | null
    error: string | null
  }

  interface FetchInput extends BaseInput<'FETCH'> {}
  interface SuccessInput<T> extends BaseInput<'SUCCESS'> { data: T }
  interface ErrorInput extends BaseInput<'ERROR'> { error: string }
  interface RetryInput extends BaseInput<'RETRY'> {}
  interface ResetInput extends BaseInput<'RESET'> {}

  type Input<T> = FetchInput | SuccessInput<T> | ErrorInput | RetryInput | ResetInput

  function createFetchDefinition<T> (): MachineDef<FetchState, FetchContext<T>, Input<T>> {
    return {
      idle: ({ input }) => {
        if (input.type === 'FETCH') {
          return { currentState: 'loading', context: { data: null, error: null } }
        }
        return undefined
      },

      loading: ({ input }) => {
        if (input.type === 'SUCCESS') {
          return { currentState: 'success', context: { data: input.data, error: null } }
        }
        if (input.type === 'ERROR') {
          return { currentState: 'error', context: { data: null, error: input.error } }
        }
        return undefined
      },

      success: ({ context, input }) => {
        if (input.type === 'FETCH') {
          return { currentState: 'loading', context: { ...context, error: null } }
        }
        if (input.type === 'RESET') {
          return { currentState: 'idle', context: { data: null, error: null } }
        }
        return undefined
      },

      error: ({ input }) => {
        if (input.type === 'RETRY') {
          return { currentState: 'loading', context: { data: null, error: null } }
        }
        if (input.type === 'RESET') {
          return { currentState: 'idle', context: { data: null, error: null } }
        }
        return undefined
      }
    }
  }

  void it('should complete successful fetch flow', () => {
    const definition = createFetchDefinition<{ name: string }>()
    let machine = createMachine<FetchState, FetchContext<{ name: string }>>({
      currentState: 'idle',
      context: { data: null, error: null }
    })

    // Trigger fetch
    machine = doTransition(definition, machine, { type: 'FETCH' })
    assert.strictEqual(machine.currentState, 'loading')

    // Success
    machine = doTransition(definition, machine, {
      type: 'SUCCESS',
      data: { name: 'Alice' }
    })

    assert.strictEqual(machine.currentState, 'success')
    assert.deepStrictEqual(machine.context.data, { name: 'Alice' })
  })

  void it('should handle error and retry', () => {
    const definition = createFetchDefinition<string>()
    let machine = createMachine<FetchState, FetchContext<string>>({
      currentState: 'idle',
      context: { data: null, error: null }
    })

    machine = doTransition(definition, machine, { type: 'FETCH' })
    machine = doTransition(definition, machine, { type: 'ERROR', error: 'Network failed' })

    assert.strictEqual(machine.currentState, 'error')
    assert.strictEqual(machine.context.error, 'Network failed')

    // Retry
    machine = doTransition(definition, machine, { type: 'RETRY' })
    assert.strictEqual(machine.currentState, 'loading')
  })
})

// ============================================================================
// examples.md - Nested State Machines
// ============================================================================

void describe('examples.md Nested State Machines', () => {
  // Child machine: Shipping form
  type ShippingState = 'editing' | 'validated'
  interface ShippingContext { address: string; validated: boolean }
  interface UpdateAddressInput extends BaseInput<'UPDATE_ADDRESS'> { address: string }
  interface ValidateInput extends BaseInput<'VALIDATE'> {}
  type ShippingInput = UpdateAddressInput | ValidateInput

  const shippingDefinition: MachineDef<ShippingState, ShippingContext, ShippingInput> = {
    editing: ({ context, input }) => {
      if (input.type === 'UPDATE_ADDRESS') {
        return { currentState: 'editing', context: { ...context, address: input.address } }
      }
      if (input.type === 'VALIDATE' && context.address.length > 0) {
        return { currentState: 'validated', context: { ...context, validated: true } }
      }
      return undefined
    },
    validated: ({ context, input }) => {
      if (input.type === 'UPDATE_ADDRESS') {
        return { currentState: 'editing', context: { address: input.address, validated: false } }
      }
      return undefined
    }
  }

  // Parent machine: Checkout flow
  type CheckoutState = 'shipping' | 'payment' | 'confirmation'

  interface CheckoutContext {
    shippingMachine: MachineState<ShippingState, ShippingContext>
  }

  interface NextStepInput extends BaseInput<'NEXT_STEP'> {}
  interface ShippingActionInput extends BaseInput<'SHIPPING_ACTION'> {
    action: ShippingInput
  }
  type CheckoutInput = NextStepInput | ShippingActionInput

  const checkoutDefinition: MachineDef<CheckoutState, CheckoutContext, CheckoutInput> = {
    shipping: ({ context, input }) => {
      if (input.type === 'SHIPPING_ACTION') {
        // Delegate to child machine
        const newShipping = doTransition(shippingDefinition, context.shippingMachine, input.action)
        return { currentState: 'shipping', context: { ...context, shippingMachine: newShipping } }
      }
      if (input.type === 'NEXT_STEP' && context.shippingMachine.currentState === 'validated') {
        return { currentState: 'payment', context }
      }
      return undefined
    },

    payment: ({ context, input }) => {
      if (input.type === 'NEXT_STEP') {
        return { currentState: 'confirmation', context }
      }
      return undefined
    },

    confirmation: () => undefined
  }

  void it('should delegate actions to child machine', () => {
    let checkout = createMachine<CheckoutState, CheckoutContext>({
      currentState: 'shipping',
      context: {
        shippingMachine: createMachine({
          currentState: 'editing' as ShippingState,
          context: { address: '', validated: false }
        })
      }
    })

    // Update shipping address via parent
    checkout = doTransition(checkoutDefinition, checkout, {
      type: 'SHIPPING_ACTION',
      action: { type: 'UPDATE_ADDRESS', address: '123 Main St' }
    })

    assert.strictEqual(checkout.context.shippingMachine.context.address, '123 Main St')
  })

  void it('should complete checkout flow with nested machine', () => {
    let checkout = createMachine<CheckoutState, CheckoutContext>({
      currentState: 'shipping',
      context: {
        shippingMachine: createMachine({
          currentState: 'editing' as ShippingState,
          context: { address: '', validated: false }
        })
      }
    })

    // Update address
    checkout = doTransition(checkoutDefinition, checkout, {
      type: 'SHIPPING_ACTION',
      action: { type: 'UPDATE_ADDRESS', address: '123 Main St' }
    })

    // Validate shipping
    checkout = doTransition(checkoutDefinition, checkout, {
      type: 'SHIPPING_ACTION',
      action: { type: 'VALIDATE' }
    })

    assert.strictEqual(checkout.context.shippingMachine.currentState, 'validated')

    // Move to payment
    checkout = doTransition(checkoutDefinition, checkout, { type: 'NEXT_STEP' })
    assert.strictEqual(checkout.currentState, 'payment')

    // Move to confirmation
    checkout = doTransition(checkoutDefinition, checkout, { type: 'NEXT_STEP' })
    assert.strictEqual(checkout.currentState, 'confirmation')
  })

  void it('should not advance to payment without validated shipping', () => {
    let checkout = createMachine<CheckoutState, CheckoutContext>({
      currentState: 'shipping',
      context: {
        shippingMachine: createMachine({
          currentState: 'editing' as ShippingState,
          context: { address: '', validated: false }
        })
      }
    })

    // Try to advance without validation
    const result = doTransition(checkoutDefinition, checkout, { type: 'NEXT_STEP' })
    assert.strictEqual(result.currentState, 'shipping') // Should stay in shipping
  })
})

// ============================================================================
// serialization.md - Serialization API
// ============================================================================

void describe('serialization.md Serialization API', () => {
  type State = 'idle' | 'loading' | 'success'

  interface Context {
    data: string | null
    timestamp: number
  }

  interface FetchInput extends BaseInput<'FETCH'> {}
  type MyInput = FetchInput

  const definition: MachineDef<State, Context, MyInput> = {
    idle: ({ context, input }) => {
      if (input.type === 'FETCH') {
        return { currentState: 'loading', context }
      }
      return undefined
    },
    loading: () => undefined,
    success: () => undefined
  }

  void it('should serialize machine to JSON-compatible object', () => {
    const machine = createMachine({
      currentState: 'success' as State,
      context: { data: 'Hello', timestamp: 1699999999999 }
    })

    const serialized = serializeMachine(machine)

    assert.deepStrictEqual(serialized, {
      currentState: 'success',
      context: { data: 'Hello', timestamp: 1699999999999 }
    })

    // Should be JSON serializable
    const json = JSON.stringify(serialized)
    assert.strictEqual(typeof json, 'string')
  })

  void it('should deserialize machine from JSON', () => {
    const json = '{"currentState":"success","context":{"data":"Hello","timestamp":1699999999999}}'
    const serialized = JSON.parse(json) as SerializedMachine<Context>

    const machine = deserializeMachine({
      serialized,
      definition
    })

    assert.strictEqual(machine.currentState, 'success')
    assert.strictEqual(machine.context.data, 'Hello')
  })

  void it('should throw on invalid state', () => {
    assert.throws(() => {
      deserializeMachine({
        serialized: { currentState: 'unknown_state', context: { data: null, timestamp: 0 } },
        definition
      })
    }, /MINIFSM_DESERIALIZE_ERROR/)
  })
})

// ============================================================================
// Common Patterns Tests
// ============================================================================

void describe('examples.md Common Patterns', () => {
  void describe('Terminal States', () => {
    type State = 'ACTIVE' | 'TERMINAL'

    interface Context { value: number }
    interface Input extends BaseInput<'GO'> {}

    const definition: MachineDef<State, Context, Input> = {
      ACTIVE: ({ context }) => {
        return { currentState: 'TERMINAL', context }
      },
      TERMINAL: () => undefined // Terminal state - no transitions
    }

    void it('should not transition from terminal state', () => {
      const machine = createMachine({
        currentState: 'TERMINAL' as State,
        context: { value: 42 }
      })

      const result = doTransition(definition, machine, { type: 'GO' })
      assert.strictEqual(result, machine) // Same reference
    })
  })

  void describe('Self-Transitions', () => {
    type State = 'LOADING'

    interface Context { progress: number }
    interface ProgressInput extends BaseInput<'PROGRESS'> { value: number }

    const definition: MachineDef<State, Context, ProgressInput> = {
      LOADING: ({ context, input }) => {
        if (input.type === 'PROGRESS') {
          return { currentState: 'LOADING', context: { ...context, progress: input.value } }
        }
        return undefined
      }
    }

    void it('should update context while staying in same state', () => {
      let machine = createMachine({
        currentState: 'LOADING' as State,
        context: { progress: 0 }
      })

      machine = doTransition(definition, machine, { type: 'PROGRESS', value: 50 })
      assert.strictEqual(machine.currentState, 'LOADING')
      assert.strictEqual(machine.context.progress, 50)

      machine = doTransition(definition, machine, { type: 'PROGRESS', value: 100 })
      assert.strictEqual(machine.currentState, 'LOADING')
      assert.strictEqual(machine.context.progress, 100)
    })
  })

  void describe('Guarded Transitions', () => {
    type State = 'SELECTED' | 'CONFIRMED'

    interface Context { balance: number; price: number }
    interface ConfirmInput extends BaseInput<'CONFIRM'> {}

    const definition: MachineDef<State, Context, ConfirmInput> = {
      SELECTED: ({ context, input }) => {
        if (input.type === 'CONFIRM' && context.balance >= context.price) {
          return { currentState: 'CONFIRMED', context }
        }
        return undefined // Stay in SELECTED if balance insufficient
      },
      CONFIRMED: () => undefined
    }

    void it('should transition when guard passes', () => {
      const machine = createMachine({
        currentState: 'SELECTED' as State,
        context: { balance: 100, price: 50 }
      })

      const result = doTransition(definition, machine, { type: 'CONFIRM' })
      assert.strictEqual(result.currentState, 'CONFIRMED')
    })

    void it('should not transition when guard fails', () => {
      const machine = createMachine({
        currentState: 'SELECTED' as State,
        context: { balance: 30, price: 50 }
      })

      const result = doTransition(definition, machine, { type: 'CONFIRM' })
      assert.strictEqual(result.currentState, 'SELECTED')
    })
  })
})
