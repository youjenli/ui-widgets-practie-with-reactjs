const gulp = require('gulp');
const del = require('del');
const tsify = require('tsify');
const browserify = require('browserify');
const source = require('vinyl-source-stream'); // 將 browserify 處理好的檔案轉換回 gulp 接受的 vinyl 檔案格式
const es = require('event-stream');
const rename = require('gulp-rename');
const print = require('gulp-print').default;
/*
    gulp-print 可以接在有檔案資訊輸出的 gulp 串流後面輸出檔名
    這點 fancy-log 似乎難以做到, 這會導致 gulp 在監控原始碼變化時沒辦法輸出重新建置的訊息到終端機
*/
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat-css');
const webserver = require('gulp-webserver');

const srcPath = './src';
const distPath = './dist'; //輸出建置成品的路徑

//清空輸出打包成品的資料夾
const cleanTask = 'clean';
gulp.task(cleanTask, function () {
    return del(distPath);
});

const tsEntryFiles = [srcPath + '/ts/index.tsx',
    srcPath + '/ts/fixedMenuLayout.tsx',
    srcPath + '/ts/offCanvasMenuLayout.tsx',
    srcPath + '/ts/portfolio.tsx'];
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

function bundleJS() {
    const tasks = tsEntryFiles.map(function(entryFile){
        return browserify({ //browserify 會一併打包專案的依賴函式庫 , 也就是 React 和 ReactDOM
            basedir: '.',
            debug: true, //是否包含 sourcemap
            entries: entryFile, //要打包的 js 檔起始點
            cache: {},
            packageCache: {}
        })
        .plugin(tsify, //使用 tsify 呼叫 typescript 轉譯器轉譯 typescript 原始碼
            transpileConfig
        ).bundle() //實際開始打包, 輸出成 node.js stream
        .pipe(source(entryFile)) // 透過 vinyl-source-stream 轉換前面的建置成果為 gulp 可輸出的串流
        .pipe(rename({
            dirname: '',
            extname: '.bundle.js'
        }))
        .pipe(print(filePath => `Generate bundle js file : ${filePath}`))
        .pipe(gulp.dest(distPath));
    });
    return es.merge.apply(null, tasks);
}

const prepareJSTask = 'prepareJS';
gulp.task(prepareJSTask, [cleanTask], bundleJS);

const cssConcatCollections = [
    {
        srcFiles:[
            srcPath + '/css/style.css'
        ],
        artifactName:"style.css",
        distPath:distPath
    },{
        srcFiles:[
            srcPath + '/css/fixedMenuLayout-style.css'
        ],
        artifactName:"fixedMenuLayout-style.css",
        distPath:distPath
    },{
        srcFiles:[
            srcPath + '/css/offCanvasMenuLayout-style.css'
        ],
        artifactName:"offCanvasMenuLayout-style.css",
        distPath:distPath
    },{
        srcFiles:[
            srcPath + '/css/portfolio-style.css'
        ],
        artifactName:"portfolio-style.css",
        distPath:distPath
    }
];

function concatCSSFiles() {
    const tasks = cssConcatCollections.map(function(collection){
        return gulp.src(collection.srcFiles)
                    .pipe(sourcemaps.init())
                    .pipe(concat(collection.artifactName))
                    .pipe(sourcemaps.write())
                    .pipe(print(filePath => `Generate concatenated css file : ${filePath}`))
                    .pipe(gulp.dest(collection.distPath));
    });
    
    return es.merge.apply(null, tasks);
}

const prepareCSSTask = 'prepareCSS';
gulp.task(prepareCSSTask, [cleanTask], concatCSSFiles);

function copyHTMLFiles() {
    return gulp.src(srcPath + '/html/**/*.html')
        .pipe(print(filePath => `Copy html file ${filePath} to distination folder.`))
        .pipe(gulp.dest(distPath));
}

const prepareHtmlTask = 'prepareHTML';
gulp.task(prepareHtmlTask, [cleanTask], copyHTMLFiles);

const buildTask = 'build';
gulp.task('build', [cleanTask, prepareJSTask, prepareCSSTask, prepareHtmlTask]);
gulp.task('default', [buildTask]);

const watchTask = 'watch';
gulp.task(watchTask, [buildTask], function () {
    gulp.watch([srcPath + '/ts/**/*.ts', srcPath + '/ts/**/*.tsx'], bundleJS);
    gulp.watch([srcPath + '/css/**/*.css'], concatCSSFiles);
    gulp.watch([srcPath + '/html/**/*.html'], copyHTMLFiles);
});

const runDevServerTask = 'serve';
gulp.task(runDevServerTask, [buildTask], function () {
    return gulp.src(distPath)
        .pipe(webserver({
            "livereload": true,
            "direcotryListing": true,
            "fallback": "index.html",
            "open": true
        }));
});