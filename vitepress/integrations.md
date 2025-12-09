# Framework Integrations

[[TOC]]

MiniFSM's immutable design makes it easy to integrate with popular frameworks and state management libraries.

## React

Since `doTransition` returns a new state object on each transition, MiniFSM works naturally with React's state model.

### With useState

```tsx
import { useState, useCallback } from 'react';
import { createMachine, doTransition, type MachineDef, type MachineState, type BaseInput } from '@minifsm/core';

// Define your machine
type FetchState = 'idle' | 'loading' | 'success' | 'error';

interface FetchContext {
  data: string | null;
  error: string | null;
}

interface FetchInput extends BaseInput<'FETCH'> {}
interface SuccessInput extends BaseInput<'SUCCESS'> { data: string }
interface ErrorInput extends BaseInput<'ERROR'> { error: string }
interface ResetInput extends BaseInput<'RESET'> {}

type Input = FetchInput | SuccessInput | ErrorInput | ResetInput;

const fetchDefinition: MachineDef<FetchState, FetchContext, Input> = {
  idle: ({ input }) => {
    if (input.type === 'FETCH') {
      return { currentState: 'loading', context: { data: null, error: null } };
    }
    return undefined;
  },
  loading: ({ context, input }) => {
    if (input.type === 'SUCCESS') {
      return { currentState: 'success', context: { ...context, data: input.data } };
    }
    if (input.type === 'ERROR') {
      return { currentState: 'error', context: { ...context, error: input.error } };
    }
    return undefined;
  },
  success: ({ input }) => {
    if (input.type === 'RESET') {
      return { currentState: 'idle', context: { data: null, error: null } };
    }
    return undefined;
  },
  error: ({ input }) => {
    if (input.type === 'RESET') {
      return { currentState: 'idle', context: { data: null, error: null } };
    }
    return undefined;
  }
};

// React component
function DataFetcher() {
  const [machine, setMachine] = useState<MachineState<FetchState, FetchContext>>(() =>
    createMachine({ currentState: 'idle', context: { data: null, error: null } })
  );

  const send = useCallback((input: Input) => {
    setMachine(current => doTransition(fetchDefinition, current, input));
  }, []);

  const handleFetch = async () => {
    send({ type: 'FETCH' });

    try {
      const response = await fetch('/api/data');
      const data = await response.text();
      send({ type: 'SUCCESS', data });
    } catch (err) {
      send({ type: 'ERROR', error: (err as Error).message });
    }
  };

  return (
    <div>
      {machine.currentState === 'idle' && (
        <button onClick={handleFetch}>Fetch Data</button>
      )}
      {machine.currentState === 'loading' && <p>Loading...</p>}
      {machine.currentState === 'success' && (
        <div>
          <p>Data: {machine.context.data}</p>
          <button onClick={() => send({ type: 'RESET' })}>Reset</button>
        </div>
      )}
      {machine.currentState === 'error' && (
        <div>
          <p>Error: {machine.context.error}</p>
          <button onClick={() => send({ type: 'RESET' })}>Try Again</button>
        </div>
      )}
    </div>
  );
}
```

### Custom Hook

Create a reusable hook for state machines:

```tsx
import { useState, useCallback, useMemo } from 'react';
import { createMachine, doTransition, type MachineDef, type MachineState, type BaseInput } from '@minifsm/core';

function useMachine<States extends string, Context, Inputs extends BaseInput>(
  definition: MachineDef<States, Context, Inputs>,
  initialState: States,
  initialContext: Context
) {
  const [machine, setMachine] = useState<MachineState<States, Context>>(() =>
    createMachine({ currentState: initialState, context: initialContext })
  );

  const send = useCallback((input: Inputs) => {
    setMachine(current => doTransition(definition, current, input));
  }, [definition]);

  return useMemo(() => ({
    state: machine.currentState,
    context: machine.context,
    send,
    matches: (state: States) => machine.currentState === state
  }), [machine, send]);
}

// Usage
function MyComponent() {
  const { state, context, send, matches } = useMachine(
    fetchDefinition,
    'idle',
    { data: null, error: null }
  );

  return (
    <div>
      {matches('loading') && <Spinner />}
      <button onClick={() => send({ type: 'FETCH' })} disabled={matches('loading')}>
        Fetch
      </button>
    </div>
  );
}
```

### With useReducer

For more complex state logic:

```tsx
import { useReducer } from 'react';
import { doTransition, createMachine, type MachineDef, type MachineState, type BaseInput } from '@minifsm/core';

type Action = { type: 'SEND'; payload: Input };

function machineReducer(
  state: MachineState<FetchState, FetchContext>,
  action: Action
): MachineState<FetchState, FetchContext> {
  if (action.type === 'SEND') {
    return doTransition(fetchDefinition, state, action.payload);
  }
  return state;
}

function MyComponent() {
  const [machine, dispatch] = useReducer(
    machineReducer,
    { currentState: 'idle', context: { data: null, error: null } }
  );

  const send = (input: Input) => dispatch({ type: 'SEND', payload: input });

  // ...
}
```

