var gulp = require('gulp'),
    concat = require('gulp-concat') ,
    sass = require( 'gulp-sass') ,
    coffee = require('gulp-coffee'),
    riot = require( 'gulp-riot') ,
    addsrc = require('gulp-add-src'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),    
    uglify = require('gulp-uglify'),
    streamqueue = require('streamqueue'),
    merge = require('merge-stream'),
    notify = require('gulp-notify'),    
    gutil = require('gulp-util'),
    compass = require('compass-importer');

gulp.task('styles',  function() {
    return streamqueue( { objectMode: true } ,
            gulp.src( [
                "bower_components/sass-bootstrap/dist/css/bootstrap.css" ,
            ])
        ,
            gulp.src([ 
                    'src/sass/main.scss'
                ])
                .pipe(sass( {importer: compass }).on('error', sass.logError))
                .pipe(autoprefixer({
                        browsers: ['last 2 versions'],
                        cascade: false
                }))
         )
    .pipe( concat( 'main.css')) 
    .pipe( gulp.dest( "dist/css/" ) )
    // minify
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe( gulp.dest( "dist/css/" ) )
    ;

});





gulp.task('javascript:libs',  function() {

    return gulp.src( [
            'bower_components/jquery/dist/jquery.js',        
            'bower_components/sass-bootstrap/dist/js/bootstrap.js',
            'bower_components/sass-bootstrap/dist/js/bootstrap.js',
            'bower_components/riot/riot.js',
            'bower_components/riotcontrol/riotcontrol.js'
            ] )
    .pipe( concat( "libs.js") )
    .pipe( gulp.dest( "dist/js/" ) )
    // hacemos el uglify 
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe( gulp.dest( "dist/js/" ) ) 
    //.pipe(browserSync.stream())
    ;
 
});





 
gulp.task('javascript:app',  function() {
 
    return streamqueue({ objectMode: true } ,
            gulp.src( [ 
                'src/riot/*.tag', 
                'src/riot/**/*.tag' 
            ]).pipe(riot( {   }))
        ,
            sCoffee = gulp.src( [
                'src/coffee/store.coffee',
                'src/coffee/mixins.coffee',
                'src/coffee/app.coffee'
            ]).pipe(coffee({bare: true}).on('error', gutil.log))
    )
    .pipe( concat("app.js"))
    .pipe( gulp.dest( "dist/js/"))
    // uglify 
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe( gulp.dest( "dist/js/" ) )
    ;

}); 

 
gulp.task('watch', ['default'], function() {
    gulp.watch([ 
        'src/riot/*.tag', 
        'src/riot/**/*.tag',
        'src/coffee/*.coffee',
        'src/coffee/**/*.coffee',
        'src/coffee/**/**/*.coffee',
        'src/sass/*.scss'
        ] , ['default']);
 
});

 
gulp.task('default', [  "compile"  ], function() {

});

gulp.task('compile', [  ], function() {
    gulp.start('styles', 'javascript:app', 'javascript:libs');
});


