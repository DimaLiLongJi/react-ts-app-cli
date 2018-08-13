module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "parserOptions": {
    "ecmaVersion": 8
  },
  "plugins": [
    "standard",
    "promise",
  ],
  "rules": {
    "indent": [
      "error",
      2,
      { SwitchCase: 1 }
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "no-console": 0,
    "camelcase": 0,
    "no-multiple-empty-lines": ["error", {
      "max": 1
    }],
    "eol-last": ["error", "always"],
    "valid-jsdoc": 1,
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore",
    }],
    "prefer-const": 0,
    "operator-linebreak": ["error", "before"],
    "no-unused-vars": ["error", { "args": "none" }]
  },
  "globals": {
    "angular": false,
    "module": false,
    "inject": false
  },
  "extends": "eslint:recommended",
};
