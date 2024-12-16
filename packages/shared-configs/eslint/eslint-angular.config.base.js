import angular from 'angular-eslint';
import tseslint from 'typescript-eslint';

import { config as baseConfig } from './eslint.config.base.js';

const angularConfigs = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          alphabetical: true,
        },
      ],
    },
  }
);

export const angularBaseConfig = [...baseConfig, ...angularConfigs];
