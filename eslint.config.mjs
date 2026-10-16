import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

// WAFRA is not compiled with the React Compiler, so the experimental
// react-hooks compiler rules shipped by eslint-plugin-react-hooks v7 are
// disabled. The core rules (rules-of-hooks, exhaustive-deps) stay enabled.
const compilerRules = {
  'react-hooks/config': 'off',
  'react-hooks/error-boundaries': 'off',
  'react-hooks/gating': 'off',
  'react-hooks/globals': 'off',
  'react-hooks/immutability': 'off',
  'react-hooks/preserve-manual-memoization': 'off',
  'react-hooks/purity': 'off',
  'react-hooks/refs': 'off',
  'react-hooks/set-state-in-effect': 'off',
  'react-hooks/set-state-in-render': 'off',
  'react-hooks/static-components': 'off',
  'react-hooks/unsupported-syntax': 'off',
  'react-hooks/use-memo': 'off',
  'react-hooks/incompatible-library': 'off',
};

export default [
  { ignores: ['.next/**', 'node_modules/**', '.npm-cache/**', 'var/**', 'next-env.d.ts'] },
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'react-hooks/exhaustive-deps': 'error',
      ...compilerRules,
    },
  },
];
