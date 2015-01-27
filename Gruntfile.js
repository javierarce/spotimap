module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

    // 1. All configuration goes here
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
          dist: {
            files: [{
              dot: true,
              src: [
                '.tmp'
              ]
            }]
          },
          js: {
            files: [{
              dot: true,
              src: [
                'source/<%= pkg.name %>.js'
              ]
            }]
          }
        },

        concat: {
          dist: {
            src: [
              'source/vendor/**/*.js',
              'source/*.js'
            ],
            dest: 'source/<%= pkg.name %>.js'
          }
        },

        uglify: {
          build: {
            src: 'source/<%= pkg.name %>.js',
            dest: 'js/<%= pkg.name %>.min.js'
          }
        },

        jshint: {
          all: ['Gruntfile.js', 'source/app.js']
        },

        compass: {
          dist: {
            options: {
              config: 'config.rb'
            }
          }
        },

        imagemin: {
          dynamic: {
            files: [{
              expand: true,
              cwd: 'img/',
              src: ['**/*.{png,jpg,gif}'],
              dest: 'img/'
            }]
          }
        },

        watch: {
          app: {
            files: ['source/app.js'],
            tasks: ['clean', 'concat', 'uglify', 'jshint'],
            options: {
              livereload: false,
              spawn: false,
            },
          },
          scripts: {
            files: ['source/app.js'],
            tasks: ['clean', 'concat', 'uglify', 'jshint'],
            options: {
              livereload: false,
              spawn: false,
            },
          },

          css: {
            files: ['scss/*.scss'],
            tasks: ['compass'],
            options: {
              livereload: false,
              spawn: false,
            }
          }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-deploy');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    //grunt.registerTask('watch', ['jshint', 'concat', 'uglify', 'watch']);
    grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify']);


};
