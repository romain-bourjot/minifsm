/**
 * Documentation Framework Integration Type Checks
 *
 * This file contains code snippets from the framework integration documentation.
 * It is used for type-checking only - these examples are not executed as tests.
 * The purpose is to verify that all documentation code compiles correctly.
 *
 * Run `tsc --noEmit` to verify type correctness.
 */

/* eslint-disable @typescript-eslint/no-unused-vars -- test file contains verification code */
/* eslint-disable @typescript-eslint/no-unnecessary-condition -- documenting explicit type checks */
/* eslint-disable @typescript-eslint/consistent-type-definitions -- matching documentation examples */
/* eslint-disable @typescript-eslint/no-invalid-void-type -- matching thunk patterns */
/* eslint-disable @typescript-eslint/require-await -- simulating async patterns */
/* eslint-disable no-console -- demonstration code */
/* eslint-disable @typescript-eslint/prefer-destructuring -- matching documentation style */
/* eslint-disable @typescript-eslint/no-unsafe-type-assertion -- test type casting */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- test patterns */
/* eslint-disable no-negated-condition -- matching documentation examples */
/* eslint-disable @typescript-eslint/init-declarations -- matching documentation style */
/* eslint-disable arrow-body-style -- matching documentation examples */
/* eslint-disable max-lines -- comprehensive documentation coverage */

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
import type { FC } from 'react'
import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { writable, derived, type Writable, type Readable } from 'svelte/store'
import type { GetServerSideProps } from 'next'
import type { Pool } from 'pg'
import type { Collection, Document } from 'mongodb'
import { z } from 'zod'

// ============================================================================
// Shared Types for Examples
// ============================================================================

type FetchState = 'idle' | 'loading' | 'success' | 'error'

interface FetchContext {
  data: string | null
  error: string | null
}

interface FetchInput extends BaseInput<'FETCH'> {}
interface SuccessInput extends BaseInput<'SUCCESS'> { data: string }
interface ErrorInput extends BaseInput<'ERROR'> { error: string }
interface ResetInput extends BaseInput<'RESET'> {}

type Input = FetchInput | SuccessInput | ErrorInput | ResetInput

const fetchDefinition: MachineDef<FetchState, FetchContext, Input> = {
  idle: ({ input }) => {
    if (input.type === 'FETCH') {
      return { currentState: 'loading', context: { data: null, error: null } }
    }
    return undefined
  },
  loading: ({ context, input }) => {
    if (input.type === 'SUCCESS') {
      return { currentState: 'success', context: { ...context, data: input.data } }
    }
    if (input.type === 'ERROR') {
      return { currentState: 'error', context: { ...context, error: input.error } }
    }
    return undefined
  },
  success: ({ input }) => {
    if (input.type === 'RESET') {
      return { currentState: 'idle', context: { data: null, error: null } }
    }
    return undefined
  },
  error: ({ input }) => {
    if (input.type === 'RESET') {
      return { currentState: 'idle', context: { data: null, error: null } }
    }
    return undefined
  }
}

// ============================================================================
// integrations.md - React with useState
// ============================================================================

// Type definition for the React component (documentation example)
type DataFetcherComponent = FC

// React hook types for documentation verification
type UseMachineReturn<States extends string, Context, Inputs extends BaseInput> = {
  state: States
  context: Context
  send: (input: Inputs) => void
  matches: (state: States) => boolean
}

// Custom hook type signature
function useMachine<States extends string, Context, Inputs extends BaseInput> (
  definition: MachineDef<States, Context, Inputs>,
  initialState: States,
  initialContext: Context
): UseMachineReturn<States, Context, Inputs> {
  // Implementation would use React hooks
  // This is a type-only verification
  const machine = createMachine({ currentState: initialState, context: initialContext })
  return {
    state: machine.currentState,
    context: machine.context,
    send: (input: Inputs) => {
      doTransition(definition, machine, input)
    },
    matches: (state: States) => machine.currentState === state
  }
}

// Type-check the custom hook usage
function typeCheckCustomHook (): void {
  const { state, context, send, matches } = useMachine(
    fetchDefinition,
    'idle',
    { data: null, error: null }
  )

  // Verify types
  const _state: FetchState = state
  const _context: FetchContext = context
  const _matches: boolean = matches('loading')
  send({ type: 'FETCH' })
}

// ============================================================================
// integrations.md - React with useReducer
// ============================================================================

type MachineAction = { type: 'SEND'; payload: Input }

function machineReducer (
  state: MachineState<FetchState, FetchContext>,
  action: MachineAction
): MachineState<FetchState, FetchContext> {
  if (action.type === 'SEND') {
    return doTransition(fetchDefinition, state, action.payload)
  }
  return state
}

