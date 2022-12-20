const reactAppConfig = require('eslint-config-react-app');
const prettierIndexConfig = require('eslint-config-prettier');

/**
 * ~ rules
 * "off" or 0 - turn the rule off
 * "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
 * "error" or 2 - turn the rule on as an error (exit code will be 1)
 */
module.exports = {
  extends: ['egg'],
  ...reactAppConfig,
  rules: {
    ...reactAppConfig.rules,
    strict: [0],
    'no-sequences': [0],
    'no-mixed-operators': [0],
    'react/react-in-jsx-scope': [0],
    'no-useless-escape': [0],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    semi: 'off',
    'array-bracket-spacing': 'off',
    'max-len': [
      'error',
      100,
      {
        comments: 100,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-nested-ternary': ['error'],
    'no-debugger': ['error'],
    'no-console': [
      'error',
      {
        allow: ['warn'],
      },
    ],
    'no-shadow': ['warn'],
    'prefer-promise-reject-errors': [
      'warn',
      {
        allowEmptyReject: true,
      },
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-key': 'error',
    ...prettierIndexConfig.rules,
  },
  globals: {
    __root__dirname: true,
    Cookies: true,
    fetchMock: true,
    mockStore: true,
    initStore: true,
  },
};
