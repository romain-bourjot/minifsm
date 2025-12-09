# Examples

[[TOC]]

This page showcases practical state machine implementations using MiniFSM. Each example demonstrates different patterns and use cases.

## Counter (Progress Tracker)

A simple state machine that tracks progress from 0 to 100 across three states.

**States:** `START` → `IN_PROGRESS` → `COMPLETE`

**Use case:** Progress bars, multi-step processes, loading indicators

```ts
import { createMachine, doTransition, type MachineDef, type BaseInput } from '@minifsm/core';

enum State {
  START = 'START',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE'
}

interface Context {
  progress: number;
}

interface IncrementInput extends BaseInput<'INCREMENT'> {
  increment: number;
}

const definition: MachineDef<State, Context, IncrementInput> = {
  [State.START]: ({ context, input }) => {
    if (input.increment > 0) {
      return {
        currentState: State.IN_PROGRESS,
        context: { progress: context.progress + input.increment }
      };
    }
    return undefined;
  },

  [State.IN_PROGRESS]: ({ context, input }) => {
    const newProgress = context.progress + input.increment;
    if (newProgress >= 100) {
      return { currentState: State.COMPLETE, context: { progress: newProgress } };
    }
    return { currentState: State.IN_PROGRESS, context: { progress: newProgress } };
  },

  [State.COMPLETE]: () => undefined // No transitions from complete
};

// Usage
let machine = createMachine({ currentState: State.START, context: { progress: 0 } });

while (machine.currentState !== State.COMPLETE) {
  machine = doTransition(definition, machine, { type: 'INCREMENT', increment: 20 });
  console.log(`Progress: ${machine.context.progress}%`);
}
// Progress: 20%
// Progress: 40%
// Progress: 60%
// Progress: 80%
// Progress: 100%
```

::: tip Run this example
```bash
npm run example:counter
```
:::

## Traffic Light

A cyclic state machine demonstrating timed state transitions.

**States:** `RED` → `GREEN` → `YELLOW` → `RED` (repeating)

**Use case:** Timed processes, animations, cyclic workflows

```ts
import { doTransition, type MachineDef, type MachineState, type BaseInput } from '@minifsm/core';

type TrafficLightState = 'GREEN' | 'YELLOW' | 'RED';

interface TrafficLightContext {
  turnOff: () => void;
  lightRed: () => void;
  lightYellow: () => void;
  lightGreen: () => void;
}

interface TickInput extends BaseInput<'tick'> {}

const definition: MachineDef<TrafficLightState, TrafficLightContext, TickInput> = {
  RED: ({ context, input }) => {
    if (input.type === 'tick') {
      context.turnOff();
      context.lightGreen();
      return { currentState: 'GREEN', context };
    }
    return undefined;
  },

  GREEN: ({ context, input }) => {
    if (input.type === 'tick') {
      context.turnOff();
      context.lightYellow();
      return { currentState: 'YELLOW', context };
    }
    return undefined;
  },

  YELLOW: ({ context, input }) => {
    if (input.type === 'tick') {
      context.turnOff();
      context.lightRed();
      return { currentState: 'RED', context };
    }
    return undefined;
  }
};

// Usage with console output
let machine: MachineState<TrafficLightState, TrafficLightContext> = {
  currentState: 'RED',
  context: {
    turnOff: () => console.clear(),
    lightRed: () => console.log('RED'),
    lightYellow: () => console.log('YELLOW'),
    lightGreen: () => console.log('GREEN')
  }
};

// Tick every second
setInterval(() => {
  machine = doTransition(definition, machine, { type: 'tick' });
}, 1000);
```

::: warning Side Effects in Context
This example stores callback functions in context for demonstration purposes. In production, prefer triggering side effects outside the state machine based on state changes rather than calling functions from within handlers. This keeps your state machine pure and easier to test.
:::

## Vending Machine

A multi-input state machine with conditional transitions based on context.

**States:** `IDLE` → `SELECTED` → `DISPENSING` → `IDLE`

**Use case:** E-commerce flows, payment processing, order management

