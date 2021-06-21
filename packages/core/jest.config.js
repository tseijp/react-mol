const path = require('path');

module.exports = {
    rootDir: path.join(__dirname, '../..'),
    roots: ['<rootDir>/'],
    transform: {'^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/ts-jest'},
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(xxxx.*?\\.js$))'],
    testRegex: ['(/test/.*|\\.(test|spec))\\.(js|jsx|ts|tsx)$'],
    modulePaths: [],
    moduleFileExtensions: ['ts','tsx','js','jsx','json','node'],
    moduleNameMapper: {'src/(.*)$': '<rootDir>/src/$1'},
    preset: 'ts-jest',
    globals: {'ts-jest': {diagnostics: true}},
    automock: false,
    clearMocks: true,
    coverageDirectory: '<rootDir>/coverage/',
    collectCoverageFrom: ['<rootDir>/packages/core/src/**/*.ts', '!**/index.*'],
    coverageReporters: ['json', 'html', 'lcov', 'text', 'text-summary', 'clover'],
    coverageThreshold: {global: {statements: 95, functions: 95, branches: 95, lines: 95}},
};
