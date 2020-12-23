module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "array-bracket-spacing": [ 2, "always" ],
        "accessor-pairs": [ 2, {"getWithoutSet": true} ],
        "semi": [ "error", "always" ],
        "quotes": [ "error", "double" ]
    }
};
