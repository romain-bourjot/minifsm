export type FSMCondition<FSMContext, FSMInput> = (_: { context: FSMContext, input: FSMInput }) => boolean
export interface FSMTransition<FSMState, FSMContext, FSMInput> {
  nextState: FSMState
  action: (_: { context: FSMContext, input: FSMInput }) => FSMContext
}

export type FSMConditionalTransition<FSMState, FSMContext, FSMInput> = {
  condition: FSMCondition<FSMContext, FSMInput>
} & FSMTransition<FSMState, FSMContext, FSMInput>

export type FSMDefinition<FSMState extends symbol, FSMContext, FSMInput> = Record<FSMState, {
  transitions: Array<FSMConditionalTransition<FSMState, FSMContext, FSMInput>>
  defaultTransition: FSMTransition<FSMState, FSMContext, FSMInput>
}>

export interface FSMMachine<FSMState, FSMContext> {
  currentState: FSMState
  context: FSMContext
}

export function doTransition<FSMState extends symbol, FSMContext, FSMInput> ({
  definition,
  input,
  machine
}: {
  definition: FSMDefinition<FSMState, FSMContext, FSMInput>
  input: FSMInput
  machine: FSMMachine<FSMState, FSMContext>
}): FSMMachine<FSMState, FSMContext> {
  const currentState = definition[machine.currentState]
  const transition = currentState.transitions.find(
    x => x.condition({ context: machine.context, input })
  ) ?? currentState.defaultTransition

  return {
    currentState: transition.nextState,
    context: transition.action({ context: machine.context, input })
  }
}

export function createNullAction<FSMContext, FSMInput>() {
  return ({ context }: { context: FSMContext, input: FSMInput}): FSMContext => context
}

export function createNullTransition<FSMContext, FSMInput, FSMState>(nextState: FSMState) {
  return { nextState, action: createNullAction<FSMContext, FSMInput>() }
}
