const gulp = require('gulp');
const del = require('del');
const tsify = require('tsify');
const browserify = require('browserify');
const source = require('vinyl-source-stream'); // 將 browserify 處理好的檔案轉換回 gulp 接受的 vinyl 檔案格式
const gutil = require("gulp-util");
const webserver = require('gulp-webserver');
const watchify = require('watchify');

const distPath = './'; //輸出建置成品的路徑
const jsArtifact = 'index.js'; //JavaScript 成品的名稱
const buildArtifacts = [distPath + jsArtifact];

//清空輸出打包成品的資料夾
const cleanTask = 'clean';
gulp.task(cleanTask, function () {
    return del(buildArtifacts);
});

const tsEntryFiles = ['src/ts/index.ts'];
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
//指定要輸出 JavaScript 的檔名
transpileConfig.outFile = jsArtifact;

const watchedBrowserify = watchify(browserify({ //browserify 會一併打包專案的依賴函式庫 , 也就是 React 和 ReactDOM
        basedir: '.',
        debug: true, //是否包含 sourcemap
        entries: tsEntryFiles, //要打包的 js 檔起始點
        cache: {},
        packageCache: {}
    })
    .plugin(tsify, //使用 tsify 呼叫 typescript 轉譯器轉譯 typescript 原始碼
        transpileConfig
    ));

function bundleJS() {
    watchedBrowserify.bundle() //實際開始打包, 輸出成 node.js stream
        .pipe(source(jsArtifact)) // 透過 vinyl-source-stream 轉換前面的建置成果為 gulp 可輸出的串流
        .pipe(gulp.dest(distPath));
}

const prepareJSTask = 'prepareJS';
gulp.task(prepareJSTask, [cleanTask], function(){
    bundleJS();
    watchedBrowserify.on('update', bundleJS);
    watchedBrowserify.on('log', gutil.log);
});

const prepareCSSTask = 'prepareCSS';
gulp.task(prepareCSSTask, [cleanTask], function(){
    return gulp.src('src/css/**/*.css')
                .pipe(gulp.dest(distPath));
});

const prepareHtmlTask = 'prepareHTML';
gulp.task(prepareHtmlTask, [cleanTask], function(){
    return gulp.src('src/html/**/*.html')
                .pipe(gulp.dest(distPath));
});

const buildTask = 'build';
gulp.task('build', [cleanTask, prepareJSTask, prepareCSSTask, prepareHtmlTask]);
gulp.task('default', [buildTask]);

const runDevServerTask = 'serve';
gulp.task(runDevServerTask, [buildTask], function () {
    return gulp.src('./' + distPath)
        .pipe(webserver({
            "livereload": true,
            "direcotryListing": true,
            "fallback": "index.html",
            "open": true
        }));
});