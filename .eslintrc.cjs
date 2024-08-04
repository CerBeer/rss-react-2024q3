module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:prettier/recommended",
    "plugin:@next/next/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'vitest.config.ts', 'coverage', 'next.config.mjs', 'app'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier"
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "no-void": ["error", { "allowAsStatement": true }],
    "import/prefer-default-export": "off" | "warn" | "error",
  },
  settings: {
    "import/resolver": {
      "node": {
        "paths": ["public"]
      }
    },
  },
}
