import { type MachineDef, type MachineState, type BaseInput } from '../src'

type UserState = 'WAITING_FOR_VALIDATION' | 'VALIDATED' | 'DELETED'

export interface UserContext {
  email: string
  emailValidationToken: string | null
}

interface EmailValidationInput extends BaseInput<'EMAIL_VALIDATION_INPUT'> {
  emailValidationToken: string
}

interface DeleteInput extends BaseInput<'DELETE_INPUT'> {}

export type UserInput = EmailValidationInput | DeleteInput

export type UserMachine = MachineState<UserState, UserContext>

export const userDefinition: MachineDef<UserState, UserContext, UserInput> = {
  DELETED: () => undefined,

  WAITING_FOR_VALIDATION: ({ context, input }) => {
    if (input.type === 'DELETE_INPUT') {
      return { currentState: 'DELETED', context }
    }

    if (input.type === 'EMAIL_VALIDATION_INPUT') {
      if (input.emailValidationToken === context.emailValidationToken) {
        return { currentState: 'VALIDATED', context }
      }
    }

    return undefined
  },

  VALIDATED: ({ context, input }) => {
    if (input.type === 'DELETE_INPUT') {
      return { currentState: 'DELETED', context }
    }
    return undefined
  }
}
