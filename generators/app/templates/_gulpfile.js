var gulp = require('gulp');
var bower = require('bower');
var sh = require('shelljs');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var merge = require('merge-stream');
var plugins = require('gulp-load-plugins')({lazy: true});

/**
 * Compiles, autoprefixes, minifies and concats all styles.
 * Produces a css for each origin scss and a minified and a concatenated styles.min.css for production.
 * @return {Stream}
 */
gulp.task('sass', function () {
    plugins.util.log(plugins.util.colors.blue('Compiling SASS'));
    return gulp.src(config.origin.mainSass)
        .pipe(plugins.plumber())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer({browsers: ['last 2 version', 'safari 5', 'ios 6', 'android 4']}))
        .pipe(plugins.concat('styles.css'))
        .pipe(gulp.dest(config.dest.css))
        .pipe(plugins.cleanCss())
        .pipe(plugins.concat('styles.min.css'))
        .pipe(gulp.dest(config.dest.css));
});


gulp.task('watch', function () {
    gulp.watch(config.origin.allSass, ['sass']);
});

/**
 * Lints and anaylzes javascript code style.
 * @return {Stream}
 */
gulp.task('analyze', function () {
    plugins.util.log(plugins.util.colors.blue('Analyzing JSHint and JSCS'));
    var jshintAnalysis = analyzeJshint();
    var jscsAnalysis = analyzeJscs();

    return merge(jshintAnalysis, jscsAnalysis);
});
function analyzeJshint() {
    return gulp.src(config.origin.alljs)
        .pipe(plugins.if(args.verbose, plugins.print()))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(plugins.jshint.reporter('fail'));
}

function analyzeJscs() {
    return gulp.src(config.origin.alljs)
        .pipe(plugins.jscs())
        .pipe(plugins.jscsStylish());
}

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            plugins.util.log('bower', plugins.util.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + plugins.util.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', plugins.util.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + plugins.util.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
