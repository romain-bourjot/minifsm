import { describe, it } from 'mocha'
import assert from 'node:assert'
import {
  createDocumentNewVendingMachineMachine,
  doVendingMachineTransition,
  VendingMachineState
} from '../examples/vending-machine'

void describe('MiniFSM', () => {
  void describe('doTransition - withVendingMachine', () => {
    void it('Should start in IDLE state', () => {
      const machine = createDocumentNewVendingMachineMachine({})

      assert.deepStrictEqual(
        machine,
        {
          currentState: VendingMachineState.IDLE,
          context: {
            itemSelected: '',
            itemCost: 0,
            moneyInserted: 0
          }
        }
      )
    })

    void it('Should do nothing if money is inserted in IDLE state', () => {
      let machine = createDocumentNewVendingMachineMachine({})
      machine = doVendingMachineTransition({
        machine,
        input: { type: 'MONEY_INSERTED', amount: 5 }
      })

      assert.deepStrictEqual(
        machine,
        {
          currentState: VendingMachineState.IDLE,
          context: {
            itemSelected: '',
            itemCost: 0,
            moneyInserted: 0
          }
        }
      )
    })

    void it('Should allow a user to select an item', () => {
      let machine = createDocumentNewVendingMachineMachine({})
      machine = doVendingMachineTransition({
        machine,
        input: { type: 'SELECTION', itemSelected: 'Chocolate Bar' }
      })

      assert.deepStrictEqual(
        machine,
        {
          currentState: VendingMachineState.SELECTED,
          context: {
            itemSelected: 'Chocolate Bar',
            itemCost: 2,
            moneyInserted: 0
          }
        }
      )
    })

    void it('Should wait for the user to insert the right amount of money', () => {
      let machine = createDocumentNewVendingMachineMachine({})
      machine = doVendingMachineTransition({
        machine,
        input: { type: 'SELECTION', itemSelected: 'Chocolate Bar' }
      })
      machine = doVendingMachineTransition({
        machine,
        input: { type: 'MONEY_INSERTED', amount: 1 }
      })

      assert.deepStrictEqual(
        machine,
        {
          currentState: VendingMachineState.SELECTED,
          context: {
            itemSelected: 'Chocolate Bar',
            itemCost: 2,
            moneyInserted: 1
          }
        }
      )
    })

    void it('Should dispense the item when fully paid', () => {
      let machine = createDocumentNewVendingMachineMachine({})
      machine = doVendingMachineTransition({
        machine,
        input: { type: 'SELECTION', itemSelected: 'Chocolate Bar' }
      })
      machine = doVendingMachineTransition({
        machine,
        input: { type: 'MONEY_INSERTED', amount: 1 }
      })
      machine = doVendingMachineTransition({
        machine,
        input: { type: 'MONEY_INSERTED', amount: 2 }
      })

      assert.deepStrictEqual(
        machine,
        {
          currentState: VendingMachineState.DISPENSING,
          context: {
            itemSelected: 'Chocolate Bar',
            itemCost: 2,
            moneyInserted: 3
          }
        }
      )
    })

    void it('Should return to IDLE when item is dispensed', () => {
      let machine = createDocumentNewVendingMachineMachine({})
      machine = doVendingMachineTransition({
        machine,
        input: { type: 'SELECTION', itemSelected: 'Chocolate Bar' }
      })
      machine = doVendingMachineTransition({
        machine,
        input: { type: 'MONEY_INSERTED', amount: 1 }
      })
      machine = doVendingMachineTransition({
        machine,
        input: { type: 'MONEY_INSERTED', amount: 2 }
      })
      machine = doVendingMachineTransition({
        machine,
        input: { type: 'ITEM_DISPENSED' }
      })

      assert.deepStrictEqual(
        machine,
        {
          currentState: VendingMachineState.IDLE,
          context: {
            itemSelected: '',
            itemCost: 0,
            moneyInserted: 0
          }
        }
      )
    })
  })
})
