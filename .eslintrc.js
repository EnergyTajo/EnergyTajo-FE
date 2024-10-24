module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['react-app', 'airbnb', 'prettier', 'plugin:jsx-a11y/recommended'], // jsx-a11y 추가
  plugins: ['prettier', 'jsx-a11y'], // jsx-a11y 추가
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  globals: {
    NODE_ENV: 'readonly',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/no-unresolved': 'off',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/prop-types': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'no-underscore-dangle': 'off',
    'react/react-in-jsx-scope': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either', // 규칙 조정
      },
    ],
  },
};
