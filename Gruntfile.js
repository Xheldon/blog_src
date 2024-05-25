module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            main: {
                src: 'themes/xblog/source/js/<%= pkg.name %>.js',
                dest: 'themes/xblog/source/js/<%= pkg.name %>.min.js'
            }
        },
        less: {
            expanded: {
                options: {
                    paths: ["themes/xblog/source/css", "themes/xblog/source/less"]
                },
                files: {
                    "themes/xblog/source/css/<%= pkg.name %>.css": "themes/xblog/source/less/<%= pkg.name %>.less"
                }
            },
            minified: {
                options: {
                    paths: ["themes/xblog/source/css", "themes/xblog/source/less"],
                    compress: true
                },
                files: {
                    "themes/xblog/source/css/<%= pkg.name %>.min.css": "themes/xblog/source/less/<%= pkg.name %>.less"
                }
            }
        },
        banner: '/*!\n' +
            ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',
        watch: {
            scripts: {
                files: ['themes/xblog/source/js/<%= pkg.name %>.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            less: {
                files: ['themes/xblog/source/less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
        },
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'less']);

};
