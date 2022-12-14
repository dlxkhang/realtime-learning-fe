module.exports = {
    root: true,
    env: {
        jest: true,
        browser: true,
        node: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'airbnb', 'airbnb-typescript', 'prettier'],
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        sourceType: 'module',
        project: './tsconfig.eslint.json',
    },
    plugins: ['react', 'jsx-a11y', 'import', '@typescript-eslint', 'react-hooks'],
    rules: {
        'global-require': 0,
        'no-bitwise': 'off',
        'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
        'no-shadow': 'off',
        'no-plusplus': 0,
        indent: [
            'warn',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'linebreak-style': 'off',
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'arrow-parens': 0,
        'arrow-body-style': 0,
        'object-curly-newline': 0,
        'implicit-arrow-linebreak': 0,
        'operator-linebreak': 0,
        'no-underscore-dangle': 0,
        'max-len': [2, { code: 250 }],
        'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
        'no-param-reassign': [2, { props: true, ignorePropertyModificationsForRegex: ['^state'] }],
        'no-use-before-define': 0,
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'import/export': 0,
        'import/prefer-default-export': 'off',
        'default-param-last': 'off',
        // React
        'react/destructuring-assignment': 0,
        'react/no-did-mount-set-state': 0,
        'react/prop-types': 1,
        'react/display-name': 0,
        'react/no-array-index-key': 0,
        'react/prefer-stateless-function': 0,
        'react/forbid-prop-types': 0,
        'react/button-has-type': 1,
        'react/require-default-props': 0,
        'react/no-did-update-set-state': 0,

        'react/jsx-indent': 0,
        'react/jsx-wrap-multilines': 0,
        'react/jsx-curly-newline': 0,
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-closing-bracket-location': 0,
        'react/jsx-props-no-spreading': 0,
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [0],
        'react/function-component-definition': [0],

        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/label-has-for': 0,
        'jsx-a11y/label-has-associated-control': ['off'],
        // React hook
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
    ignorePatterns: ['node_modules', '.next', 'public'],
}