// Type check the reducer
function typeCheckReducer (): void {
  const initialState: MachineState<FetchState, FetchContext> = {
    currentState: 'idle',
    context: { data: null, error: null }
  }

  const action: MachineAction = { type: 'SEND', payload: { type: 'FETCH' } }
  const newState = machineReducer(initialState, action)

  // Verify types
  const _currentState: FetchState = newState.currentState
  const _context: FetchContext = newState.context
}

// ============================================================================
// integrations.md - Redux Slice
// ============================================================================

const initialMachine: MachineState<FetchState, FetchContext> = createMachine({
  currentState: 'idle',
  context: { data: null, error: null }
})

const machineSlice = createSlice({
  name: 'fetchMachine',
  initialState: initialMachine,
  reducers: {
    send: (state, action: PayloadAction<Input>) => {
      return doTransition(fetchDefinition, state, action.payload)
    }
  }
})

const { send } = machineSlice.actions
const machineSliceReducer = machineSlice.reducer

// Redux thunk type check
const fetchData = createAsyncThunk(
  'fetchMachine/fetchData',
  async (_: void, { dispatch }) => {
    dispatch(send({ type: 'FETCH' }))

    try {
      // Simulated async operation
      const data = 'test data'
      dispatch(send({ type: 'SUCCESS', data }))
    } catch (error) {
      dispatch(send({ type: 'ERROR', error: (error as Error).message }))
    }
  }
)

// ============================================================================
// integrations.md - Vue Composition API
// ============================================================================

function typeCheckVueComposition (): void {
  const machine: Ref<MachineState<FetchState, FetchContext>> = ref(
    createMachine({ currentState: 'idle', context: { data: null, error: null } })
  )

  const state: ComputedRef<FetchState> = computed(() => machine.value.currentState)
  const context: ComputedRef<FetchContext> = computed(() => machine.value.context)

  function sendInput (input: Input): void {
    machine.value = doTransition(fetchDefinition, machine.value, input)
  }

  // Verify types
  const _state: FetchState = state.value
  const _context: FetchContext = context.value
  sendInput({ type: 'FETCH' })
}

// ============================================================================
// integrations.md - Svelte Store
// ============================================================================

function typeCheckSvelteStore (): void {
  const machine: Writable<MachineState<FetchState, FetchContext>> = writable(
    createMachine({ currentState: 'idle', context: { data: null, error: null } })
  )

  const state: Readable<FetchState> = derived(machine, $m => $m.currentState)
  const context: Readable<FetchContext> = derived(machine, $m => $m.context)

  function sendInput (input: Input): void {
    machine.update(current => doTransition(fetchDefinition, current, input))
  }

  // Subscribe to verify types
  state.subscribe(s => {
    const _state: FetchState = s
  })

  context.subscribe(c => {
    const _context: FetchContext = c
  })
}

// ============================================================================
// integrations.md - Next.js App Router
// ============================================================================

// Checkout machine types for SSR examples
type CheckoutState = 'cart' | 'shipping' | 'payment' | 'confirmation'

interface CheckoutContext {
  items: string[]
  total: number
}

interface NextStepInput extends BaseInput<'NEXT'> {}
type CheckoutInput = NextStepInput

const checkoutDefinition: MachineDef<CheckoutState, CheckoutContext, CheckoutInput> = {
  cart: ({ context, input }) => {
    if (input.type === 'NEXT') {
      return { currentState: 'shipping', context }
    }
    return undefined
  },
  shipping: ({ context, input }) => {
    if (input.type === 'NEXT') {
      return { currentState: 'payment', context }
    }
    return undefined
  },
  payment: ({ context, input }) => {
    if (input.type === 'NEXT') {
      return { currentState: 'confirmation', context }
    }
    return undefined
  },
  confirmation: () => undefined
}

// Server Component simulation - loads initial state
async function getInitialMachine (): Promise<MachineState<CheckoutState, CheckoutContext>> {
  // Simulated cookie retrieval
  const saved: string | null = null

  if (saved !== null) {
    try {
      return deserializeMachine({
        serialized: JSON.parse(saved) as SerializedMachine<CheckoutContext>,
        definition: checkoutDefinition
      })
    } catch {
      // Invalid state, start fresh
    }
  }

  return createMachine({
    currentState: 'cart',
    context: { items: [], total: 0 }
  })
}

// Client Component type check
interface CheckoutClientProps {
  initialMachine: MachineState<CheckoutState, CheckoutContext>
}

function typeCheckNextJsClient (props: CheckoutClientProps): void {
  let machine = props.initialMachine

  const sendCheckout = (input: CheckoutInput): void => {
    const next = doTransition(checkoutDefinition, machine, input)
    // Persist to cookie for SSR recovery
    const serialized = serializeMachine(next)
    // document.cookie = `checkout-state=${JSON.stringify(serialized)}`
    machine = next
  }

  // Verify types
  const _state: CheckoutState = machine.currentState
  const _context: CheckoutContext = machine.context
}

