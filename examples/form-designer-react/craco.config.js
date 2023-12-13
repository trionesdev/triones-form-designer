const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getPlugin, pluginByName } = require("@craco/craco");
const CracoLessPlugin = require("craco-less");
const path = require('path');
const _ = require("lodash");

const getWebpackPlugin = (webpackConfig, pluginName) => {
    const { isFound, match } = getPlugin(webpackConfig, pluginByName(pluginName));
    if (isFound) {
        return match;
    }
}

module.exports={

    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            'layout-header-background': '#333'
                        },
                        javascriptEnabled: true,
                    },
                }
            }
        },
    ],

    webpack: {
        alias: {
        },
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.output = {
                ...webpackConfig.output,
                // path: path.resolve(__dirname, 'build'),
                // publicPath: './'
            };
            return webpackConfig;
        },
    },

}