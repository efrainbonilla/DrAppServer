/*global module*/

module.exports = function (grunt) {
    'use strict';

    // Define the configuration for all the tasks
    grunt.initConfig({
        exec: {
            webpack: './node_modules/webpack/bin/webpack.js',
            webpack_watch: './node_modules/webpack-dev-server/bin/webpack-dev-server.js --progress --colors'
        }
    });

    grunt.registerTask('default', ['exec:webpack_watch']);
};