// ============================================================================
// integrations.md - Next.js Pages Router (getServerSideProps)
// ============================================================================

interface PageProps {
  initialMachine: SerializedMachine<CheckoutContext>
}

// Type check getServerSideProps pattern
const getServerSidePropsExample: GetServerSideProps<PageProps> = async (context) => {
  const saved = context.req.cookies['checkout-state']

  let machine: MachineState<CheckoutState, CheckoutContext>

  if (saved !== undefined) {
    try {
      machine = deserializeMachine({
        serialized: JSON.parse(saved) as SerializedMachine<CheckoutContext>,
        definition: checkoutDefinition
      })
    } catch {
      machine = createMachine({
        currentState: 'cart',
        context: { items: [], total: 0 }
      })
    }
  } else {
    machine = createMachine({
      currentState: 'cart',
      context: { items: [], total: 0 }
    })
  }

  return {
    props: {
      initialMachine: serializeMachine(machine)
    }
  }
}

// ============================================================================
// integrations.md - Node.js / Server-Side OrderService
// ============================================================================

type OrderState = 'pending' | 'processing' | 'shipped' | 'delivered'

interface OrderContext {
  orderId: string
  items: string[]
  total: number
}

interface ProcessInput extends BaseInput<'PROCESS'> {}
interface ShipInput extends BaseInput<'SHIP'> {}
interface DeliverInput extends BaseInput<'DELIVER'> {}

type OrderInput = ProcessInput | ShipInput | DeliverInput

const orderDefinition: MachineDef<OrderState, OrderContext, OrderInput> = {
  pending: ({ context, input }) => {
    if (input.type === 'PROCESS') {
      return { currentState: 'processing', context }
    }
    return undefined
  },
  processing: ({ context, input }) => {
    if (input.type === 'SHIP') {
      return { currentState: 'shipped', context }
    }
    return undefined
  },
  shipped: ({ context, input }) => {
    if (input.type === 'DELIVER') {
      return { currentState: 'delivered', context }
    }
    return undefined
  },
  delivered: () => undefined
}

class OrderService {
  private readonly machines = new Map<string, MachineState<OrderState, OrderContext>>()

  createOrder (orderId: string): void {
    this.machines.set(orderId, createMachine({
      currentState: 'pending',
      context: { orderId, items: [], total: 0 }
    }))
  }

  processEvent (orderId: string, input: OrderInput): void {
    const machine = this.machines.get(orderId)
    if (machine !== undefined) {
      this.machines.set(orderId, doTransition(orderDefinition, machine, input))
    }
  }

  getOrderState (orderId: string): SerializedMachine<OrderContext> | null {
    const machine = this.machines.get(orderId)
    return machine !== undefined ? serializeMachine(machine) : null
  }
}

// Type check OrderService
function typeCheckOrderService (): void {
  const service = new OrderService()
  service.createOrder('order-123')
  service.processEvent('order-123', { type: 'PROCESS' })
  const state = service.getOrderState('order-123')

  if (state !== null) {
    const _currentState: string = state.currentState
    const _context: OrderContext = state.context
  }
}

// ============================================================================
// serialization.md - Database Persistence (PostgreSQL)
// ============================================================================

type DbState = 'idle' | 'loading' | 'success'

interface DbContext {
  data: string | null
  timestamp: number
}

interface DbInput extends BaseInput<'FETCH'> {}

const dbDefinition: MachineDef<DbState, DbContext, DbInput> = {
  idle: ({ context, input }) => {
    if (input.type === 'FETCH') {
      return { currentState: 'loading', context }
    }
    return undefined
  },
  loading: () => undefined,
  success: () => undefined
}

// PostgreSQL persistence type check
async function saveMachineState (
  pool: Pool,
  userId: string,
  machine: MachineState<DbState, DbContext>
): Promise<void> {
  const serialized = serializeMachine(machine)
  await pool.query(
    `INSERT INTO machine_states (user_id, state_data, updated_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT (user_id) DO UPDATE SET state_data = $2, updated_at = NOW()`,
    [userId, JSON.stringify(serialized)]
  )
}

async function loadMachineState (
  pool: Pool,
  userId: string
): Promise<MachineState<DbState, DbContext>> {
  const result = await pool.query(
    'SELECT state_data FROM machine_states WHERE user_id = $1',
    [userId]
  )

  if (result.rows.length > 0) {
    try {
      return deserializeMachine({
        serialized: JSON.parse(result.rows[0].state_data as string) as SerializedMachine<DbContext>,
        definition: dbDefinition
      })
    } catch {
      console.warn(`Invalid state for user ${userId}, using default`)
    }
  }

  return createMachine({
    currentState: 'idle',
    context: { data: null, timestamp: 0 }
  })
}

