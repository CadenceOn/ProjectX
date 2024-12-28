const pkg = require("./package");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
  },
  navigations: {
    "home": "/", // Главная страница
    "details": "/movies/:id", // Страница деталей фильма
    "favorites": "/favorites", // Избранное
  },
  features: {
    "home": {
      entry: "./src/home/index.ts",
    },
    "details": {
      entry: "./src/details/index.ts",
    },
    "favorites": {
      entry: "./src/favorites/index.ts",
    },
  },
};
