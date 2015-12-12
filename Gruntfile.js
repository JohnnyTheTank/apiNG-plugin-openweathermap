module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                files : {
                    'dist/aping-plugin-openweathermap.min.js' : [
                        'src/aping-openweathermap-directive.js',
                        'src/aping-openweathermap-helper.js',
                        'bower_components/angular-openweathermap-api-factory/src/angular-openweathermap-api-factory.js'
                    ]
                }
            },
            options: {
                banner: '\n/*! <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("dd-mm-yyyy") %>) by <%= pkg.author %> */\n',
            }
        },
        watch: {
            minifiyJs: {
                files: [
                    'src/aping-openweathermap-directive.js',
                    'src/aping-openweathermap-helper.js',
                    'bower_components/angular-openweathermap-api-factory/src/angular-openweathermap-api-factory.js'
                ],
                tasks: ['uglify'],
                options: {
                    spawn: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);

};

