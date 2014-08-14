module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-typedoc');
    grunt.loadNpmTasks('grunt-gh-pages');

    function getTypeDocPath() {
        var fs = require('fs');
        return fs.existsSync('./local.json') ? require('./local.json').typeDocPath : 'typedoc/src/';
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist/']
        },
        copy: {
            rootfiles: {
                src: ['README.md', 'LICENCE*'],
                dest: 'dist/'
            }
        },
        typedoc: {
            default: {
                options: {
                    module: 'commonjs',
                    out: 'dist/default',
                    name: 'Leap Motion',
                    target: 'es5',
                    theme: 'default'
                },
                src: 'src/default'
            },
            minimal: {
                options: {
                    module: 'commonjs',
                    out: 'dist/minimal',
                    name: 'FS Extra',
                    target: 'es5',
                    theme: 'minimal'
                },
                src: 'src/minimal'
            }
        },
        'gh-pages': {
            'dist': {
                options: {
                    base: 'dist/'
                },
                src: '**/*'
            }
        }
    });

    grunt.registerTask('build', 'Create api documentation', [
        'clean',
        'typedoc',
        'copy'
    ]);

    grunt.registerTask('publish', 'Publish to typedoc.io/api', [
        'build',
        'gh-pages'
    ]);

    grunt.registerTask('default', ['build']);
};