# Serialization and Persistence

[[TOC]]

MiniFSM provides built-in support for serializing and deserializing state machines. This enables persistence to databases, localStorage, or transmission over networks.

## Why Serialize State Machines?

Serialization is essential when you need to:

- **Persist state** — Save machine state to localStorage, IndexedDB, or a database
- **Server-side rendering** — Hydrate state machines on the client from server data
- **API communication** — Send machine state between microservices
- **Debugging** — Log machine states for troubleshooting
- **Session recovery** — Restore user sessions after page refresh

## Serialization API

### `serializeMachine(machine)`

Converts a `MachineState` to a JSON-serializable `SerializedMachine`:

```ts
import { createMachine, serializeMachine } from '@minifsm/core';

type State = 'idle' | 'loading' | 'success';

interface Context {
  data: string | null;
  timestamp: number;
}

const machine = createMachine({
  currentState: 'success' as State,
  context: { data: 'Hello', timestamp: Date.now() }
});

const serialized = serializeMachine(machine);
// { currentState: 'success', context: { data: 'Hello', timestamp: 1699999999999 } }

const json = JSON.stringify(serialized);
// '{"currentState":"success","context":{"data":"Hello","timestamp":1699999999999}}'
```

### `deserializeMachine({ serialized, definition })`

Restores a `MachineState` from serialized data, validating against the machine definition:

```ts
import { deserializeMachine, type MachineDef, type BaseInput } from '@minifsm/core';

// Your machine definition
const definition: MachineDef<State, Context, MyInput> = {
  idle: ({ context, input }) => { /* ... */ },
  loading: ({ context, input }) => { /* ... */ },
  success: ({ context, input }) => { /* ... */ }
};

// Deserialize
const json = localStorage.getItem('machine-state');
const serialized = JSON.parse(json);

const machine = deserializeMachine({
  serialized,
  definition
});

console.log(machine.currentState); // 'success'
console.log(machine.context.data); // 'Hello'
```

## Error Handling

The `deserializeMachine` function validates that the serialized state exists in the definition. If the state is invalid, it throws an error:

```ts
try {
  const machine = deserializeMachine({
    serialized: { currentState: 'unknown_state', context: {} },
    definition
  });
} catch (error) {
  // Error: "MINIFSM_DESERIALIZE_ERROR: Unable to find corresponding state!"
  console.error('Failed to restore machine state');
}
```

::: warning
Always wrap `deserializeMachine` in a try-catch when loading from external sources (localStorage, APIs, databases) as the data may be corrupted or from an older version of your app.
:::

## Practical Examples

### LocalStorage Persistence

```ts
import { createMachine, doTransition, serializeMachine, deserializeMachine } from '@minifsm/core';

const STORAGE_KEY = 'app-machine-state';

// Save state after each transition
function saveState(machine: MachineState<State, Context>) {
  const serialized = serializeMachine(machine);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
}

// Load state on app startup
function loadState(): MachineState<State, Context> {
  const json = localStorage.getItem(STORAGE_KEY);

  if (json) {
    try {
      const serialized = JSON.parse(json);
      return deserializeMachine({ serialized, definition });
    } catch {
      console.warn('Failed to restore state, using initial state');
    }
  }

  return createMachine({
    currentState: 'idle',
    context: { data: null, timestamp: 0 }
  });
}

// Usage
let machine = loadState();

machine = doTransition(definition, machine, { type: 'FETCH' });
saveState(machine);
```

### API Communication

```ts
// Server-side: Send state to client
app.get('/api/machine-state', (req, res) => {
  const machine = getUserMachine(req.user.id);
  res.json(serializeMachine(machine));
});

// Client-side: Receive and restore state
async function fetchMachineState(): Promise<MachineState<State, Context>> {
  const response = await fetch('/api/machine-state');
  const serialized = await response.json();
  return deserializeMachine({ serialized, definition });
}
```

### Session Recovery with Fallback

```ts
import { createMachine, deserializeMachine, type MachineState } from '@minifsm/core';

function initializeMachine(): MachineState<State, Context> {
  // Try to recover from session storage
  const saved = sessionStorage.getItem('wizard-state');

  if (saved) {
    try {
      return deserializeMachine({
        serialized: JSON.parse(saved),
        definition
      });
    } catch (error) {
      // State format changed or corrupted - start fresh
      sessionStorage.removeItem('wizard-state');
    }
  }

  // Default initial state
  return createMachine({
    currentState: 'step1',
    context: { formData: {}, completedSteps: [] }
  });
}
```

## Type Safety

The `SerializedMachine` type preserves your context type for type-safe serialization:

```ts
import { SerializedMachine } from '@minifsm/core';

interface MyContext {
  userId: string;
  items: string[];
}

// Typed serialized machine
const serialized: SerializedMachine<MyContext> = {
  currentState: 'active',
  context: {
    userId: '123',
    items: ['a', 'b']
  }
};
```

## Best Practices

1. **Version your state** — Include a version number in your context for migration handling
2. **Handle errors** — Always catch deserialization errors from external sources
3. **Validate context** — Consider validating context data after deserialization (e.g., with Zod)
4. **Clean up old states** — Remove persisted state when user logs out or data expires
5. **Test serialization** — Include tests for your serialization/deserialization flow

```ts
// Example: Versioned context for migrations
interface VersionedContext {
  version: number;
  data: string | null;
}

function migrateContext(context: Partial<VersionedContext>): VersionedContext {
  // Handle missing version (old format)
  if (!context.version) {
    return { version: 1, data: null };
  }
  // Future migrations can be added here
  return context as VersionedContext;
}
```

## Next Steps

- Learn about [state transitions](/quick-start#performing-transitions) in the Quick Start guide
- Explore the [API Reference](/typedoc/) for detailed function signatures
