// npm run snippet:create-null-action

import 'module-alias/register'

import { createNullAction } from '@minifsm/core'

// Define types for context and input
interface MyContext {
  data: string
}

interface MyInput {
  action: string
}

// Create a null action function
const nullAction = createNullAction<MyContext, MyInput>()

// Simulate applying the null action
const initialContext: MyContext = { data: 'Initial data' }
const input: MyInput = { action: 'some_action' }
const updatedContext = nullAction({ context: initialContext, input })

// Log the updated context
console.log('Updated Context after Null Action:', updatedContext)
