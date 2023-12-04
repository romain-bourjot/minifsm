<p align="center">
  <br />

  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./minifsm.png" />
    <img alt="MiniFSM logotype" src="./minifsm.png" width="200" />
  </picture>
    <br/>
    <strong>MiniFSM: The Simple, Flexible TypeScript Library for Efficient Finite State Machine Implementation.</strong>
  <br />
  <br />
</p>

**MiniFSM** is a lightweight, flexible TypeScript library for implementing Finite State Machines (FSM) in both frontend and backend applications. Designed with simplicity in mind, it offers an intuitive way of managing state transitions in a highly descriptive manner.

---

## Features
- **Simple API**: With just a few types and one core function, MiniFSM keeps things simple yet powerful.
- **Backend and Frontend Compatibility**: Versatile enough to be used across different development contexts.
- **Immutability-Friendly**: Designed to work well in immutable data environments, though not strictly enforced.
- **Visualization Support**: Easily visualize FSMs defined in MiniFSM for debugging and presentation.

## Installation

Install MiniFSM using npm:

```bash
npm install minifsm
```

Or using yarn:

```bash
yarn add minifsm
```

## Usage

Here's a basic example of how to use MiniFSM:

```typescript
import {type FSMMachine, type FSMDefinition, doTransition, createNullTransition} from '@minifsm/core'

const STATES = {
  GREEN: Symbol('green'),
  YELLOW: Symbol('yellow'),
  RED: Symbol('red'),
  DISABLED: Symbol('disabled')
} as const

type TrafficLightState = typeof STATES[keyof typeof STATES]

interface TrafficLightContext {
  turnOff: () => void,
  lightRed: () => void,
  lightYellow: () => void,
  lightGreen: () => void,
}

type TrafficLightInput = { type: 'tick' }

function isTickCondition({ input }: { input: TrafficLightInput}): boolean {
  return input.type === 'tick'
}

const trafficLightFSMDefinition: FSMDefinition<TrafficLightState, TrafficLightContext, TrafficLightInput> = {
  [STATES.RED]: {
    transitions: [
      {
        nextState: STATES.GREEN,
        condition: isTickCondition,
        action: ({ context }: {
          context: TrafficLightContext
          input: TrafficLightInput
        }): TrafficLightContext => {
          context.turnOff()
          context.lightGreen()

          return context
        }
      },
    ],
    defaultTransition: createNullTransition(STATES.RED),
  },
  [STATES.YELLOW]: {
    transitions: [
      {
        nextState: STATES.RED,
        condition: isTickCondition,
        action: ({ context }: {
          context: TrafficLightContext
          input: TrafficLightInput
        }): TrafficLightContext => {
          context.turnOff()
          context.lightRed()

          return context
        }
      },
    ],
    defaultTransition: createNullTransition(STATES.YELLOW),
  },
  [STATES.GREEN]: {
    transitions: [
      {
        nextState: STATES.YELLOW,
        condition: isTickCondition,
        action: ({ context }: {
          context: TrafficLightContext
          input: TrafficLightInput
        }): TrafficLightContext => {
          context.turnOff()
          context.lightYellow()

          return context
        }
      },
    ],
    defaultTransition: createNullTransition(STATES.GREEN),
  },
}

let machine: FSMMachine<TrafficLightState, TrafficLightContext> = {
  currentState: STATES.RED,
  context: {
    turnOff: () => { console.clear() },
    lightRed: () => { console.log('red') },
    lightYellow: () => { console.log('yellow') },
    lightGreen: () => { console.log('green') },
  }
}

setInterval(() => {
  machine = doTransition({ definition: trafficLightFSMDefinition, machine, input: { type: 'tick' }})
}, 1000)
```
