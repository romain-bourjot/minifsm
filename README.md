<p align="center">
  <br />

  <picture>
    <img alt="MiniFSM logotype" src="./vitepress/public/miniFSM.webp" width="200" />
  </picture>
    <br/>
    <strong>A lightweight, type-safe finite state machine library for TypeScript</strong>
  <br />
  <br />
</p>

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/romain-bourjot/minifsm/ci.yml?branch=main)](https://github.com/romain-bourjot/minifsm/actions/workflows/ci.yml)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/romain-bourjot/minifsm)](https://codeclimate.com/github/romain-bourjot/minifsm)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![Documentation](https://img.shields.io/website?url=https%3A%2F%2Fromain-bourjot.github.io%2Fminifsm%2F&label=documentation)](https://romain-bourjot.github.io/minifsm/)
[![NPM Version](https://img.shields.io/npm/v/%40minifsm%2Fcore)](https://www.npmjs.com/package/@minifsm/core)

> **MiniFSM** is a lightweight, TypeScript-first library for building finite state machines (FSMs). It works in Node.js, browsers, Deno, Bun, and any JavaScript runtime. Define states as simple handler functions and let TypeScript ensure type safety across all your state transitions.

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

## Serialization

Serialize machines for storage (localStorage, databases) or transmission (APIs, WebSockets):

```ts
import { serializeMachine, deserializeMachine } from '@minifsm/core';

// Serialize to JSON-compatible object
const serialized = serializeMachine(machine);
const json = JSON.stringify(serialized);

// Deserialize back to a machine
const parsed = JSON.parse(json);
const restored = deserializeMachine({
  serialized: parsed,
  definition
});
```

## API Reference

### Types

| Type | Description |
|------|-------------|
| `MachineDef<States, Context, Inputs>` | Maps each state to its handler function |
| `MachineState<State, Context>` | Represents a machine instance with current state and context |
| `StateHandler<States, Context, Inputs>` | Function that processes inputs and returns new state |
| `BaseInput<Type>` | Base interface for inputs with a `type` discriminator |
| `SerializedMachine<Context>` | JSON-serializable representation of a machine |
| `ContextConstraint` | Base type constraint for context objects |

### Functions

| Function | Description |
|----------|-------------|
| `doTransition(definition, machine, input)` | Executes a state transition and returns the new machine state |
| `createMachine({ currentState, context })` | Creates a new machine instance |
| `serializeMachine(machine)` | Converts a machine to a serializable format |
| `deserializeMachine({ serialized, definition })` | Restores a machine from serialized data |

## Documentation

For detailed guides, advanced patterns, and API reference, visit the [full documentation](https://romain-bourjot.github.io/minifsm/).

## License

MiniFSM is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
