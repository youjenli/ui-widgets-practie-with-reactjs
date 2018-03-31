const gulp = require('gulp');
const del = require('del');
const tsify = require('tsify');
const browserify = require('browserify');
const source = require('vinyl-source-stream'); // 將 browserify 處理好的檔案轉換回 gulp 接受的 vinyl 檔案格式
const rename = require('gulp-rename');
const es = require('event-stream');
const gutil = require("gulp-util");
const webserver = require('gulp-webserver');
const watchify = require('watchify');

const distPath = './dist'; //輸出建置成品的路徑

//清空輸出打包成品的資料夾
const cleanTask = 'clean';
gulp.task(cleanTask, function () {
    return del(distPath);
});

const tsConfig = require('./tsconfig.json');
/*因為 tsify 接收參數的格式在 compilerOptions 的部分比 tsconfig 高一層, 
    所以下面要把 tsconfig 的 compilerOptions 往外提出來
*/
const transpileConfig = {};
if (tsConfig.hasOwnProperty('compilerOptions')) {
    Object.assign(transpileConfig, tsConfig.compilerOptions);
    delete transpileConfig.compilerOptions;
}
//提出 compilterOption 之後就是複製其他欄位
Object.assign(transpileConfig, tsConfig);

const tsEntryFiles = [
    'main/index.ts'
];

const watchedBrowserifies = tsEntryFiles.map(function (tsEntryFile) {
    return {
        src: tsEntryFile,
        watchedBrowserify: watchify(browserify({ //browserify 會一併打包專案的依賴函式庫 , 也就是 React 和 ReactDOM
                basedir: './src/',
                debug: true, //是否包含 sourcemap
                entries: tsEntryFile, //要打包的 js 檔起始點
                cache: {},
                packageCache: {}
            })
            .plugin(tsify, //使用 tsify 呼叫 typescript 轉譯器轉譯 typescript 原始碼
                transpileConfig
            ))
    };
});

function bundleJS() {
    const tasks = watchedBrowserifies.map(function (browserifyConfig) {
        return browserifyConfig.watchedBrowserify.bundle() //實際開始打包, 輸出成 node.js stream
            .pipe(source(browserifyConfig.src))// 透過 vinyl-source-stream 轉換前面的建置成果為 gulp 可輸出的串流
            .pipe(rename({
                extname: '.js'
            }))
            .pipe(gulp.dest(distPath));
    });
    return tasks;
}

const prepareJSTask = 'prepareJS';
gulp.task(prepareJSTask, [cleanTask], function () {
    const tasks = bundleJS();
    tasks.forEach(function (watchedBrowserify) {
        watchedBrowserify.on('update', bundleJS);
        watchedBrowserify.on('log', gutil.log);
    });
    return es.merge.apply(null, tasks);
});

const prepareHtmlTask = 'prepareHtml';
gulp.task(prepareHtmlTask, [cleanTask], function () {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest(distPath));
});

const buildTask = 'build';
gulp.task('build', [cleanTask, prepareJSTask, prepareHtmlTask]);
gulp.task('default', [buildTask]);

const runDevServerTask = 'serve';
gulp.task(runDevServerTask, [buildTask], function () {
    return gulp.src(distPath + '/main/index.html')
        .pipe(webserver({
            "livereload": true,
            "direcotryListing": true,
            "open": true
        }));
});