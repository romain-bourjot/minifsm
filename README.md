<p align="center">
  <br />

  <picture>
    <img alt="MiniFSM logotype" src="./vitepress/public/miniFSM.webp" width="200" />
  </picture>
    <br/>
    <strong>MiniFSM: The Simple, Flexible TypeScript Library for Efficient Finite State Machine Implementation.</strong>
  <br />
  <br />
</p>

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/romain-bourjot/minifsm/ci.yml?branch=main)](https://github.com/romain-bourjot/minifsm/actions/workflows/ci.yml)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/romain-bourjot/minifsm)](https://codeclimate.com/github/romain-bourjot/minifsm)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![Documentation](https://img.shields.io/website?url=https%3A%2F%2Fromain-bourjot.github.io%2Fminifsm%2F&label=documentation)](https://romain-bourjot.github.io/minifsm/)
[![NPM Version](https://img.shields.io/npm/v/%40minifsm%2Fcore)](https://www.npmjs.com/package/@minifsm/core)


> **MiniFSM** is a lightweight, flexible TypeScript library for implementing Finite State Machines (FSM) in both
> frontend
> and backend applications. Designed with simplicity in mind, it offers an intuitive way of managing state transitions
> in
> a highly descriptive manner.

---

## Features

- ✨ **Simple API**: With just a few types and one core function, MiniFSM keeps things simple yet powerful.
- 🛠 **Backend and Frontend Compatibility**️: Versatile enough to be used across different development contexts.
- 🔒 **Immutability-Friendly**: Designed to work well in immutable data environments, though not strictly enforced.

## Usage

### Define FSM

You can define a Finite State Machine using MiniFSM by creating a definition object that describes the states,
transitions, and actions.

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

### Perform Transition

To perform a transition in the FSM, use the **doTransition** function.

```ts
import {doTransition, createMachie} from '@minifsm/core';

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

## Serialize/Deserialize

You can serialize and deserialize the FSM for storage or communication purposes.

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

## API Reference

For detailed API reference and examples, see the [API Documentation](http://example.com).

## License

MiniFSM is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
