module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb" ,
    "airbnb-typescript" ,
    "airbnb/hooks",
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended",
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'coverage'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', "react",
    "@typescript-eslint",
    "prettier"
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 0,
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
  },
  settings: {
    "import/resolver": {
      "node": {
        "paths": ["public"]
      }
    },
  },
}
