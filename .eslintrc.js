module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': 'eslint-config-airbnb',
  'parserOptions': {
    'sourceType': 'module',
  },
  'rules': {
    'indent': [
      'error', 2,
    ],
    'linebreak-style': [
      'error', 'unix',
    ],
    'quotes': [
      'error', 'single',
    ],
    'semi': ['error', 'always'],
    'import/no-unresolved': 0,
    'global-require': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'func-names': 0,
    'import/no-dynamic-require': 0,
    'arrow-body-style': 0,
    'consistent-return': 0,
  },
};