module.exports = {
    roots: ['<rootDir>/'],
    transform: {'^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/ts-jest',},
    transformIgnorePatterns: ["/node_modules/(?!(xxxx.*?\\.js$))"],
    testPathIgnorePatterns : ["/node_modules/"],
    testRegex: ["(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$"],//ERROR if use together
    modulePaths: [],
    moduleFileExtensions: ['ts','tsx','js','jsx','json','node'],
    moduleNameMapper: {
        '^react-native$': 'react-native-web',
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        'src/(.*)$': '<rootDir>/src/$1',
    },
    automock : false,
    preset: 'ts-jest',
    globals: {'ts-jest': {diagnostics: true,}},
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/serviceWorker.ts',
        '!src/setupTests.ts',
        '!src/index.tsx',
    ],
    coveragePathIgnorePatterns: ['./src/*/*.types.{ts,tsx}'],
    coverageReporters: ['json', 'lcov', 'text-summary', 'clover'],
};
