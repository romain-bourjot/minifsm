# CLAUDE.md

This file provides guidance for AI assistants working with the MiniFSM codebase.

## Project Overview

MiniFSM (`@minifsm/core`) is a lightweight, type-safe TypeScript library for building Finite State Machines (FSMs). It works in both frontend and backend environments with zero dependencies.

## Repository Structure

```
minifsm/
├── src/
│   └── index.ts          # Single source file with all types and functions
├── tests/
│   ├── index.spec.ts     # Main doTransition tests (uses vending-machine example)
│   ├── utils.spec.ts     # Utility function tests
│   └── serialize.spec.ts # Serialization/deserialization tests
├── examples/
│   ├── snippets/         # API documentation code examples
│   ├── counter.ts        # Counter FSM example
│   ├── vending-machine.ts # Vending machine FSM (used in tests)
│   ├── traffic-light.ts  # Traffic light FSM example
│   ├── user-machine.ts   # User state machine example
│   └── word-counter.ts   # Word counter FSM example
├── vitepress/            # Documentation site (VitePress)
├── .github/workflows/    # CI pipeline
├── package.json
├── tsconfig.json
└── typedoc.json
```

## Key Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run coverage

# Lint code
npm run lint

# Build for production
npm run build

# Run a specific example
npm run example:counter
npm run snippet:fsm-machine

# Documentation
npm run docs:dev      # Start dev server
npm run docs:build    # Build static docs
npm run docs:api-reference  # Generate API docs
```

## Architecture

### Core Types (src/index.ts)

| Type | Description |
|------|-------------|
| `FSMCondition<Context, Input>` | Predicate function for conditional transitions |
| `FSMAction<Context, Input>` | Function that transforms context during transition |
| `FSMTransition<State, Context, Input>` | Defines nextState and action |
| `FSMConditionalTransition<State, Context, Input>` | Transition with condition |
| `FSMStateDefinition<State, Context, Input>` | State config with transitions + defaultTransition |
| `FSMDefinition<State, Context, Input>` | Complete FSM definition (Record of states) |
| `FSMMachine<State, Context>` | Runtime instance with currentState and context |
| `FSMSerializedMachine<Context>` | Serialized form for persistence |

### Core Functions

| Function | Description |
|----------|-------------|
| `doTransition()` | Execute a state transition based on input |
| `createMachine()` | Create a new FSM instance |
| `serializeMachine()` | Convert machine to serializable form |
| `deserializeMachine()` | Restore machine from serialized form |

### Utility Functions

| Function | Description |
|----------|-------------|
| `createNullAction()` | Create action that returns context unchanged |
| `createNullTransition()` | Create transition with null action |
| `createNullStateDefinition()` | Create state with only default transition |

## Development Patterns

### Defining an FSM

1. Define state enum with string values:
```typescript
enum MyState {
  IDLE = 'IDLE',
  ACTIVE = 'ACTIVE'
}
```

2. Define context and input types as interfaces

3. Create FSM definition as `FSMDefinition<State, Context, Input>`

4. Each state must have:
   - `transitions`: Array of conditional transitions (evaluated in order)
   - `defaultTransition`: Fallback when no condition matches

### Immutability Pattern

Actions should return new context objects, not mutate:
```typescript
action: ({ context, input }) => ({
  ...context,
  field: newValue
})
```

## Testing Conventions

- Test framework: Mocha with Node.js assert
- Tests import from `../src` (source) not `dist`
- Use `void describe()` and `void it()` syntax
- Example-based testing using examples/ FSMs
- Coverage tool: nyc (Istanbul)

### Running Tests

```bash
npm test                    # Run all tests
npm run coverage           # Run with coverage report
```

## Code Style

- ESLint with `standard-with-typescript` configuration
- TypeScript strict mode (`noImplicitAny`, `strictNullChecks`)
- Use explicit type annotations for function parameters
- Prefer `const enum` for state definitions in examples
- TSDoc comments with `@category` tags for API documentation

## CI Pipeline

GitHub Actions runs on every push:
1. Install dependencies (`npm ci`)
2. Lint (`npm run lint`)
3. Tests with coverage (`npm run coverage`)
4. Build package (`npm run build`)
5. Build and deploy documentation

## Documentation

- VitePress for main docs (`vitepress/`)
- TypeDoc for API reference (generates to `vitepress/typedoc/`)
- Code examples in `examples/snippets/` are included in API docs via `@includeExample`

## Important Notes for AI Assistants

1. **Single source file**: All library code lives in `src/index.ts`. The library is intentionally minimal.

2. **Type-first design**: FSMState must extend `string` for serialization compatibility.

3. **No side effects**: The library is pure - all functions return new values.

4. **Example files serve dual purpose**: They're both runnable examples AND embedded in API documentation.

5. **Build produces minified output**: Uses uglify-js after TypeScript compilation.

6. **Package publishes only dist/src**: The `files` field in package.json controls npm contents.
