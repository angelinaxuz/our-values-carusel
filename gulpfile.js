const { src, dest, watch, parallel } = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let browserSync = require('browser-sync').create();
let sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

function styles() {
	return src('./scss/style.scss')
  	.pipe(sourcemaps.init())
	.pipe(eval(sass)())
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
  	.pipe(sourcemaps.write())
	.pipe(dest('./css'))
	.pipe(browserSync.stream())
}

function browserSyncInit() {
	browserSync.init({
		server: { baseDir: './' },
		notify: false,
		online: true
	})
}

function startWatch() {
	watch('./scss/**/*.scss', styles);
	watch('./**/*.html').on('change', browserSync.reload);
}


exports.start =  parallel(browserSyncInit, startWatch);
