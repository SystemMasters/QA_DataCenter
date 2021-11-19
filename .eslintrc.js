module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
  },
  extends: [
    'plugin:node/recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "no-console": "off",
  },
};
