import type { Config } from '@jest/types';
import baseJestConfig from '../jest.config';

const config: Config.InitialOptions = {
  ...baseJestConfig,
  ...{
    rootDir: '../',
    roots: [
      '<rootDir>/character-service/src',
    ],
  },
};

export default config;
