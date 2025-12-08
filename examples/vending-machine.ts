import { createMachine, createNullTransition, doTransition, type FSMDefinition, type FSMMachine } from '../src'

export const enum VendingMachineState {
  IDLE = 'IDLE',
  SELECTED = 'SELECTED',
  DISPENSING = 'DISPENSING',
}

export interface VendingMachineContext {
  itemSelected: string
  itemCost: number
  moneyInserted: number
}

interface VendingMachineSelectionInput {
  type: 'SELECTION'
  itemSelected: string
}

interface VendingMachineMoneyInsertedInput {
  type: 'MONEY_INSERTED'
  amount: number
}

interface VendingMachineDispensedInput {
  type: 'ITEM_DISPENSED'
}

export type VendingMachineInput =
  | VendingMachineSelectionInput
  | VendingMachineMoneyInsertedInput
  | VendingMachineDispensedInput

export const vendingMachineDefinition: FSMDefinition<VendingMachineState, VendingMachineContext, VendingMachineInput> = {
  [VendingMachineState.IDLE]: {
    transitions: [{
      condition: ({ input }: { input: VendingMachineInput }) => input.type === 'SELECTION',
      nextState: VendingMachineState.SELECTED,
      action: ({ input, context }: {
        input: VendingMachineInput
        context: VendingMachineContext
      }): VendingMachineContext => {
        const selectionInput = input as VendingMachineSelectionInput
        return {
          ...context,
          itemSelected: selectionInput.itemSelected,
          itemCost: 2
        }
      }
    }],
    defaultTransition: createNullTransition(VendingMachineState.IDLE)
  },

  [VendingMachineState.SELECTED]: {
    transitions: [{
      condition: ({
        input,
        context
      }: {
        input: VendingMachineInput
        context: VendingMachineContext
      }) => input.type === 'MONEY_INSERTED' && ((input as VendingMachineMoneyInsertedInput).amount + context.moneyInserted) < context.itemCost,
      nextState: VendingMachineState.SELECTED,
      action: ({ input, context }: {
        input: VendingMachineInput
        context: VendingMachineContext
      }): VendingMachineContext => {
        const moneyInput = input as VendingMachineMoneyInsertedInput
        return {
          ...context,
          moneyInserted: context.moneyInserted + moneyInput.amount
        }
      }
    }, {
      condition: ({
        input,
        context
      }: {
        input: VendingMachineInput
        context: VendingMachineContext
      }) => input.type === 'MONEY_INSERTED' && ((input as VendingMachineMoneyInsertedInput).amount + context.moneyInserted) >= context.itemCost,
      nextState: VendingMachineState.DISPENSING,
      action: ({ input, context }: {
        input: VendingMachineInput
        context: VendingMachineContext
      }): VendingMachineContext => {
        const moneyInput = input as VendingMachineMoneyInsertedInput
        return {
          ...context,
          moneyInserted: context.moneyInserted + moneyInput.amount
        }
      }
    }],
    defaultTransition: createNullTransition(VendingMachineState.SELECTED)
  },

  [VendingMachineState.DISPENSING]: {
    transitions: [{
      condition: ({ input }: { input: VendingMachineInput }) => input.type === 'ITEM_DISPENSED',
      nextState: VendingMachineState.IDLE,
      action: ({ context }: {
        context: VendingMachineContext
      }): VendingMachineContext => ({
        ...context,
        itemSelected: '',
        itemCost: 0,
        moneyInserted: 0
      })
    }],
    defaultTransition: createNullTransition(VendingMachineState.DISPENSING)
  }
}

export type VendingMachineMachine = FSMMachine<VendingMachineState, VendingMachineContext>

export function createDocumentNewVendingMachineMachine (
  _: Record<string, never>
): VendingMachineMachine {
  return createMachine({
    currentState: VendingMachineState.IDLE,
    context: {
      itemSelected: '',
      itemCost: 0,
      moneyInserted: 0
    }
  })
}

export function doVendingMachineTransition ({ machine, input }: {
  machine: VendingMachineMachine
  input: VendingMachineInput
}): VendingMachineMachine {
  return doTransition({
    definition: vendingMachineDefinition,
    machine,
    input
  })
}
