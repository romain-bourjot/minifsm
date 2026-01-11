import { doTransition, type MachineDef, type MachineState, type BaseInput } from '../src'

type TrafficLightState = 'GREEN' | 'YELLOW' | 'RED'

interface TrafficLightContext {
  turnOff: () => void
  lightRed: () => void
  lightYellow: () => void
  lightGreen: () => void
}

interface TrafficLightInput extends BaseInput<'tick'> {}

type TrafficLightMachine = MachineState<TrafficLightState, TrafficLightContext>

const trafficLightFSMDefinition: MachineDef<TrafficLightState, TrafficLightContext, TrafficLightInput> = {
  RED: ({ context, input }) => {
    if (input.type === 'tick') {
      context.turnOff()
      context.lightGreen()
      return { currentState: 'GREEN', context }
    }
    return undefined
  },

  YELLOW: ({ context, input }) => {
    if (input.type === 'tick') {
      context.turnOff()
      context.lightRed()
      return { currentState: 'RED', context }
    }
    return undefined
  },

  GREEN: ({ context, input }) => {
    if (input.type === 'tick') {
      context.turnOff()
      context.lightYellow()
      return { currentState: 'YELLOW', context }
    }
    return undefined
  }
}

let machine: TrafficLightMachine = {
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
  machine = doTransition(trafficLightFSMDefinition, machine, { type: 'tick' })
}, 1000)
