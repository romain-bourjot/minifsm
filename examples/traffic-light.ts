import {type FSMMachine, type FSMDefinition, doTransition, createNullTransition} from '../src'

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
