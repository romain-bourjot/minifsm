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

### Database Persistence (PostgreSQL)

```ts
import { serializeMachine, deserializeMachine, createMachine, type MachineState } from '@minifsm/core';
import { Pool } from 'pg';

const pool = new Pool();

// Save machine state to database
async function saveMachineState(
  userId: string,
  machine: MachineState<State, Context>
): Promise<void> {
  const serialized = serializeMachine(machine);
  await pool.query(
    `INSERT INTO machine_states (user_id, state_data, updated_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT (user_id) DO UPDATE SET state_data = $2, updated_at = NOW()`,
    [userId, JSON.stringify(serialized)]
  );
}

// Load machine state from database
async function loadMachineState(userId: string): Promise<MachineState<State, Context>> {
  const result = await pool.query(
    'SELECT state_data FROM machine_states WHERE user_id = $1',
    [userId]
  );

  if (result.rows.length > 0) {
    try {
      return deserializeMachine({
        serialized: JSON.parse(result.rows[0].state_data),
        definition
      });
    } catch {
      console.warn(`Invalid state for user ${userId}, using default`);
    }
  }

  return createMachine({
    currentState: 'idle',
    context: { data: null, timestamp: 0 }
  });
}
```

### Database Persistence (MongoDB)

```ts
import { serializeMachine, deserializeMachine, createMachine, type MachineState } from '@minifsm/core';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI ?? '');
const db = client.db('app');
const machineStates = db.collection('machine_states');

// Save machine state
async function saveMachineState(
  userId: string,
  machine: MachineState<State, Context>
): Promise<void> {
  const serialized = serializeMachine(machine);
  await machineStates.updateOne(
    { userId },
    { $set: { ...serialized, updatedAt: new Date() } },
    { upsert: true }
  );
}

// Load machine state
async function loadMachineState(userId: string): Promise<MachineState<State, Context>> {
  const doc = await machineStates.findOne({ userId });

  if (doc) {
    try {
      return deserializeMachine({
        serialized: { currentState: doc.currentState, context: doc.context },
        definition
      });
    } catch {
      console.warn(`Invalid state for user ${userId}, using default`);
    }
  }

  return createMachine({
    currentState: 'idle',
    context: { data: null, timestamp: 0 }
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

### Versioned Context for Migrations

```ts
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

### Runtime Validation with Zod

For type-safe runtime validation of serialized data, use [Zod](https://zod.dev/):

```ts
import { z } from 'zod';
import { deserializeMachine, createMachine, type MachineState } from '@minifsm/core';

// Define your context schema
const contextSchema = z.object({
  userId: z.string(),
  items: z.array(z.string()),
  preferences: z.object({
    theme: z.enum(['light', 'dark']),
    notifications: z.boolean()
  })
});

type Context = z.infer<typeof contextSchema>;

// Define valid states
const stateSchema = z.enum(['idle', 'loading', 'success', 'error']);

type State = z.infer<typeof stateSchema>;

// Serialized machine schema
const serializedMachineSchema = z.object({
  currentState: stateSchema,
  context: contextSchema
});

// Safe deserialization with validation
function safeDeserialize(json: string): MachineState<State, Context> {
  try {
    const parsed = JSON.parse(json);
    const validated = serializedMachineSchema.parse(parsed);

    return deserializeMachine({
      serialized: validated,
      definition
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation failed:', error.errors);
    }

    // Return default state on validation failure
    return createMachine({
      currentState: 'idle',
      context: {
        userId: '',
        items: [],
        preferences: { theme: 'light', notifications: true }
      }
    });
  }
}
```

::: tip
Zod validation catches issues that TypeScript's compile-time checks cannot, such as malformed data from APIs, corrupted localStorage, or tampering. Use it at system boundaries.
:::

## Next Steps

- Learn about [state transitions](/quick-start#performing-transitions) in the Quick Start guide
- Explore the [API Reference](/typedoc/) for detailed function signatures
