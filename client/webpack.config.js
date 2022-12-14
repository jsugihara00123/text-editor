const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


// TODO: Add and configure workbox plugins for a service worker and manifest file.
// Complete

// TODO: Add CSS loaders and babel to webpack.
// Complete


module.exports = () => {

  return {

    mode: 'development',
    entry: {

      main: './src/js/index.js',
      install: './src/js/install.js'

    },

    output: {

      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),

    },

    // <-------- New Addition ----------->

    plugins: [

      new HtmlWebpackPlugin({

        template: './index.html', 
        title: 'Text Editor' 

      }),
     
      new InjectManifest({

        swSrc: './src-sw.js',
        swDest: 'src-sw.js',

      }),

      new WebpackPwaManifest({  

        fingerprints: false,
        inject: true,
        name: 'Text Editor',
        display: "standalone",
        short_name: 'Editor',
        description: 'Just Another Text Editor',
        background_color: '#272822',
        theme_color: '#31A9E1',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },

        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,  
          use: ['style-loader', 'css-loader'], 
        },

        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i, 
          type: 'asset/resource'
        },

        {
          test: /\.m?js$/,  
          exclude: /(node_modules|bower_components)/,  
          use: 
            {
            loader: 'babel-loader', 
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }
          }
        }

// <-------- New Addition ----------- >

      ],
    },
  };
};
