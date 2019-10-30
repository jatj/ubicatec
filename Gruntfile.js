

module.exports = function(grunt) {
    grunt.initConfig({	
        pkg: grunt.file.readJSON('package.json'),

        ts: {
            default : {
                tsconfig: './tsconfig.json'
            },
            dev : {
                tsconfig: './tsconfig.json',
                watch: '.'
            },
        },

        run:{
            api: {
                exec: 'node server.js'
            }
        },
        
        nodemon: {
            api: {
              script: 'server.js',
              options: {
                ignore: ['node_modules/**'],
                ext: 'js',
                delay: 1000
              }
            }
        },

        concurrent: {
            api: ['ts:dev', 'nodemon:api'],
            options: {
                logConcurrentOutput: true
            }
        }
    });
    // Load tasks
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    // Build
    grunt.registerTask('build', ['ts:default']);
    grunt.registerTask('build-watch', ['ts:dev']);
    // Run
    grunt.registerTask('start', ['run:api']);
    grunt.registerTask('serve', ['concurrent:api']);
}