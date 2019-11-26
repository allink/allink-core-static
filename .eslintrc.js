module.exports = {
    env: {
        browser: true,
        es6: true,
        jquery: true,
    },
    extends: [
        'plugin:vue/recommended',
        'airbnb-base'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        CMS: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'vue',
    ],
    rules: {
        "indent": ["error", 4],
        "max-len": 0,
        "func-names": 0,
        "vue/html-indent": ["error", 4],
        "vue/max-attributes-per-line": 0,
    },
};
