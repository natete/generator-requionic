module.exports = function () {
    var css = './www/css/';
    var allSass = ['./scss/**/*.scss', './www/**/*.scss'];
    var mainSass = ['./scss/ionic.app.scss', './scss/<%= appName %>.scss'];
    var alljs = ['./www/js/**/*.js', '!./www/js/lib/**/*.js', './*.js'];

    var config = {
        origin: {
            allSass: allSass,
            mainSass: mainSass,
            alljs: alljs
        },
        dest: {
            css: css
        }
    };

    return config;
};
