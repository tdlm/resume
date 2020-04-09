const { dest, series, parallel, src, watch } = require('gulp');
const gulpClean = require('gulp-clean');
const gulpHtmlPdf = require('gulp-html2pdf');
const gulpMustache = require('gulp-mustache');
const gulpRename = require('gulp-rename');

/**
 * Clean distribution folder.
 * @param {function} cb Callback function.
 */
function clean(cb) {
  src('dist/*', { read: false }).pipe(gulpClean());
  cb();
}

/**
 * Generate PDF version of resume.
 * @param {function} cb Callback function.
 */
function pdf(cb) {
  src('dist/scott-weaver_resume.html').pipe(gulpHtmlPdf()).pipe(dest('dist'));

  cb();
}

function html(cb) {
  src('src/templates/scott-weaver_resume.html.mustache')
    .pipe(gulpMustache('src/data/resume.json'))
    .pipe(gulpRename({ extname: '' }))
    .pipe(dest('dist'));
  cb();
}

function markdown(cb) {
  src('src/templates/scott-weaver_resume.md.mustache')
    .pipe(gulpMustache('src/data/resume.json'))
    .pipe(gulpRename({ extname: '' }))
    .pipe(dest('dist'));
  cb();
}

/**
 * Watch src directory for markdown files.
 * @param {function} cb Callback function.
 */
function watcher(cb) {
  series(clean, html, pdf, markdown);
  watch('src/**/*.*', series(clean, html, parallel(markdown, pdf)));
  cb();
}

exports.build = series(clean, html, parallel(markdown, pdf));
exports.clean = clean;
exports.watcher = watcher;
exports.default = watcher;
