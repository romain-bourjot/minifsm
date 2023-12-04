import { createNullTransition, doTransition, type FSMDefinition, type FSMMachine } from '../src'

type TrafficLightState = 'GREEN' | 'YELLOW' | 'RED'

interface TrafficLightContext {
  turnOff: () => void
  lightRed: () => void
  lightYellow: () => void
  lightGreen: () => void
}

interface TrafficLightInput {
  type: 'tick'
}

function isTickCondition ({ input }: { input: TrafficLightInput }): boolean {
  return input.type === 'tick'
}

const trafficLightFSMDefinition: FSMDefinition<TrafficLightState, TrafficLightContext, TrafficLightInput> = {
  RED: {
    transitions: [
      {
        nextState: 'GREEN',
        condition: isTickCondition,
        action: ({ context }: {
          context: TrafficLightContext
          input: TrafficLightInput
        }): TrafficLightContext => {
          context.turnOff()
          context.lightGreen()

          return context
        }
      }
    ],
    defaultTransition: createNullTransition('RED')
  },
  YELLOW: {
    transitions: [
      {
        nextState: 'RED',
        condition: isTickCondition,
        action: ({ context }: {
          context: TrafficLightContext
          input: TrafficLightInput
        }): TrafficLightContext => {
          context.turnOff()
          context.lightRed()

          return context
        }
      }
    ],
    defaultTransition: createNullTransition('YELLOW')
  },
  GREEN: {
    transitions: [
      {
        nextState: 'YELLOW',
        condition: isTickCondition,
        action: ({ context }: {
          context: TrafficLightContext
          input: TrafficLightInput
        }): TrafficLightContext => {
          context.turnOff()
          context.lightYellow()

          return context
        }
      }
    ],
    defaultTransition: createNullTransition('GREEN')
  }
}

let machine: FSMMachine<TrafficLightState, TrafficLightContext> = {
  currentState: 'RED',
  context: {
    turnOff: () => {
      console.clear()
    },
    lightRed: () => {
      console.log('red')
    },
    lightYellow: () => {
      console.log('yellow')
    },
    lightGreen: () => {
      console.log('green')
    }
  }
}

setInterval(() => {
  machine = doTransition({ definition: trafficLightFSMDefinition, machine, input: { type: 'tick' } })
}, 1000)
