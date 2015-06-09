var path = require("path");
var ExtractTextPlugin = require('../ng-admin/node_modules/extract-text-webpack-plugin');

function getEntrySources(sources) {
    return sources;
}

var customSources = [
    './src/javascripts/custom.js'
];

module.exports = {
    entry: {
        'custom': getEntrySources(customSources)
    },
    output: {
        publicPath: "http://localhost:8080/",
        filename: "build/[name].min.js"
    },
    resolveLoader: {
		root: [
			path.join(__dirname, "../ng-admin/node_modules")
		]
	},
    module: {
        loaders: [
            { test: /\.js/, loaders: ['babel'], exclude: /ng-admin\/node_modules\/(?!admin-config)/ },
            { test: /\.js/, loaders: ['ng-annotate'] },
            { test: /\.html$/, loader: 'html' },
            { test: /\.(woff2?|svg|ttf|eot)(\?.*)?$/, loader: 'url' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('css') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
        ]
    },
    plugins: [
        new ExtractTextPlugin('build/[name].min.css', {
            allChunks: true
        })
    ]
};
