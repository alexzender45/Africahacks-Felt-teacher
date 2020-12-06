module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-param-reassign': ['error', { props: false }],
    'brace-style': [2, '1tbs'],
    'strict': 1,
    'no-console': 0,
    'no-undef': 1,
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    'import/prefer-default-export': 0,
    'no-useless-constructor': 0,
    'class-methods-use-this': 0,
    'import/no-cycle': 0,
    'array-callback-return': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'func-names': 0,
  }
};
