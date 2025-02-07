import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
     "@typescript-eslint/no-explicit-any": "off",
    },
    ignores: [
      'src/api/services.ts',
      'src/api/types.ts',
      'src/app.tsx',
      'src/components/Footer.tsx',
      'src/components/GridPoster/components/GridPoster.tsx',
      'src/components/SearchBar.tsx',
      'src/components/SimilarMovies.tsx',
      'src/details/MovieDetails copy.tsx',
      'src/details/MovieDetails.tsx',
      'src/home/HomePage.tsx',
      'src/index.tsx',
      'src/store/rating.tsx',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
  })),
  pluginReact.configs.flat.recommended,
];