// ============================================================================
// serialization.md - Database Persistence (MongoDB)
// ============================================================================

interface MachineStateDocument extends Document {
  userId: string
  currentState: string
  context: DbContext
  updatedAt: Date
}

async function saveToMongoDB (
  collection: Collection<MachineStateDocument>,
  userId: string,
  machine: MachineState<DbState, DbContext>
): Promise<void> {
  const serialized = serializeMachine(machine)
  await collection.updateOne(
    { userId },
    { $set: { ...serialized, updatedAt: new Date() } },
    { upsert: true }
  )
}

async function loadFromMongoDB (
  collection: Collection<MachineStateDocument>,
  userId: string
): Promise<MachineState<DbState, DbContext>> {
  const doc = await collection.findOne({ userId })

  if (doc !== null) {
    try {
      return deserializeMachine({
        serialized: { currentState: doc.currentState, context: doc.context },
        definition: dbDefinition
      })
    } catch {
      console.warn(`Invalid state for user ${userId}, using default`)
    }
  }

  return createMachine({
    currentState: 'idle',
    context: { data: null, timestamp: 0 }
  })
}

// ============================================================================
// serialization.md - Runtime Validation with Zod
// ============================================================================

// Define your context schema
const contextSchema = z.object({
  userId: z.string(),
  items: z.array(z.string()),
  preferences: z.object({
    theme: z.enum(['light', 'dark']),
    notifications: z.boolean()
  })
})

type ZodContext = z.infer<typeof contextSchema>

// Define valid states
const stateSchema = z.enum(['idle', 'loading', 'success', 'error'])

type ZodState = z.infer<typeof stateSchema>

// Serialized machine schema
const serializedMachineSchema = z.object({
  currentState: stateSchema,
  context: contextSchema
})

interface ZodInput extends BaseInput<'FETCH'> {}

const zodDefinition: MachineDef<ZodState, ZodContext, ZodInput> = {
  idle: ({ context }) => {
    return { currentState: 'loading', context }
  },
  loading: () => undefined,
  success: () => undefined,
  error: () => undefined
}

// Safe deserialization with validation
function safeDeserialize (json: string): MachineState<ZodState, ZodContext> {
  try {
    const parsed: unknown = JSON.parse(json)
    const validated = serializedMachineSchema.parse(parsed)

    return deserializeMachine({
      serialized: validated,
      definition: zodDefinition
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation failed:', error.issues)
    }

    // Return default state on validation failure
    return createMachine({
      currentState: 'idle',
      context: {
        userId: '',
        items: [],
        preferences: { theme: 'light', notifications: true }
      }
    })
  }
}

// Type check Zod validation
function typeCheckZodValidation (): void {
  const json = '{"currentState":"idle","context":{"userId":"123","items":[],"preferences":{"theme":"light","notifications":true}}}'
  const machine = safeDeserialize(json)

  // Verify types
  const _state: ZodState = machine.currentState
  const _userId: string = machine.context.userId
  const _theme: 'light' | 'dark' = machine.context.preferences.theme
}

// ============================================================================
// README.md - React useState Example
// ============================================================================

// Type check for the README React example
function typeCheckReadmeReact (): void {
  // This simulates the React useState pattern from README
  let machine: MachineState<FetchState, FetchContext> = createMachine({ currentState: 'idle' as FetchState, context: { data: null, error: null } })

  const handleAction = (): void => {
    machine = doTransition(fetchDefinition, machine, { type: 'FETCH' })
  }

  handleAction()
  const _currentState: FetchState = machine.currentState
}

// ============================================================================
// README.md - Redux Reducer Example
// ============================================================================

interface ReduxAction {
  type: 'FSM_INPUT'
  payload: Input
}

const readmeReducer = (
  state: MachineState<FetchState, FetchContext> = initialMachine,
  action: ReduxAction
): MachineState<FetchState, FetchContext> => {
  if (action.type === 'FSM_INPUT') {
    return doTransition(fetchDefinition, state, action.payload)
  }
  return state
}

// Type check the README Redux example
function typeCheckReadmeRedux (): void {
  const state = initialMachine
  const action: ReduxAction = { type: 'FSM_INPUT', payload: { type: 'FETCH' } }
  const newState = readmeReducer(state, action)

  const _currentState: FetchState = newState.currentState
}

// ============================================================================
// Export to prevent "unused" errors (type check only)
// ============================================================================

export {
  useMachine,
  machineReducer,
  machineSlice,
  fetchData,
  OrderService,
  getServerSidePropsExample,
  safeDeserialize,
  saveMachineState,
  loadMachineState,
  saveToMongoDB,
  loadFromMongoDB,
  readmeReducer
}

// Prevent execution - this file is for type checking only
if (typeof window !== 'undefined') {
  console.warn('This file is for type checking only and should not be executed')
}