```ts
import { createMachine, doTransition, type MachineDef, type BaseInput } from '@minifsm/core';

enum State {
  IDLE = 'IDLE',
  SELECTED = 'SELECTED',
  DISPENSING = 'DISPENSING'
}

interface Context {
  itemSelected: string;
  itemCost: number;
  moneyInserted: number;
}

interface SelectionInput extends BaseInput<'SELECTION'> {
  itemSelected: string;
}

interface MoneyInsertedInput extends BaseInput<'MONEY_INSERTED'> {
  amount: number;
}

interface ItemDispensedInput extends BaseInput<'ITEM_DISPENSED'> {}

type VendingInput = SelectionInput | MoneyInsertedInput | ItemDispensedInput;

const definition: MachineDef<State, Context, VendingInput> = {
  [State.IDLE]: ({ context, input }) => {
    if (input.type === 'SELECTION') {
      return {
        currentState: State.SELECTED,
        context: { ...context, itemSelected: input.itemSelected, itemCost: 2 }
      };
    }
    return undefined;
  },

  [State.SELECTED]: ({ context, input }) => {
    if (input.type === 'MONEY_INSERTED') {
      const newTotal = context.moneyInserted + input.amount;
      if (newTotal >= context.itemCost) {
        return { currentState: State.DISPENSING, context: { ...context, moneyInserted: newTotal } };
      }
      return { currentState: State.SELECTED, context: { ...context, moneyInserted: newTotal } };
    }
    return undefined;
  },

  [State.DISPENSING]: ({ input }) => {
    if (input.type === 'ITEM_DISPENSED') {
      return {
        currentState: State.IDLE,
        context: { itemSelected: '', itemCost: 0, moneyInserted: 0 }
      };
    }
    return undefined;
  }
};

// Usage
let machine = createMachine({
  currentState: State.IDLE,
  context: { itemSelected: '', itemCost: 0, moneyInserted: 0 }
});

// Select a snack
machine = doTransition(definition, machine, { type: 'SELECTION', itemSelected: 'Chips' });
console.log(machine.currentState); // 'SELECTED'

// Insert money
machine = doTransition(definition, machine, { type: 'MONEY_INSERTED', amount: 1 });
console.log(machine.context.moneyInserted); // 1

machine = doTransition(definition, machine, { type: 'MONEY_INSERTED', amount: 1 });
console.log(machine.currentState); // 'DISPENSING'

// Dispense item
machine = doTransition(definition, machine, { type: 'ITEM_DISPENSED' });
console.log(machine.currentState); // 'IDLE'
```

## Word Counter (Text Tokenizer)

A parsing state machine that tokenizes text into words, handling contractions.

**States:** `IDLE` → `IN_WORD` → `IN_CONTRACTION` → `IDLE`

**Use case:** Parsers, lexers, text processing, validation

```ts
import { createMachine, doTransition, type MachineDef, type MachineState, type BaseInput } from '@minifsm/core';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789?';
const CONTRACTION = "'";

type State = 'IDLE' | 'IN_WORD' | 'IN_CONTRACTION';

interface Context {
  currentToken: string;
  tokens: string[];
  bufferChar: string;
}

interface CharInput extends BaseInput<'CHAR'> {
  char: string;
}

function isValidWordChar(char: string): boolean {
  return ALPHABET.includes(char.toLowerCase());
}

function isContraction(char: string): boolean {
  return CONTRACTION.includes(char);
}

const definition: MachineDef<State, Context, CharInput> = {
  IDLE: ({ context, input }) => {
    if (isValidWordChar(input.char)) {
      return {
        currentState: 'IN_WORD',
        context: { currentToken: input.char.toLowerCase(), bufferChar: '', tokens: context.tokens }
      };
    }
    return { currentState: 'IDLE', context: { ...context, currentToken: '', bufferChar: '' } };
  },

  IN_WORD: ({ context, input }) => {
    if (isValidWordChar(input.char)) {
      return {
        currentState: 'IN_WORD',
        context: {
          currentToken: `${context.currentToken}${context.bufferChar}${input.char.toLowerCase()}`,
          bufferChar: '',
          tokens: context.tokens
        }
      };
    }
    if (isContraction(input.char)) {
      return {
        currentState: 'IN_CONTRACTION',
        context: { ...context, bufferChar: input.char }
      };
    }
    // End of word
    return {
      currentState: 'IDLE',
      context: { tokens: [...context.tokens, context.currentToken], currentToken: '', bufferChar: '' }
    };
  },

  IN_CONTRACTION: ({ context, input }) => {
    if (isValidWordChar(input.char)) {
      return {
        currentState: 'IN_WORD',
        context: {
          currentToken: `${context.currentToken}${context.bufferChar}${input.char.toLowerCase()}`,
          bufferChar: '',
          tokens: context.tokens
        }
      };
    }
    // Not a contraction, end word
    return {
      currentState: 'IDLE',
      context: { tokens: [...context.tokens, context.currentToken], currentToken: '', bufferChar: '' }
    };
  }
};

// Usage
function tokenize(text: string): string[] {
  let machine: MachineState<State, Context> = createMachine({
    currentState: 'IDLE',
    context: { currentToken: '', bufferChar: '', tokens: [] }
  });

  for (const char of text + '\n') {
    machine = doTransition(definition, machine, { type: 'CHAR', char });
  }

  return machine.context.tokens;
}

console.log(tokenize("don't stop believin'"));
// ["don't", "stop", "believin'"]
```

