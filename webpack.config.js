import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from "dotenv-webpack";

export default {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js", 
    path: path.resolve("dist"),
    clean: true, 
  },
  mode: "development", 
  devServer: {
    static: path.resolve("dist"), 
    hot: true, 
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html", 
      filename: "index.html", 
    }),
    new Dotenv(),
  ],
  resolve: {
    extensions: [".js"], 
  },
};
