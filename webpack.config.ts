import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as DevServerConfiguration } from 'webpack-dev-server'
const { ModuleFederationPlugin } = require("webpack").container;

import packageJson from './package.json'
const { dependencies } = packageJson

export default (_: never, { mode = 'development' }: IWebpackArgs): Configuration => {
  return {
    mode,

    devtool: mode == 'development' ? 'source-map' : false,
    devServer: {
      static: path.resolve(__dirname, "dist"),
      hot: true,
      port: 8081
    },

    entry: './src/index',
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: 'catsMemsImage.js',
      publicPath: 'http://localhost:8081/'
    },

    resolve: {
      extensions: [ '.ts', '.tsx', '.js', '.jsx' ]
    },

    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: { javascriptEnabled: true }
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new ModuleFederationPlugin({
        name: 'catsImages',
        filename: 'remoteEntry.js',
        exposes: {
          "./gridOfImages": './src/components/gridOfImages'
        },
        shared: {
          react: {singleton: true, eager: true, requiredVersion: dependencies.react },
          "react-dom": {singleton: true,  eager: true, requiredVersion: dependencies['react-dom'] },
          'antd': { singleton: true,  eager: true, requiredVersion: dependencies.antd },
          
        }
      

      }),
      new HtmlWebpackPlugin({
        title: 'test-task',
        template: 'public/index.html'
      })
    ]
  }
}

interface IWebpackArgs { mode?: 'development' | 'production' }

interface Configuration extends WebpackConfiguration {
  devServer?: DevServerConfiguration
}
