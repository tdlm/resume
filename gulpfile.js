const gulp = require('gulp');
const gulpClean = require('gulp-clean');
const gulpHtmlPdf = require('gulp-html-pdf');
const gulpMustache = require('gulp-mustache');
const gulpRename = require('gulp-rename');

/**
 * Clean distribution folder.
 * @param {function} cb Callback function.
 */
function cleanDist(cb) {
  gulp.src('dist/*', { read: false }).pipe(gulpClean());
  cb();
}

/**
 * Generate PDF version of resume.
 * @param {function} cb Callback function.
 */
function generatePdf(cb) {
  gulp
    .src('dist/*.html')
    .pipe(gulpHtmlPdf())
    .pipe(gulpRename({ extname: '.pdf' }))
    .pipe(gulp.dest('dist'));

  cb();
}

function generateHTML(cb) {
  gulp
    .src('src/templates/scott-weaver_resume.html.mustache')
    .pipe(gulpMustache('src/data/resume.json'))
    .pipe(gulpRename({ extname: '' }))
    .pipe(gulp.dest('dist'));
  cb();
}

function generateMarkdown(cb) {
  gulp
    .src('src/templates/scott-weaver_resume.md.mustache')
    .pipe(gulpMustache('src/data/resume.json'))
    .pipe(gulpRename({ extname: '' }))
    .pipe(gulp.dest('dist'));
  cb();
}

/**
 * Watch src directory for markdown files.
 * @param {function} cb Callback function.
 */
function watch(cb) {
  gulp.series(cleanDist, generateHTML, generatePdf, generateMarkdown);
  gulp.watch(
    'src/**/*.*',
    gulp.series(generateHTML, generatePdf, generateMarkdown),
  );
  cb();
}

exports.build = gulp.series(
  cleanDist,
  generateHTML,
  generatePdf,
  generateMarkdown,
);
exports.clean = cleanDist;
exports.watch = watch;
exports.default = watch;
