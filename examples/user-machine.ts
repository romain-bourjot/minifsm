import {
  createNullAction,
  createNullStateDefinition,
  createNullTransition,
  type FSMConditionalTransition,
  type FSMDefinition
} from '../src'

type UserState = 'WAITING_FOR_VALIDATION' | 'VALIDATED' | 'DELETED'

export interface UserContext {
  email: string
  emailValidationToken: string | null
}

export type UserInput = {
  type: 'EMAIL_VALIDATION_INPUT'
  emailValidationToken: string
} | { type: 'DELETE_INPUT' }

const deleteTransition: FSMConditionalTransition<UserState, UserContext, UserInput> = {
  ...createNullTransition('DELETED'),
  condition: ({ input }: { input: UserInput }) => input.type === 'DELETE_INPUT'
}

export const userDefinition: FSMDefinition<UserState, UserContext, UserInput> = {
  DELETED: createNullStateDefinition('DELETED'),
  WAITING_FOR_VALIDATION: {
    transitions: [
      deleteTransition,
      {
        nextState: 'VALIDATED',
        condition: ({ input, context }: { input: UserInput, context: UserContext }) => {
          if (input.type !== 'EMAIL_VALIDATION_INPUT') {
            return false
          }

          return input.emailValidationToken === context.emailValidationToken
        },
        action: createNullAction()
      }],
    defaultTransition: createNullTransition('WAITING_FOR_VALIDATION')
  },
  VALIDATED: {
    transitions: [deleteTransition],
    defaultTransition: createNullTransition('VALIDATED')
  }
}
