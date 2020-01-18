module.exports = function(grunt){
  grunt.initConfig({
    watch: {
      sass: {
        files: 'app/app.scss',
        tasks: ['sass'],
        options: {spawn: false, livereload: true }
             },
      browserSync: {
        files: ['app/app.css', 'app/index.html', 'app/app.module.js'],
        tasks: ['browserSync'],
        options: {spawn: false, livereload: true }
         }  
        },
        sass: {
            dev: {
                files: {
                    'app/app.css': 'app/app.scss'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'app/app.css',
                        'app/index.html',
                        'app/app.module.js'
                    ]
                },
                options: {
                  server: {
                    baseDir: "./app"
                }
                }
            }
        },
        concurrent: {
          options: {
            logConcurrentOutput: true
          },
          prod: {
            tasks: ["watch:sass", "watch:browserSync"]
          }

}});


  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-focus');

  grunt.registerTask("sync");
  
};