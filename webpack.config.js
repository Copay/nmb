const path = require('path');
module.exports = {
    entry: "./src/ts/index.ts",
    output: {
        filename: 'nmb.js',
        path: path.resolve(__dirname, 'dist'),
        library: "",
        libraryTarget: "umd"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } }
                ]
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },
    resolve: {
        extensions: [".json", ".ts", ".js"],
        modules: [path.resolve(__dirname,"src/ts"),__dirname, "node_modules"]
    }
}