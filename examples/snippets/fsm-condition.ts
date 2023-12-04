// npm run snippet:fsm-condition

import 'module-alias/register'

import { type FSMCondition } from '@minifsm/core'

// Define types for context and input
interface MyContext {
  temperature: number
}

interface MyInput {
  command: 'increase' | 'decrease'
}

// Define a condition function
const conditionFunction: FSMCondition<MyContext, MyInput> = ({ context, input }) => {
  if (input.command === 'increase') {
    return context.temperature < 100 // Can only increase temperature if it's below 100
  } else if (input.command === 'decrease') {
    return context.temperature > 0 // Can only decrease temperature if it's above 0
  }
  return false // Unknown commands are always invalid
}

// Simulate the condition check with different inputs
const initialContext: MyContext = { temperature: 50 }
const increaseInput: MyInput = { command: 'increase' }
const decreaseInput: MyInput = { command: 'decrease' }

// Check conditions with different inputs
const canIncreaseTemperature = conditionFunction({ context: initialContext, input: increaseInput })
const canDecreaseTemperature = conditionFunction({ context: initialContext, input: decreaseInput })

// Log the condition results
console.log('Can increase temperature?', canIncreaseTemperature)
console.log('Can decrease temperature?', canDecreaseTemperature)
