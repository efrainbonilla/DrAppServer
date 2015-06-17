var path = require("path");
var ExtractTextPlugin = require('../ng-admin/node_modules/extract-text-webpack-plugin');

function getEntrySources(sources) {
    return sources;
}

var customSources = [
    '../ng-admin/src/javascripts/ng-admin.js',
    '../ng-admin/build/ng-admin.min.css',
    './src/javascripts/custom.js'
];

var vendorSources = [
    '../ng-admin/src/javascripts/vendors.js',
    './src/javascripts/vendors.js'
];

module.exports = {
    entry: {
        'ng-admin-custom': getEntrySources(customSources.concat(vendorSources)),
        'ng-admin-custom-only': getEntrySources(customSources)
    },
    output: {
        publicPath: "http://drapp.local:9012/",
        filename: "build/[name].min.js"
    },
    resolveLoader: {
		root: [
			path.join(__dirname, "../ng-admin/node_modules")
		]
	},
    module: {
        loaders: [
            { test: /\.js/, loaders: ['babel'], exclude: /node_modules\/(?!admin-config)/ },
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
