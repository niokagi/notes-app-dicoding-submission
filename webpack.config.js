import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: "./src/js/index.js", // Entry point utama aplikasi
  output: {
    filename: "bundle.js", // File output setelah di-bundle
    path: path.resolve("dist"), // Output ke folder dist
    clean: true, // Bersihkan folder dist setiap build
  },
  mode: "development", // Ubah ke 'production' untuk build final
  devServer: {
    static: path.resolve("dist"), // Folder yang dilayani oleh webpack-dev-server
    hot: true, // Hot module replacement
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Untuk meng-handle file CSS
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Path ke file HTML template
      filename: "index.html", // Nama file HTML di folder dist
    }),
  ],
  resolve: {
    extensions: [".js"], // Resolve .js file extensions
  },
};
