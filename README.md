<p align="center">
  <br />

  <picture>
    <img alt="MiniFSM logotype" src="./vitepress/public/miniFSM.webp" width="200" />
  </picture>
    <br/>
    <strong>A lightweight, type-safe TypeScript library for building finite state machines</strong>
  <br />
  <br />
</p>

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/romain-bourjot/minifsm/ci.yml?branch=main)](https://github.com/romain-bourjot/minifsm/actions/workflows/ci.yml)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/romain-bourjot/minifsm)](https://codeclimate.com/github/romain-bourjot/minifsm)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![Documentation](https://img.shields.io/website?url=https%3A%2F%2Fromain-bourjot.github.io%2Fminifsm%2F&label=documentation)](https://romain-bourjot.github.io/minifsm/)
[![NPM Version](https://img.shields.io/npm/v/%40minifsm%2Fcore)](https://www.npmjs.com/package/@minifsm/core)


> **MiniFSM** is a lightweight, flexible TypeScript library for implementing Finite State Machines (FSMs) in both frontend and backend applications. Designed with simplicity in mind, it provides an intuitive, type-safe way to manage state transitions with minimal boilerplate.

---

## Features

- ✨ **Simple API**: Just a few types and one core function—simple yet powerful
- 🛠 **Universal**: Works seamlessly in both frontend and backend environments
- 🔒 **Immutability-Friendly**: Designed for immutable data patterns (not strictly enforced)
- 📦 **Type-Safe**: Full TypeScript support with strong typing for states, context, and inputs
- 🚀 **Zero Dependencies**: Lightweight and minimal footprint

## Installation

```bash
npm install @minifsm/core
# or
yarn add @minifsm/core
# or
pnpm add @minifsm/core
```

## Usage

### Defining Your State Machine

Create a state machine by defining states, transitions, and actions:

```ts
import {FSMDefinition} from '@minifsm/core';

// Define FSM states
enum MyState {
  START = 'START',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE'
}

// Define FSM context and input types
type MyContext = { /* Your context structure */ };
type MyInput = { /* Your input structure */ };

// Define FSM transitions and actions
const fsmDefinition: FSMDefinition<MyState, MyContext, MyInput> = {
  [MyState.START]: {
    transitions: [
      {
        condition: ({context, input}) => {
          /* Your condition */
        },
        nextState: MyState.IN_PROGRESS,
        action: ({context, input}) => {
          /* Your action */
        }
      }
    ],
    defaultTransition: {
      nextState: MyState.START,
      action: ({context, input}) => {/* Your default action */
      }
    }
  },
  // Define transitions for other states...
};
```

### Executing Transitions

Trigger state transitions using the `doTransition` function:

```ts
import {doTransition, createMachine} from '@minifsm/core';

// Create your initial machine
const machine = createMachine({
  currentState: MyState.START,
  context: {/* Initial context */}
});

// Trigger a transition
const updatedMachine = doTransition({
  definition: fsmDefinition,
  input: {/* Input for the transition */},
  machine
});

```

## Serialization

Serialize and deserialize state machines for storage or transmission:

```ts
import {serializeMachine, deserializeMachine} from '@minifsm/core';

// Serialize FSM
const serialized = serializeMachine(updatedMachine);

// Deserialize FSM
const deserializedMachine = deserializeMachine({
  serialized,
  definition: fsmDefinition
});
```

## Documentation

For detailed API reference, advanced examples, and guides, visit the [full documentation](https://romain-bourjot.github.io/minifsm/).

## License

MiniFSM is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
