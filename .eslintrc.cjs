module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb" ,
    "airbnb-typescript" ,
    "airbnb/hooks",
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended",
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'vitest.config.ts', 'coverage'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', "react",
    "@typescript-eslint",
    "react-compiler",
    "prettier"
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "react-compiler/react-compiler": "error",
    "react/static-property-placement": ["warn", "property assignment", {
      childContextTypes: "static getter",
      contextTypes: "static public field",
      contextType: "static public field",
      displayName: "static public field",
      defaultProps: "static public field",
    }],
    "react/jsx-no-bind": ["warn", {
      "ignoreDOMComponents": false,
      "ignoreRefs": false,
      "allowArrowFunctions": true,
      "allowFunctions": true,
      "allowBind":false
    }],
    "no-void": ["error", { "allowAsStatement": true }],
  },
  settings: {
    "import/resolver": {
      "node": {
        "paths": ["public"]
      }
    },
  },
}
