'use strict';

module.exports = function (grunt) {
    var path = require('path');

    // load npm tasks
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    /**
     * Gets the index.html file from the code coverage folder.
     *
     * @param {!string} folder The path to the code coverage folder.
     */
    function getCoverageReport (folder) {
        var reports = grunt.file.expand(folder + '*/index.html');

        if (reports && reports.length > 0) {
            return reports[0];
        }

        return '';
    }

    // Project configuration.
    grunt.initConfig({
        jshintFiles: ['Gruntfile.js', ],
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
            ' *\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
            ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
            ' */\n\n',
        clean: {
            jasmine: ['build/reports/test'],
            lint: ['build/reports/lint'],
            coverage: ['build/reports/coverage'],
            ci: ['build/reports'],
            tmp: ['.tmp']
        },
        concat: {
            dist: {
                options: {
                    stripBanners: true
                },
                src: ['src/**/*.js'],
                dest: '<%= pkg.name %>.js'
            },
            removeUseStrict: {
                options: {
                    banner: '<%= banner %>\'use strict\';\n',
                    process: function(src) {
                        return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    }
                },
                src: ['<%= pkg.name %>.js'],
                dest: '<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: ['.tmp/<%= pkg.name %>.js'],
                dest: '<%= pkg.name %>.min.js'
            }
        },
        ngmin: {
            dist: {
                files: [
                {
                    src: ['<%= pkg.name %>.js'],
                    dest: '.tmp/<%= pkg.name %>.js'
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            test: '<%= jshintFiles %>',
            jslint: {
                options: {
                    reporter: 'jslint',
                    reporterOutput: 'build/reports/lint/jshint.xml'
                },
                files: {
                    src: '<%= jshintFiles %>'
                }
            },
            checkstyle: {
                options: {
                    reporter: 'checkstyle',
                    reporterOutput: 'build/reports/lint/jshint_checkstyle.xml'
                },
                files: {
                    src: '<%= jshintFiles %>'
                }
            }
        },
        bgShell: {
            coverage: {
                cmd: 'node node_modules/istanbul/lib/cli.js cover --dir build/reports/coverage node_modules/grunt-jasmine-node/node_modules/jasmine-node/bin/jasmine-node -- test --forceexit'
            },
            cobertura: {
                cmd: 'node node_modules/istanbul/lib/cli.js report --root build/reports/coverage --dir build/reports/coverage cobertura'
            }
        },
        open: {
            coverage: {
                path: function () {
                    return path.join(__dirname, getCoverageReport('build/reports/coverage/'));
                }
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            },
            ci: {
                configFile: 'test/karma.conf.js',
                colors: false,
                reporters: ['mocha', 'junit'],
                junitReporter: {
                    outputFile: 'build/reports/tests/lx-angular-alert.xml',
                    suite: 'lx-angular-alert'
                }
            },
            debug: {
                configFile: 'test/karma.conf.js',
                singleRun: false,
                detectBrowsers: {
                    enabled: false
                }
            },
            coverage: {
                configFile: 'test/karma.coverage.conf.js',
                colors: false
            },
            cobertura: {
                configFile: 'test/karma.coverage.conf.js',
                colors: false,
                coverageReporter: {
                    type: 'cobertura',
                    dir: 'build/reports/coverage'
                }
            }
        },
        jasmine_node: {
            options: {
                specNameMatcher: './*.spec', // load only specs containing specNameMatcher
                requirejs: false,
                forceExit: true
            },
            test: ['test/'],
            ci: {
                options: {
                    jUnit: {
                    report: true,
                    savePath: 'build/reports/test/',
                    useDotNotation: true,
                    consolidate: true
                    }
                },
                src: ['test/']
            }
        },
        changelog: {
            options: {
            }
        },
        bump: {
            options: {
                files: ['package.json' , 'bower.json'],
                updateConfigs: ['pkg'],
                commitFiles: ['.'],
                commitMessage: 'chore: release v%VERSION%',
                push: false
            }
        }
    });

    // Register tasks.
    grunt.registerTask('git:commitHook', 'Install git commit hook', function () {
        grunt.file.copy('validate-commit-msg.js', '.git/hooks/commit-msg');
        require('fs').chmodSync('.git/hooks/commit-msg', '0755');
        grunt.log.ok('Registered git hook: commit-msg');
    });

    grunt.registerTask('lint', ['jshint:test']);
    grunt.registerTask('test', ['git:commitHook', 'clean:jasmine', 'jshint:test', 'karma:unit' ]);
    grunt.registerTask('cover', ['clean:coverage', 'jshint:test',  'karma:coverage' , 'open:coverage']);
    grunt.registerTask('debug', ['karma:debug']);
    grunt.registerTask('ci', ['clean:ci', 'jshint:jslint', 'jshint:checkstyle', 'karma:ci', 'karma:coverage', 'karma:cobertura' ]);
    grunt.registerTask('release', 'Bump version, update changelog and tag version', function (version) {
        grunt.task.run([
            'bump:' + (version || 'patch') + ':bump-only',
            'changelog',
            'bump-commit'
        ]);
    });

    grunt.registerTask('build', ['clean:tmp', 'concat', 'ngmin', 'uglify']);

    // Default task.
    grunt.registerTask('default', ['test']);
};