## Redux

MiniFSM integrates cleanly with Redux since state machines are just state + reducer logic.

### Redux Slice

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createMachine, doTransition, type MachineState } from '@minifsm/core';

// Initial state
const initialMachine: MachineState<FetchState, FetchContext> = createMachine({
  currentState: 'idle',
  context: { data: null, error: null }
});

const machineSlice = createSlice({
  name: 'fetchMachine',
  initialState: initialMachine,
  reducers: {
    send: (state, action: PayloadAction<Input>) => {
      return doTransition(fetchDefinition, state, action.payload);
    }
  }
});

export const { send } = machineSlice.actions;
export default machineSlice.reducer;
```

### In Components

```tsx
import { useSelector, useDispatch } from 'react-redux';
import { send } from './machineSlice';

function DataFetcher() {
  const machine = useSelector((state: RootState) => state.fetchMachine);
  const dispatch = useDispatch();

  const handleFetch = () => {
    dispatch(send({ type: 'FETCH' }));
    // Async logic with thunks or sagas...
  };

  return (
    <div>
      <p>State: {machine.currentState}</p>
      <button onClick={handleFetch}>Fetch</button>
    </div>
  );
}
```

### Redux Thunks

Handle async transitions with thunks:

```ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { send } from './machineSlice';

export const fetchData = createAsyncThunk(
  'fetchMachine/fetchData',
  async (_, { dispatch }) => {
    dispatch(send({ type: 'FETCH' }));

    try {
      const response = await fetch('/api/data');
      const data = await response.text();
      dispatch(send({ type: 'SUCCESS', data }));
    } catch (error) {
      dispatch(send({ type: 'ERROR', error: (error as Error).message }));
    }
  }
);
```

## Vue

MiniFSM works with Vue's reactivity system.

### Composition API

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { createMachine, doTransition, type MachineState } from '@minifsm/core';

const machine = ref<MachineState<FetchState, FetchContext>>(
  createMachine({ currentState: 'idle', context: { data: null, error: null } })
);

const state = computed(() => machine.value.currentState);
const context = computed(() => machine.value.context);

function send(input: Input) {
  machine.value = doTransition(fetchDefinition, machine.value, input);
}

async function handleFetch() {
  send({ type: 'FETCH' });

  try {
    const response = await fetch('/api/data');
    const data = await response.text();
    send({ type: 'SUCCESS', data });
  } catch (err) {
    send({ type: 'ERROR', error: (err as Error).message });
  }
}
</script>

<template>
  <div>
    <button v-if="state === 'idle'" @click="handleFetch">Fetch</button>
    <p v-if="state === 'loading'">Loading...</p>
    <p v-if="state === 'success'">{{ context.data }}</p>
    <p v-if="state === 'error'">{{ context.error }}</p>
  </div>
</template>
```

## Svelte

MiniFSM works with Svelte stores.

### Writable Store

```svelte
<script lang="ts">
  import { writable, derived } from 'svelte/store';
  import { createMachine, doTransition, type MachineState } from '@minifsm/core';

  const machine = writable<MachineState<FetchState, FetchContext>>(
    createMachine({ currentState: 'idle', context: { data: null, error: null } })
  );

  const state = derived(machine, $m => $m.currentState);
  const context = derived(machine, $m => $m.context);

  function send(input: Input) {
    machine.update(current => doTransition(fetchDefinition, current, input));
  }
</script>

<button on:click={() => send({ type: 'FETCH' })}>
  Fetch
</button>

{#if $state === 'loading'}
  <p>Loading...</p>
{:else if $state === 'success'}
  <p>{$context.data}</p>
{/if}
```

## Server-Side Rendering (SSR)

MiniFSM's serialization makes it easy to hydrate state machines on the client from server-rendered data.

### Next.js (App Router)

```tsx
// app/checkout/page.tsx
import { cookies } from 'next/headers';
import { deserializeMachine, createMachine, type MachineState } from '@minifsm/core';
import CheckoutClient from './CheckoutClient';

// Server Component: Load initial state
async function getInitialMachine(): Promise<MachineState<CheckoutState, CheckoutContext>> {
  const cookieStore = await cookies();
  const saved = cookieStore.get('checkout-state');

  if (saved) {
    try {
      return deserializeMachine({
        serialized: JSON.parse(saved.value),
        definition: checkoutDefinition
      });
    } catch {
      // Invalid state, start fresh
    }
  }

  return createMachine({
    currentState: 'cart',
    context: { items: [], total: 0 }
  });
}

export default async function CheckoutPage() {
  const initialMachine = await getInitialMachine();

  return <CheckoutClient initialMachine={initialMachine} />;
}
```

