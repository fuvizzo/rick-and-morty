import type { Config } from '@jest/types';
import baseJestConfig from '../jest.config';

const config: Config.InitialOptions = {
  ...baseJestConfig,
  ...{
    rootDir: '../',
    roots: [
      '<rootDir>/react-app/src',
    ],
  },
};

export default config;
