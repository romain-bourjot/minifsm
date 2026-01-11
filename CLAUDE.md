# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Install dependencies
npm ci

# Run tests
npm test

# Run tests with coverage
npm run coverage

# Lint TypeScript files
npm run lint

# Build for production (clean, compile, uglify)
npm run build

# Run a specific example
npm run example:counter

# Documentation
npm run docs:dev        # Start dev server
npm run docs:build      # Build static site
npm run docs:api-reference  # Generate API docs with typedoc
```

## Running a Single Test

Tests use Mocha with ts-node. To run a specific test file:
```bash
npx mocha -r ts-node/register tests/index.spec.ts
```

## Architecture

MiniFSM is a lightweight, type-safe finite state machine library with a single-file core implementation.

**Core module** (`src/index.ts`):
- All types and functions are exported from this single file
- Key types: `FSMDefinition`, `FSMMachine`, `FSMCondition`, `FSMAction`, `FSMTransition`
- Main function: `doTransition` - executes state transitions based on conditions
- Utility functions: `createMachine`, `createNullAction`, `createNullTransition`, `serializeMachine`, `deserializeMachine`

**FSM Pattern**:
- A `FSMDefinition<State, Context, Input>` maps each state to its transitions and default transition
- Each transition has a `condition` (predicate) and `action` (context transformer)
- `doTransition` finds the first matching condition or falls back to `defaultTransition`
- Machines are immutable - `doTransition` returns a new `FSMMachine` object

**Project structure**:
- `src/` - Core library (single file)
- `tests/` - Mocha tests using node:assert
- `examples/` - Usage examples (counter, vending machine, etc.)
- `vitepress/` - Documentation site

## Code Style

- Uses `standard-with-typescript` ESLint config
- TypeScript strict mode with `noImplicitAny` and `strictNullChecks`
- Tests use `void describe()` and `void it()` pattern for async handling