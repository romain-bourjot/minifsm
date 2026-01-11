# Quick Start: Traffic Light Example

[[TOC]]

::: info
In this tutorial, we'll build a traffic light state machine. Our traffic light cycles through red → green → yellow → red.
:::

## Installation

```bash
npm install @minifsm/core
```

Or with other package managers:

```bash
yarn add @minifsm/core
pnpm add @minifsm/core
```

## State Definition

A traffic light can only be in one of a finite number of states at any time: **OFF**, **RED**, **YELLOW**, or **GREEN**.

```ts
type TrafficLightState = 'OFF' | 'RED' | 'YELLOW' | 'GREEN';
```

::: tip
You can also use an enum if you prefer, but string literal unions work well with TypeScript's type inference.
:::

## Context

The **context** holds data that persists across state transitions. For our traffic light, we'll track:

- **since**: Timestamp when the current state started
- **durations**: How long each light should stay on

```ts
interface TrafficLightContext {
  since: number;
  durations: {
    red: number;
    yellow: number;
    green: number;
  };
}
```

## Inputs

Inputs are events that trigger state transitions. Our traffic light responds to:

- **TURN_ON**: Activates the traffic light
- **TURN_OFF**: Deactivates the traffic light
- **TICK**: A timer event with the current timestamp

```ts
import { BaseInput } from '@minifsm/core';

// Each input extends BaseInput with a specific type discriminator
interface TurnOnInput extends BaseInput<'TURN_ON'> {}
interface TurnOffInput extends BaseInput<'TURN_OFF'> {}
interface TickInput extends BaseInput<'TICK'> { timestamp: number }

type TrafficLightInput = TurnOnInput | TurnOffInput | TickInput;
```

::: tip
Extending `BaseInput<Type>` ensures your inputs have a `type` discriminator field. This enables type-safe discrimination in your handlers.
:::

## Machine Definition

The machine definition maps each state to a handler function. Each handler receives the current context and input, then returns the new state (or `undefined` to stay in the current state).

```ts
import { MachineDef } from '@minifsm/core';

const trafficLightDef: MachineDef<TrafficLightState, TrafficLightContext, TrafficLightInput> = {
  OFF: ({ context, input }) => {
    if (input.type === 'TURN_ON') {
      return {
        currentState: 'RED',
        context: { ...context, since: Date.now() }
      };
    }
    return undefined;
  },

  RED: ({ context, input }) => {
    if (input.type === 'TURN_OFF') {
      return { currentState: 'OFF', context };
    }
    if (input.type === 'TICK' && input.timestamp - context.since >= context.durations.red) {
      return {
        currentState: 'GREEN',
        context: { ...context, since: input.timestamp }
      };
    }
    return undefined;
  },

  GREEN: ({ context, input }) => {
    if (input.type === 'TURN_OFF') {
      return { currentState: 'OFF', context };
    }
    if (input.type === 'TICK' && input.timestamp - context.since >= context.durations.green) {
      return {
        currentState: 'YELLOW',
        context: { ...context, since: input.timestamp }
      };
    }
    return undefined;
  },

  YELLOW: ({ context, input }) => {
    if (input.type === 'TURN_OFF') {
      return { currentState: 'OFF', context };
    }
    if (input.type === 'TICK' && input.timestamp - context.since >= context.durations.yellow) {
      return {
        currentState: 'RED',
        context: { ...context, since: input.timestamp }
      };
    }
    return undefined;
  }
};
```

## Creating a Machine Instance

Use `createMachine` to create an instance with an initial state and context:

```ts
import { createMachine } from '@minifsm/core';

const machine = createMachine({
  currentState: 'OFF' as TrafficLightState,
  context: {
    since: 0,
    durations: {
      red: 5000,    // 5 seconds
      yellow: 2000, // 2 seconds
      green: 3000   // 3 seconds
    }
  }
});
```

## Performing Transitions

Use `doTransition` to process an input and get the new machine state:

```ts
import { doTransition } from '@minifsm/core';

// Turn on the traffic light
let currentMachine = doTransition(trafficLightDef, machine, { type: 'TURN_ON' });
console.log(currentMachine.currentState); // 'RED'

// Simulate time passing
currentMachine = doTransition(trafficLightDef, currentMachine, {
  type: 'TICK',
  timestamp: Date.now() + 6000 // 6 seconds later
});
console.log(currentMachine.currentState); // 'GREEN'
```

## Running the Traffic Light

Here's a complete example that runs the traffic light in a loop:

```ts
import { MachineDef, MachineState, BaseInput, createMachine, doTransition } from '@minifsm/core';

type TrafficLightState = 'OFF' | 'RED' | 'YELLOW' | 'GREEN';

interface TrafficLightContext {
  since: number;
  durations: { red: number; yellow: number; green: number };
}

interface TurnOnInput extends BaseInput<'TURN_ON'> {}
interface TurnOffInput extends BaseInput<'TURN_OFF'> {}
interface TickInput extends BaseInput<'TICK'> { timestamp: number }

type TrafficLightInput = TurnOnInput | TurnOffInput | TickInput;

const trafficLightDef: MachineDef<TrafficLightState, TrafficLightContext, TrafficLightInput> = {
  OFF: ({ context, input }) => {
    if (input.type === 'TURN_ON') {
      return { currentState: 'RED', context: { ...context, since: Date.now() } };
    }
    return undefined;
  },
  RED: ({ context, input }) => {
    if (input.type === 'TURN_OFF') return { currentState: 'OFF', context };
    if (input.type === 'TICK' && input.timestamp - context.since >= context.durations.red) {
      return { currentState: 'GREEN', context: { ...context, since: input.timestamp } };
    }
    return undefined;
  },
  GREEN: ({ context, input }) => {
    if (input.type === 'TURN_OFF') return { currentState: 'OFF', context };
    if (input.type === 'TICK' && input.timestamp - context.since >= context.durations.green) {
      return { currentState: 'YELLOW', context: { ...context, since: input.timestamp } };
    }
    return undefined;
  },
  YELLOW: ({ context, input }) => {
    if (input.type === 'TURN_OFF') return { currentState: 'OFF', context };
    if (input.type === 'TICK' && input.timestamp - context.since >= context.durations.yellow) {
      return { currentState: 'RED', context: { ...context, since: input.timestamp } };
    }
    return undefined;
  }
};

// Create and start the traffic light
let machine: MachineState<TrafficLightState, TrafficLightContext> = createMachine({
  currentState: 'OFF',
  context: {
    since: 0,
    durations: { red: 3000, yellow: 1000, green: 2000 }
  }
});

// Turn it on
machine = doTransition(trafficLightDef, machine, { type: 'TURN_ON' });
console.log(`Traffic light is now: ${machine.currentState}`);

// Run the traffic light with a timer
const interval = setInterval(() => {
  const previousState = machine.currentState;
  machine = doTransition(trafficLightDef, machine, { type: 'TICK', timestamp: Date.now() });

  if (machine.currentState !== previousState) {
    console.log(`Traffic light changed to: ${machine.currentState}`);
  }
}, 100);

// Stop after 15 seconds
setTimeout(() => {
  clearInterval(interval);
  machine = doTransition(trafficLightDef, machine, { type: 'TURN_OFF' });
  console.log('Traffic light turned off');
}, 15000);
```

::: info Example Variations
The [traffic-light.ts](https://github.com/romain-bourjot/minifsm/blob/main/examples/traffic-light.ts) example in the repository uses a simplified version that only cycles between colors. This tutorial demonstrates a more complete traffic light with `OFF` state, `TURN_ON`/`TURN_OFF` controls, and timing-based transitions to showcase additional FSM patterns.
:::

## Next Steps

- Explore more [Examples](/examples) including vending machines, word counters, and user lifecycles
- Learn about [Serialization](/serialization) for persisting state to localStorage or databases
- See [Framework Integrations](/integrations) for React, Redux, Vue, and Svelte usage
- Read the [API Reference](/typedoc/) for detailed function and type documentation
- Check out the [GitHub repository](https://github.com/romain-bourjot/minifsm) for source code and issues