## User Lifecycle

A state machine for user account lifecycle management.

**States:** `WAITING_FOR_VALIDATION` → `VALIDATED` → `DELETED`

**Use case:** User management, approval workflows, lifecycle tracking

```ts
import { type MachineDef, type BaseInput } from '@minifsm/core';

type UserState = 'WAITING_FOR_VALIDATION' | 'VALIDATED' | 'DELETED';

interface UserContext {
  email: string;
  emailValidationToken: string | null;
}

interface EmailValidationInput extends BaseInput<'EMAIL_VALIDATION_INPUT'> {
  emailValidationToken: string;
}

interface DeleteInput extends BaseInput<'DELETE_INPUT'> {}

type UserInput = EmailValidationInput | DeleteInput;

const userDefinition: MachineDef<UserState, UserContext, UserInput> = {
  WAITING_FOR_VALIDATION: ({ context, input }) => {
    if (input.type === 'DELETE_INPUT') {
      return { currentState: 'DELETED', context };
    }
    if (input.type === 'EMAIL_VALIDATION_INPUT') {
      if (input.emailValidationToken === context.emailValidationToken) {
        return { currentState: 'VALIDATED', context };
      }
    }
    return undefined;
  },

  VALIDATED: ({ context, input }) => {
    if (input.type === 'DELETE_INPUT') {
      return { currentState: 'DELETED', context };
    }
    return undefined;
  },

  DELETED: () => undefined // Terminal state
};
```

## Common Patterns

### Terminal States

States with no outgoing transitions (like `DELETED` or `COMPLETE`):

```ts
[State.TERMINAL]: () => undefined
```

### Self-Transitions

Staying in the same state with updated context:

```ts
[State.LOADING]: ({ context, input }) => {
  if (input.type === 'PROGRESS') {
    return { currentState: State.LOADING, context: { ...context, progress: input.value } };
  }
  return undefined;
}
```

### Guarded Transitions

Conditional transitions based on context:

```ts
[State.SELECTED]: ({ context, input }) => {
  if (input.type === 'CONFIRM' && context.balance >= context.price) {
    return { currentState: State.CONFIRMED, context };
  }
  return undefined; // Stay in SELECTED if balance insufficient
}
```

## Async Data Fetching

A common pattern for managing asynchronous operations with loading, success, and error states.

**States:** `idle` → `loading` → `success` | `error`

**Use case:** API calls, data loading, form submissions

```ts
import { createMachine, doTransition, type MachineDef, type BaseInput } from '@minifsm/core';

type FetchState = 'idle' | 'loading' | 'success' | 'error';

interface FetchContext<T> {
  data: T | null;
  error: string | null;
}

interface FetchInput extends BaseInput<'FETCH'> {}
interface SuccessInput<T> extends BaseInput<'SUCCESS'> { data: T }
interface ErrorInput extends BaseInput<'ERROR'> { error: string }
interface RetryInput extends BaseInput<'RETRY'> {}
interface ResetInput extends BaseInput<'RESET'> {}

type Input<T> = FetchInput | SuccessInput<T> | ErrorInput | RetryInput | ResetInput;

function createFetchDefinition<T>(): MachineDef<FetchState, FetchContext<T>, Input<T>> {
  return {
    idle: ({ input }) => {
      if (input.type === 'FETCH') {
        return { currentState: 'loading', context: { data: null, error: null } };
      }
      return undefined;
    },

    loading: ({ input }) => {
      if (input.type === 'SUCCESS') {
        return { currentState: 'success', context: { data: input.data, error: null } };
      }
      if (input.type === 'ERROR') {
        return { currentState: 'error', context: { data: null, error: input.error } };
      }
      return undefined;
    },

    success: ({ context, input }) => {
      if (input.type === 'FETCH') {
        return { currentState: 'loading', context: { ...context, error: null } };
      }
      if (input.type === 'RESET') {
        return { currentState: 'idle', context: { data: null, error: null } };
      }
      return undefined;
    },

    error: ({ input }) => {
      if (input.type === 'RETRY') {
        return { currentState: 'loading', context: { data: null, error: null } };
      }
      if (input.type === 'RESET') {
        return { currentState: 'idle', context: { data: null, error: null } };
      }
      return undefined;
    }
  };
}

// Usage with React (conceptual)
const definition = createFetchDefinition<{ name: string }>();
let machine = createMachine<FetchState, FetchContext<{ name: string }>>({
  currentState: 'idle',
  context: { data: null, error: null }
});

// Trigger fetch
machine = doTransition(definition, machine, { type: 'FETCH' });

// Simulate API response
machine = doTransition(definition, machine, {
  type: 'SUCCESS',
  data: { name: 'Alice' }
});

console.log(machine.currentState); // 'success'
console.log(machine.context.data); // { name: 'Alice' }
```

