import { createMachine, doTransition, type MachineDef, type MachineState, type BaseInput } from '../src'

export const enum VendingMachineState {
  IDLE = 'IDLE',
  SELECTED = 'SELECTED',
  DISPENSING = 'DISPENSING'
}

export interface VendingMachineContext {
  itemSelected: string
  itemCost: number
  moneyInserted: number
}

interface VendingMachineSelectionInput extends BaseInput<'SELECTION'> {
  itemSelected: string
}

interface VendingMachineMoneyInsertedInput extends BaseInput<'MONEY_INSERTED'> {
  amount: number
}

interface VendingMachineDispensedInput extends BaseInput<'ITEM_DISPENSED'> {}

export type VendingMachineInput =
  | VendingMachineSelectionInput
  | VendingMachineMoneyInsertedInput
  | VendingMachineDispensedInput

export type VendingMachineMachine = MachineState<VendingMachineState, VendingMachineContext>

export const vendingMachineDefinition: MachineDef<
  VendingMachineState,
  VendingMachineContext,
  VendingMachineInput
> = {
  [VendingMachineState.IDLE]: ({ context, input }) => {
    if (input.type === 'SELECTION') {
      return {
        currentState: VendingMachineState.SELECTED,
        context: {
          ...context,
          itemSelected: input.itemSelected,
          itemCost: 2
        }
      }
    }
    return undefined
  },

  [VendingMachineState.SELECTED]: ({ context, input }) => {
    if (input.type === 'MONEY_INSERTED') {
      const newTotal = context.moneyInserted + input.amount
      if (newTotal >= context.itemCost) {
        return {
          currentState: VendingMachineState.DISPENSING,
          context: {
            ...context,
            moneyInserted: newTotal
          }
        }
      }
      return {
        currentState: VendingMachineState.SELECTED,
        context: {
          ...context,
          moneyInserted: newTotal
        }
      }
    }
    return undefined
  },

  [VendingMachineState.DISPENSING]: ({ input }) => {
    if (input.type === 'ITEM_DISPENSED') {
      return {
        currentState: VendingMachineState.IDLE,
        context: {
          itemSelected: '',
          itemCost: 0,
          moneyInserted: 0
        }
      }
    }
    return undefined
  }
}

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
  return doTransition(
    vendingMachineDefinition,
    machine,
    input
  )
}
