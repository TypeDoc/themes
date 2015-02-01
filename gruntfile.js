module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-gh-pages');

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
        typedocc: {
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

    grunt.registerTask('typedoc', function() {
        var Path = require('path');
        var TypeDoc = require('typedoc');

        ['default', 'minimal'].forEach(function (theme) {
            var settings = new TypeDoc.Settings();
            settings.inputFiles.push(Path.resolve('./src/' + theme));
            settings.expandInputFiles();

            settings.out   = Path.resolve('./dist/' + theme);
            settings.theme = theme;
            settings.mode  = TypeDoc.SourceFileMode.File;
            settings.name  = (theme == 'default' ? 'Leap Motion' : 'FS Extra');
            settings.compilerOptions.target = TypeDoc.ScriptTarget.ES5;

            var app = new TypeDoc.Application(settings);
            app.generate(settings.inputFiles, settings.out);
        });
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