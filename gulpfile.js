const {src,dest,series,parallel} = require('gulp');
const fs = require('fs');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
// series顺序执行 parallel 并发
//可以返回stream promise eventemitter childprocess observable callback
//src读取文件后生成一个node流 dest终止流 src可以在管道中给流添加文件 
function clean(cb){
    console.log('clean')
    cb();
}

function p1(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('延时1');
            resolve('延时2');
        },2000)
    })
}

async function asyncTask(){
    const {name} = fs.readFileSync('package.json')
    console.log(name)
    await p1();
    console.log(p1)
}

function build(cb){
    console.log('build')
    cb();
}


function defaultTask(cb){
 console.log('执行任务');
 cb()
}

function babelNuglify(){
    return src('a.js')
    .pipe(sourcemaps.init())
    // return src('b.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(src('b.js'))
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('output/'))
}
exports.build1 = series(clean,build);
exports.build2 = parallel(clean,build);
exports.buildAsync = asyncTask;
exports.default = defaultTask;
exports.babelNuglify = babelNuglify;
