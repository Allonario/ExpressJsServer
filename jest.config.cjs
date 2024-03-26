module.exports = {
    testMatch: ["**/__tests__/**/*.mjs"],
    testEnvironment: "node",
    transform: {
        '^.+\\.mjs$': 'babel-jest',
        '^.+\\.js$': 'babel-jest',
    },
};