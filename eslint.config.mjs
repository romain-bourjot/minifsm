// @ts-check
import love from 'eslint-config-love'

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'vitepress/**'
    ]
  },
  // Main source files - strict rules
  {
    ...love,
    files: ['src/**/*.ts'],
    languageOptions: {
      ...love.languageOptions,
      parserOptions: {
        ...love.languageOptions?.parserOptions,
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      ...love.rules,
      // Allow type assertions where needed for FSM library
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/prefer-destructuring': 'off'
    }
  },
  // Test files - relaxed rules for readability
  {
    ...love,
    files: ['tests/**/*.ts'],
    languageOptions: {
      ...love.languageOptions,
      parserOptions: {
        ...love.languageOptions?.parserOptions,
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      ...love.rules,
      '@typescript-eslint/no-magic-numbers': 'off'
    }
  },
  // Example files - relaxed rules for demonstration code
  {
    ...love,
    files: ['examples/**/*.ts'],
    languageOptions: {
      ...love.languageOptions,
      parserOptions: {
        ...love.languageOptions?.parserOptions,
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      ...love.rules,
      'no-console': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'off',
      '@typescript-eslint/no-misused-spread': 'off',
      'eslint-comments/require-description': 'off'
    }
  }
]