## Nested State Machines

For complex workflows, compose multiple machines by storing child machine states in the parent context.

**Use case:** Multi-step wizards, checkout flows, complex forms

```ts
import { createMachine, doTransition, type MachineDef, type MachineState, type BaseInput } from '@minifsm/core';

// Child machine: Shipping form
type ShippingState = 'editing' | 'validated';
interface ShippingContext { address: string; validated: boolean }
interface UpdateAddressInput extends BaseInput<'UPDATE_ADDRESS'> { address: string }
interface ValidateInput extends BaseInput<'VALIDATE'> {}
type ShippingInput = UpdateAddressInput | ValidateInput;

const shippingDefinition: MachineDef<ShippingState, ShippingContext, ShippingInput> = {
  editing: ({ context, input }) => {
    if (input.type === 'UPDATE_ADDRESS') {
      return { currentState: 'editing', context: { ...context, address: input.address } };
    }
    if (input.type === 'VALIDATE' && context.address.length > 0) {
      return { currentState: 'validated', context: { ...context, validated: true } };
    }
    return undefined;
  },
  validated: ({ context, input }) => {
    if (input.type === 'UPDATE_ADDRESS') {
      return { currentState: 'editing', context: { address: input.address, validated: false } };
    }
    return undefined;
  }
};

// Parent machine: Checkout flow
type CheckoutState = 'shipping' | 'payment' | 'confirmation';

interface CheckoutContext {
  shippingMachine: MachineState<ShippingState, ShippingContext>;
}

interface NextStepInput extends BaseInput<'NEXT_STEP'> {}
interface ShippingActionInput extends BaseInput<'SHIPPING_ACTION'> {
  action: ShippingInput;
}
type CheckoutInput = NextStepInput | ShippingActionInput;

const checkoutDefinition: MachineDef<CheckoutState, CheckoutContext, CheckoutInput> = {
  shipping: ({ context, input }) => {
    if (input.type === 'SHIPPING_ACTION') {
      // Delegate to child machine
      const newShipping = doTransition(shippingDefinition, context.shippingMachine, input.action);
      return { currentState: 'shipping', context: { ...context, shippingMachine: newShipping } };
    }
    if (input.type === 'NEXT_STEP' && context.shippingMachine.currentState === 'validated') {
      return { currentState: 'payment', context };
    }
    return undefined;
  },

  payment: ({ context, input }) => {
    if (input.type === 'NEXT_STEP') {
      return { currentState: 'confirmation', context };
    }
    return undefined;
  },

  confirmation: () => undefined
};

// Usage
let checkout = createMachine<CheckoutState, CheckoutContext>({
  currentState: 'shipping',
  context: {
    shippingMachine: createMachine({
      currentState: 'editing' as ShippingState,
      context: { address: '', validated: false }
    })
  }
});

// Update shipping address via parent
checkout = doTransition(checkoutDefinition, checkout, {
  type: 'SHIPPING_ACTION',
  action: { type: 'UPDATE_ADDRESS', address: '123 Main St' }
});

// Validate shipping
checkout = doTransition(checkoutDefinition, checkout, {
  type: 'SHIPPING_ACTION',
  action: { type: 'VALIDATE' }
});

// Move to payment
checkout = doTransition(checkoutDefinition, checkout, { type: 'NEXT_STEP' });
console.log(checkout.currentState); // 'payment'
```

## Next Steps

- Read the [Quick Start Guide](/quick-start) for a complete tutorial
- Learn about [Serialization](/serialization) for persistence
- Explore the [API Reference](/typedoc/) for detailed documentation
