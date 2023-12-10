module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:import/typescript"
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'import/no-cycle': 'off',
        'max-len': ['error', {"code": 120}],
        "@typescript-eslint/no-explicit-any": "off",
        camelcase: "error",
        "spaced-comment": ["error", "always", {markers: ["/"]}],
        quotes: ["error", "single"],
        "no-duplicate-imports": "error",
        "prettier/prettier": "error",
        "no-unused-vars": ["error", {"args": "none"}],
        '@typescript-eslint/ban-ts-comment': 0
    },
    settings: {
        react: {
            version: "detect"
        },
        "import/resolver": {
            typescript: {}
        }
    }
};