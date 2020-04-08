const gulp = require('gulp');
const gulpClean = require('gulp-clean');
const gulpMarkdown = require('gulp-markdown');
const gulpMarkdownPdf = require('gulp-markdown-pdf');
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
    .src('src/*.md')
    .pipe(gulpMarkdownPdf())
    .pipe(gulpRename({ extname: `.pdf` }))
    .pipe(gulp.dest('dist'));

  cb();
}

/**
 * Generate HTML version of resume.
 * @param {function} cb Callback function.
 */
function generateHTML(cb) {
  gulp
    .src('src/*.md')
    .pipe(gulpMarkdown({ mangle: true, headerIds: true }))
    .pipe(gulpRename({ extname: `.html` }))
    .pipe(gulp.dest('dist'));

  cb();
}

/**
 * Watch src directory for markdown files.
 * @param {function} cb Callback function.
 */
function watch(cb) {
  gulp.watch('src/*.md', gulp.series(generatePdf, generateHTML));
  cb();
}

exports.build = gulp.series(cleanDist, generatePdf, generateHTML);
exports.clean = cleanDist;
exports.watch = watch;
exports.default = watch;
