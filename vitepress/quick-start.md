# QuickStart (The Good Ol'Traffic Light)

[[TOC]]

::: info
Our traffic light goes red, yellow, green then comes back to red again.<br/>
This may differ from the rules applying in your country.
:::

## Installation

With NPM:

```sh
npm install @minifsm/core
```

With yarn:

```sh
yarn add @minifsm/core
```

## State Definition

At any point in time, our traffic light can only be in <ins>one</ins> of a <ins>finite number of states</ins>: **OFF**,
**RED**,
**YELLOW** and **GREEN**.
The first step in our code will be to define this.

```ts
const enum TrafficLightState {
  OFF = 'OFF',
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
}
```

::: tip
We could use **string constants** to define those states, however enums will work nicely with refactoring tools.
:::

## Context

The **Context** in MiniFSM is an object that is accessible from the machine. It can also be read from outside, as we
will see further.

Conceptually, it can contain 4 sorts of data:

* **Underlying Data**: Data that is <ins>updated</ins> through the lifecycle of the machine. In our case, it will be
  the
  timestamp at which the machine entered the current state.
* **Configuration**: Data that stays <ins>constant</ins> during the lifecycle of the machine. Here, it will be the
  duration of each
  state.
* **External API**: A set of methods that allows <ins>side effects</ins>. For instance, turning a light bulb on or off.
* **Output Data**: A special set of fields that allows the caller to get <ins>additional information on the
  machine</ins>. It can for example be used to provide more detailed errors on invalid transitions.

```ts
interface TrafficLightContext {
  // Underlying data:
  since: number,

  // Configuration:
  durations: {
    red: number,
    yellow: number,
    green: number,
  },

  // External API:
  setLighBulbs: (_: { red: boolean, blue: boolean, green: boolean }) => void,

  // Output data:
  output: { isError: false } | { isError: true, error: string }
}
```

A **Machine** is an <ins>instance</ins> of an object encapsulating a current <ins>state</ins> and a <ins>context</ins>.
It can be typed using **FSMMachine<FSMState, FSMContext>**.

Here is an example:

````ts
const trafficLightMachine: FSMMachine<TrafficLightState, TrafficLightContext> = {
  currentState: TrafficLightState.YELLOW,
  context: {
    since: 1707234685481,
    durations: {
      red: 5000,
      yellow: 2000,
      green: 3000,
    },
    setLighBulbs: (bulbs: { red: boolean, blue: boolean, green: boolean }) => {
      console.log(bulbs)
    },
    output: {isError: false}
  }
}
````

To make things easier in our application, we can create a factory function that will instantiate a machine in its
initial state using MiniFSM **createMachine** function.

```ts
function createTrafficLightMachine({durations, setLightBulbs}: {
  durations: { red: number, yellow: number, green: number },
  setLightBulbs: (_: { red: boolean, yellow: boolean, green: boolean }) => void,
}): FSMMachine<TrafficLightState, TrafficLightContext> {
  return createMachine({
    currentState: TrafficLightState.OFF,
    context: {
      since: 0,
      durations,
      setLighBulbs,
      output: {isError: false}
    }
  })
}
```

## Inputs

We want our state machine to react to <ins>inputs</ins>. The two simplest inputs in the current case
are **TURN_ON** and **TURN_OFF**.
On the former case, we expect the traffic light switch to the RED state. And the latest, to the OFF state.

Every x millisecond, the machine will receive a **TICK** input with the current timestamp.

Here is how it goes:

```ts
type TrafficLightInput =
  | { type: 'TURN_ON' | 'TURN_OFF' }
  | { type: 'TICK', timestamp: number }
```

::: tip
Notice the **type** field with **string constants**, it will help with type refinig.
:::

## State Definition

The final setup step is the <ins>State Definition</ins>. It is a object that describes which transitions are available
and what to do when they happen.
It can be typed with **FSMStateDefinition<FSMState, FSMContext, FSMInput>**.

```ts
import {FSMStateDefinition} from './index';

const TrafficLightStateDefinition: FSMStateDefinition<TrafficLightState, TrafficLightContext, TrafficLightIput> = {
  [TrafficLightState.OFF]: createNullStateDefinition(TrafficLightState.OFF),
  [TrafficLightState.RED]: createNullStateDefinition(TrafficLightState.RED),
  [TrafficLightState.YELLOW]: createNullStateDefinition(TrafficLightState.YELLOW),
  [TrafficLightState.GREEN]: createNullStateDefinition(TrafficLightState.GREEN),
}
```

### State Transition Logic

To define the behavior of our traffic light, we need to specify how it transitions between states based on inputs.

```ts
const trafficLightDefinition: FSMDefinition<TrafficLightState, TrafficLightContext, TrafficLightInput> = {
  [TrafficLightState.OFF]: {
    transitions: [
      {
        condition: ({context}) => context.output.isError,
        nextState: TrafficLightState.OFF,
        action: createNullAction<TrafficLightContext, TrafficLightInput>()
      },
      {
        condition: ({input}) => input.type === 'TURN_ON',
        nextState: TrafficLightState.RED,
        action: ({context}) => ({
          ...context,
          since: Date.now()
        })
      }
    ],
    defaultTransition: createNullTransition(TrafficLightState.OFF)
  },
  [TrafficLightState.RED]: {
    transitions: [
      {
        condition: ({input}) => input.type === 'TICK' && input.timestamp - context.since >= context.durations.red,
        nextState: TrafficLightState.GREEN,
        action: createNullAction<TrafficLightContext, TrafficLightInput>()
      }
    ],
    defaultTransition: createNullTransition(TrafficLightState.RED)
  },
  [TrafficLightState.YELLOW]: {
    transitions: [
      {
        condition: ({input}) => input.type === 'TICK' && input.timestamp - context.since >= context.durations.yellow,
        nextState: TrafficLightState.RED,
        action: createNullAction<TrafficLightContext, TrafficLightInput>()
      }
    ],
    defaultTransition: createNullTransition(TrafficLightState.YELLOW)
  },
  [TrafficLightState.GREEN]: {
    transitions: [
      {
        condition: ({input}) => input.type === 'TICK' && input.timestamp - context.since >= context.durations.green,
        nextState: TrafficLightState.RED,
        action: createNullAction<TrafficLightContext, TrafficLightInput>()
      }
    ],
    defaultTransition: createNullTransition(TrafficLightState.GREEN)
  }
};
```

This code defines transitions between states based on the inputs received and the current context of the traffic light.

### Performing Transitions

Now that we have defined our traffic light's behavior, we can use the doTransition function to perform state
transitions.

```ts
const updatedTrafficLightMachine = doTransition({
  definition: trafficLightDefinition,
  input: {type: 'TICK', timestamp: Date.now()},
  machine: trafficLightMachine
});
```

This code triggers a tick input on the traffic light machine, which causes it to transition to the next state based on
its definition and current context.

### Conclusion

With the state definition, transition logic, and transition execution in place, you now have a fully functional traffic
light simulation using MiniFSM. You can further customize and extend this implementation to suit your specific use case.

Happy coding!
