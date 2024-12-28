const pkg = require("./package");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.css$/,
    //       use: ['style-loader', 'css-loader'],
    //     },
    //     {
    //       test: /\.(woff|woff2|eot|ttf|otf)$/,
    //       use: [
    //         {
    //           loader: 'file-loader',
    //           options: {
    //             name: '[name].[ext]',
    //             outputPath: 'fonts/',
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       test: /\.tsx?$/,
    //       use: 'ts-loader',
    //       exclude: /node_modules/,
    //     },
    //   ],
    // },
    // resolve: {
    //   extensions: ['.tsx', '.ts', '.js'],
    // },
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
