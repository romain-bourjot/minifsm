<p align="center">
  <br />

  <picture>
    <img alt="MiniFSM - Lightweight TypeScript Finite State Machine Library" src="./vitepress/public/miniFSM.webp" width="200" />
  </picture>
    <br/>
    <strong>A lightweight, type-safe finite state machine library for TypeScript and JavaScript</strong>
  <br />
  <br />
</p>

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/romain-bourjot/minifsm/ci.yml?branch=main)](https://github.com/romain-bourjot/minifsm/actions/workflows/ci.yml)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/romain-bourjot/minifsm)](https://codeclimate.com/github/romain-bourjot/minifsm)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![Documentation](https://img.shields.io/website?url=https%3A%2F%2Fromain-bourjot.github.io%2Fminifsm%2F&label=documentation)](https://romain-bourjot.github.io/minifsm/)
[![NPM Version](https://img.shields.io/npm/v/%40minifsm%2Fcore)](https://www.npmjs.com/package/@minifsm/core)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@minifsm/core)](https://bundlephobia.com/package/@minifsm/core)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

> **MiniFSM** is a lightweight, TypeScript-first finite state machine (FSM) library with zero dependencies. Build predictable state machines for Node.js, browsers, Deno, Bun, and any JavaScript runtime. Define states as simple handler functions with full type safety for states, context, and transitions.

---

## Why MiniFSM?

Looking for an **XState alternative** that's simpler and lighter? MiniFSM is designed for developers who want the power of finite state machines without the complexity:

| Feature | MiniFSM | XState |
|---------|---------|--------|
| **Bundle Size** | ~1KB (zero deps) | ~40KB+ |
| **Learning Curve** | Minutes | Hours/Days |
| **API Surface** | 1 core function | 50+ concepts |
| **TypeScript** | First-class | Retrofit |
| **Configuration** | Plain functions | Complex objects |

MiniFSM gives you **type-safe state machines** with a minimal API. No configuration DSLs, no learning curve, no runtime overhead.

---

## Features

- **Minimal API** — One core function (`doTransition`) and a few types. No complex configuration.
- **Type-Safe** — Full TypeScript support with strong typing for states, context, and inputs.
- **Immutable by Design** — Transitions return new state objects, making it easy to integrate with React, Redux, or any immutable architecture.
- **Zero Dependencies** — Lightweight footprint with no external dependencies.
- **Universal** — Works in Node.js, browsers, Deno, Bun, and edge runtimes.
- **Serializable** — Built-in support for serializing and deserializing machine state.

## Use Cases

MiniFSM is ideal for managing complex state in:

- **Form Validation** — Track form states (pristine, dirty, valid, invalid, submitting)
- **Authentication Flows** — Handle login states (logged out, authenticating, authenticated, error)
- **UI Components** — Manage modal, dropdown, and wizard states
- **Async Operations** — Model data fetching (idle, loading, success, error)
- **Game State** — Control game phases, player turns, and animations
- **Workflow Orchestration** — Build multi-step processes with clear state transitions

## Installation

```bash
npm install @minifsm/core
```

Or with other package managers:

```bash
yarn add @minifsm/core
pnpm add @minifsm/core
```

## Quick Start

### 1. Define Your States, Context, and Inputs

```ts
import { MachineDef, BaseInput, createMachine, doTransition } from '@minifsm/core';

// Define your states
type State = 'idle' | 'loading' | 'success' | 'error';

// Define your context (data that persists across transitions)
interface Context {
  data: string | null;
  errorMessage: string | null;
}

// Define your inputs (events that trigger transitions)
// Each input extends BaseInput with a specific type discriminator
interface FetchInput extends BaseInput<'FETCH'> {}
interface SuccessInput extends BaseInput<'SUCCESS'> { data: string }
interface FailureInput extends BaseInput<'FAILURE'> { error: string }
interface ResetInput extends BaseInput<'RESET'> {}

type Input = FetchInput | SuccessInput | FailureInput | ResetInput;
```

### 2. Create State Handlers

Each state has a handler function that receives the current context and input, then returns the new state (or `undefined` to stay in the current state):

```ts
const definition: MachineDef<State, Context, Input> = {
  idle: ({ context, input }) => {
    if (input.type === 'FETCH') {
      return { currentState: 'loading', context };
    }
    return undefined;
  },

  loading: ({ context, input }) => {
    if (input.type === 'SUCCESS') {
      return {
        currentState: 'success',
        context: { ...context, data: input.data, errorMessage: null }
      };
    }
    if (input.type === 'FAILURE') {
      return {
        currentState: 'error',
        context: { ...context, data: null, errorMessage: input.error }
      };
    }
    return undefined;
  },

  success: ({ context, input }) => {
    if (input.type === 'RESET') {
      return { currentState: 'idle', context: { data: null, errorMessage: null } };
    }
    return undefined;
  },

  error: ({ context, input }) => {
    if (input.type === 'RESET') {
      return { currentState: 'idle', context: { data: null, errorMessage: null } };
    }
    return undefined;
  }
};
```

### 3. Create and Use the Machine

```ts
// Create the initial machine
const machine = createMachine({
  currentState: 'idle' as State,
  context: { data: null, errorMessage: null }
});

// Trigger transitions
const loadingMachine = doTransition(definition, machine, { type: 'FETCH' });
console.log(loadingMachine.currentState); // 'loading'

const successMachine = doTransition(definition, loadingMachine, {
  type: 'SUCCESS',
  data: 'Hello, World!'
});
console.log(successMachine.currentState); // 'success'
console.log(successMachine.context.data); // 'Hello, World!'
```

## Serialization and Persistence

MiniFSM provides built-in serialization for storing state machines in databases, localStorage, or transmitting over networks:

```ts
import { serializeMachine, deserializeMachine } from '@minifsm/core';

// Serialize to JSON-compatible object
const serialized = serializeMachine(machine);
const json = JSON.stringify(serialized);

// Store in localStorage
localStorage.setItem('machine-state', json);

// Later, deserialize back to a machine
const parsed = JSON.parse(localStorage.getItem('machine-state'));
const restored = deserializeMachine({
  serialized: parsed,
  definition
});
```

### Error Handling

The `deserializeMachine` function validates the serialized state against your definition:

```ts
try {
  const restored = deserializeMachine({
    serialized: { currentState: 'unknown', context: {} },
    definition
  });
} catch (error) {
  // Throws: "MINIFSM_DESERIALIZE_ERROR: Unable to find corresponding state!"
  console.error('Invalid state in serialized data');
}
```

## API Reference

### Core Types

| Type | Description |
|------|-------------|
| `MachineDef<States, Context, Inputs>` | The state machine definition that maps each state to its handler function |
| `MachineState<State, Context>` | Represents a machine instance with `currentState` and `context` properties |
| `StateHandler<States, Context, Inputs>` | Handler function that receives `{ context, input }` and returns new state or `undefined` |
| `BaseInput<Type>` | Base interface for inputs requiring a `type` discriminator field |
| `SerializedMachine<Context>` | JSON-serializable representation of a machine for persistence |
| `ContextConstraint` | Base type constraint ensuring context is `Record<string, unknown>` |

### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `doTransition` | `(definition, machine, input)` | `MachineState` | Executes a state transition based on the current state's handler |
| `createMachine` | `({ currentState, context })` | `MachineState` | Creates a new machine instance with initial state and context |
| `serializeMachine` | `(machine)` | `SerializedMachine` | Converts a machine to a JSON-serializable format |
| `deserializeMachine` | `({ serialized, definition })` | `MachineState` | Restores a machine from serialized data (throws if state invalid) |

## Examples

The repository includes several example implementations:

- **[Counter](./examples/counter.ts)** — Progress tracker with START, IN_PROGRESS, and COMPLETE states
- **[Traffic Light](./examples/traffic-light.ts)** — Cyclic state machine (RED → GREEN → YELLOW → RED)
- **[Vending Machine](./examples/vending-machine.ts)** — Multi-input handling (selection, payment, dispensing)
- **[Word Counter](./examples/word-counter.ts)** — Text tokenizer using FSM for parsing
- **[User Machine](./examples/user-machine.ts)** — User lifecycle (validation, deletion)

Run an example:

```bash
npm run example:counter
```

## Frequently Asked Questions

### How does MiniFSM compare to XState?

MiniFSM is designed as a lightweight alternative to XState. While XState offers advanced features like hierarchical states, parallel states, and a visual editor, MiniFSM focuses on simplicity:

- **~1KB** vs ~40KB+ bundle size
- **4 functions** vs 50+ concepts to learn
- **Plain TypeScript functions** vs configuration DSL
- **Zero dependencies** vs multiple dependencies

Choose MiniFSM for simpler state machines where you want minimal overhead and fast TypeScript development.

### Can I use MiniFSM with React?

Yes. Since MiniFSM returns new immutable state objects on transitions, it integrates naturally with React state:

```tsx
const [machine, setMachine] = useState(() => createMachine({ currentState: 'idle', context: {} }));

const handleAction = () => {
  setMachine(current => doTransition(definition, current, { type: 'ACTION' }));
};
```

### Can I use MiniFSM with Redux?

Yes. Store the machine state in your Redux store and dispatch actions that call `doTransition` in a reducer:

```ts
const machineReducer = (state = initialMachine, action) => {
  if (action.type === 'FSM_INPUT') {
    return doTransition(definition, state, action.payload);
  }
  return state;
};
```

### What happens if no transition matches?

If a state handler returns `undefined`, the machine stays in its current state with unchanged context. This is the expected behavior for inputs that don't trigger transitions in the current state.

### Is the context mutated during transitions?

No. MiniFSM is immutable by design. Handlers should return new context objects using spread syntax or other immutable update patterns. The original machine and context are never modified.

## TypeScript Support

MiniFSM is written in TypeScript and provides full type inference:

- State handlers receive correctly typed `context` and `input` parameters
- The `currentState` field is constrained to your defined state union
- Input discrimination works automatically with the `type` field
- Compile-time errors for missing state handlers or invalid transitions

```ts
// TypeScript catches errors at compile time
const definition: MachineDef<'a' | 'b', Context, Input> = {
  a: handler,
  // Error: Property 'b' is missing
};
```

## Browser and Runtime Support

MiniFSM works in any JavaScript environment:

- **Node.js** 14+
- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Deno**
- **Bun**
- **Edge runtimes** (Cloudflare Workers, Vercel Edge)

## Documentation

For detailed guides, API reference, and interactive examples, visit the [full documentation](https://romain-bourjot.github.io/minifsm/).

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests on [GitHub](https://github.com/romain-bourjot/minifsm).

## License

MiniFSM is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
