module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'react-app',
    'airbnb'
  ],
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
    'semi': ['error', 'always'], // 세미콜론 강제
    'quotes': ['error', 'single'], // 싱글 쿼테이션 사용 강제
    'no-console': 'warn', // console.log를 경고로 표시
    'no-unused-vars': 'warn', // 사용되지 않는 변수 경고
    'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx", ".tsx"] }], // JSX를 .js, .jsx, .tsx에서 허용
    'react/prop-types': 'off', // PropTypes 강제 사용 해제
    'arrow-body-style': ['error', 'as-needed'], // 필요할 때만 화살표 함수의 본문 사용
    'no-underscore-dangle': 'off', // 변수명 앞에 언더스코어 허용
    'react/react-in-jsx-scope': 'off', // React 17부터는 import 없이 JSX 사용 가능
  },
};