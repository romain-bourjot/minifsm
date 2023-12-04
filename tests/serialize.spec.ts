import { describe, it } from 'mocha'
import assert from 'node:assert'
import { userDefinition } from '../examples/user-machine'
import { deserializeMachine, serializeMachine } from '../src'

void describe('MiniFSM - serialize', () => {
  void describe('serializeMachine', () => {
    void it('Should serialize a machine', () => {
      const currentState = 'STATE'
      const context = { foo: 'bar' }

      const serialized = serializeMachine<typeof currentState, typeof context>({
        currentState,
        context
      })

      assert.deepStrictEqual(serialized, { currentState: 'STATE', context })
    })
  })

  void describe('deserializeMachine', () => {
    void it('Should deserialize a machine', () => {
      const serialized = {
        currentState: 'WAITING_FOR_VALIDATION',
        context: {
          email: 'foo@example.com',
          emailValidationToken: 'whateverValidationToken'
        }
      }

      const deserialized = deserializeMachine({
        serialized,
        definition: userDefinition
      })

      assert.strictEqual(deserialized.currentState, 'WAITING_FOR_VALIDATION')
      assert.deepStrictEqual(deserialized.context, serialized.context)
    })

    void it('Should throw an error on unknown state', () => {
      const serialized = {
        currentState: 'UNKNOWN_STATE',
        context: {
          email: 'foo@example.com',
          emailValidationToken: 'whateverValidationToken'
        }
      }

      const deserializeFn = (): unknown => deserializeMachine({
        serialized,
        definition: userDefinition
      })

      assert.throws(deserializeFn)
    })
  })
})