```tsx
// app/checkout/CheckoutClient.tsx
'use client';

import { useState, useCallback } from 'react';
import { doTransition, serializeMachine, type MachineState } from '@minifsm/core';

interface Props {
  initialMachine: MachineState<CheckoutState, CheckoutContext>;
}

export default function CheckoutClient({ initialMachine }: Props) {
  const [machine, setMachine] = useState(initialMachine);

  const send = useCallback((input: CheckoutInput) => {
    setMachine(current => {
      const next = doTransition(checkoutDefinition, current, input);
      // Persist to cookie for SSR recovery
      document.cookie = `checkout-state=${JSON.stringify(serializeMachine(next))}`;
      return next;
    });
  }, []);

  return (
    <div>
      <p>Step: {machine.currentState}</p>
      {/* ... */}
    </div>
  );
}
```

### Next.js (Pages Router)

```tsx
// pages/checkout.tsx
import { GetServerSideProps } from 'next';
import { deserializeMachine, createMachine, serializeMachine, type MachineState } from '@minifsm/core';

interface Props {
  initialMachine: ReturnType<typeof serializeMachine>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const saved = context.req.cookies['checkout-state'];

  let machine: MachineState<CheckoutState, CheckoutContext>;

  if (saved) {
    try {
      machine = deserializeMachine({
        serialized: JSON.parse(saved),
        definition: checkoutDefinition
      });
    } catch {
      machine = createMachine({
        currentState: 'cart',
        context: { items: [], total: 0 }
      });
    }
  } else {
    machine = createMachine({
      currentState: 'cart',
      context: { items: [], total: 0 }
    });
  }

  return {
    props: {
      initialMachine: serializeMachine(machine)
    }
  };
};

export default function CheckoutPage({ initialMachine }: Props) {
  const [machine, setMachine] = useState(() =>
    deserializeMachine({ serialized: initialMachine, definition: checkoutDefinition })
  );

  // ... component logic
}
```

### Nuxt.js

```vue
<!-- pages/checkout.vue -->
<script setup lang="ts">
import { deserializeMachine, createMachine, serializeMachine, doTransition, type MachineState } from '@minifsm/core';

// Server-side: Load initial state
const initialState = await useAsyncData('checkout-state', async () => {
  const cookie = useCookie('checkout-state');

  if (cookie.value) {
    try {
      return deserializeMachine({
        serialized: JSON.parse(cookie.value as string),
        definition: checkoutDefinition
      });
    } catch {
      // Invalid state
    }
  }

  return createMachine({
    currentState: 'cart' as CheckoutState,
    context: { items: [], total: 0 }
  });
});

// Client-side reactive state
const machine = ref<MachineState<CheckoutState, CheckoutContext>>(initialState.data.value!);

function send(input: CheckoutInput) {
  machine.value = doTransition(checkoutDefinition, machine.value, input);

  // Persist for next SSR
  const cookie = useCookie('checkout-state');
  cookie.value = JSON.stringify(serializeMachine(machine.value));
}
</script>

<template>
  <div>
    <p>Step: {{ machine.currentState }}</p>
    <button @click="send({ type: 'NEXT' })">Next</button>
  </div>
</template>
```

::: tip SSR Best Practices
1. **Serialize on the server** — Pass serialized state as props, not the full machine
2. **Hydrate on the client** — Deserialize in the client component or initial state
3. **Validate on restore** — Always wrap `deserializeMachine` in try-catch for SSR data
4. **Persist state changes** — Sync client-side changes to cookies or API for session recovery
:::

## Node.js / Server-Side

MiniFSM works the same on the server:

```ts
import { createMachine, doTransition, serializeMachine } from '@minifsm/core';

class OrderService {
  private machines = new Map<string, MachineState<OrderState, OrderContext>>();

  createOrder(orderId: string): void {
    this.machines.set(orderId, createMachine({
      currentState: 'pending',
      context: { orderId, items: [], total: 0 }
    }));
  }

  processEvent(orderId: string, input: OrderInput): void {
    const machine = this.machines.get(orderId);
    if (machine) {
      this.machines.set(orderId, doTransition(orderDefinition, machine, input));
    }
  }

  getOrderState(orderId: string) {
    const machine = this.machines.get(orderId);
    return machine ? serializeMachine(machine) : null;
  }
}
```

## Best Practices

1. **Keep definitions outside components** — Define your machine definition at module level to avoid recreation on each render.

2. **Memoize the send function** — Use `useCallback` or similar to prevent unnecessary re-renders.

3. **Type your inputs strictly** — Use discriminated unions with `BaseInput<Type>` for type-safe input handling.

4. **Persist on state changes** — Use effects to sync state to localStorage or API when needed.

```tsx
useEffect(() => {
  localStorage.setItem('machine', JSON.stringify(serializeMachine(machine)));
}, [machine]);
```

## Next Steps

- Learn about [Serialization](/serialization) for persistence
- Explore [Examples](/examples) for complete implementations
- Read the [API Reference](/typedoc/) for detailed documentation
