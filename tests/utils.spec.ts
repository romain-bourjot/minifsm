import { describe, it } from 'mocha'
import assert from 'node:assert'
import { createMachine, createNullAction, createNullStateDefinition, createNullTransition } from '../src'

void describe('MiniFSM - utils', () => {
  void describe('createNullAction', () => {
    void it('Should create an action that returns the context untouched ', () => {
      const action = createNullAction<{ foo: string }, { inputType: string }>()

      const context = { foo: 'bar' }
      const input = { inputType: 'whatever' }

      assert.deepStrictEqual(action({ context, input }), context)
    })
  })

  void describe('createNullTransition', () => {
    void it('Should create a transition with a null action', () => {
      const nextState = 'NEXT_STATE'

      const context = { foo: 'bar' }
      const input = { inputType: 'whatever' }

      const transition = createNullTransition<typeof nextState, typeof context, typeof input>(
        nextState
      )

      assert.strictEqual(transition.nextState, nextState)
      assert.deepStrictEqual(transition.action({ context, input }), context)
    })
  })

  void describe('createNullStateDefinition', () => {
    void it('Should create a state definition with a null action and the same next state', () => {
      const nextState = 'NEXT_STATE'

      const context = { foo: 'bar' }
      const input = { inputType: 'whatever' }

      const stateDefinition = createNullStateDefinition<typeof nextState, typeof context, typeof input>(
        nextState
      )

      assert.strictEqual(stateDefinition.transitions.length, 0)
      assert.strictEqual(stateDefinition.defaultTransition.nextState, nextState)
      assert.deepStrictEqual(stateDefinition.defaultTransition.action({ context, input }), context)
    })
  })

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
