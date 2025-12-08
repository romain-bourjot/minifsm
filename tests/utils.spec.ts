import { describe, it } from 'mocha'
import assert from 'node:assert'
import { createMachine } from '../src'

void describe('MiniFSM - utils', () => {
  void describe('createMachine', () => {
    void it('Should create a machine', () => {
      const currentState = 'STATE'
      const context = { foo: 'bar' }

      const machine = createMachine<typeof currentState, typeof context>({
        currentState,
        context
      })

      assert.deepStrictEqual(machine, { currentState, context })
    })
  })
})
