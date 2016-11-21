/**
 * Created by Administrator on 2016/11/20.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'app.js', 'public/js/*.js', 'routes/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch : {
            jade : {
                files : ['view/**'],
                options : {
                    livereload: true
                }
            },
            js : {
                files : ['public/js/**', 'models/*.js', 'schemas/*.js', 'routes/*.js'],
                options : {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    files: "app.js",
                    script:'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            task: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.option('force', true);
    grunt.registerTask('default', ['jshint', 'concurrent']);
};
