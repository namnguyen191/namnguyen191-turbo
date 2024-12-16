const config = {
  './package.json': [(_files) => ['pnpm lint:all', 'pnpm test:all', 'pnpm build:all']],
  '{apps,packages,angular-workspace}/**/*.{ts,tsx}': [
    (_files) => ['pnpm test:affected', 'pnpm lint:affected'],
  ],
  '{apps,packages,angular-workspace}/**': [(_files) => ['pnpm build:affected']],
  '{apps,packages,angular-workspace}/**/*.{js,ts,jsx,tsx,json,html,css,scss}': [
    (files) => `pnpm format ${files.join(' ')}`,
  ],
};

export default config;
