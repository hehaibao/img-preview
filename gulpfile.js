/**
 * gulp 自动化构建工具 【待完善】
 * @desc 目前只支持js的压缩
 * Created by haibao[http://www.hehaibao.com/] on 17/11/23.
 */
const gp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const del = require('del');
const babel = require('gulp-babel');

// 压缩js文件
gp.task('minify-js', ['clean:minjs'], function() {
    return gp.src('js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gp.dest('js'));
});

// 先清除以前生成的js
gp.task('clean:minjs', function (cb) {
    return del([ 'js/*.min.js' ], cb);
});

//默认任务 -- gulp
gp.task('default', ['minify-js']);