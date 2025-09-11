// для sass
import * as dartSass from 'sass'
import gulpSass from "gulp-sass"

import cleanCss from 'gulp-clean-css' // сжатие css
import autoprefixer from 'gulp-autoprefixer' // добавление вендорных префиксов
import groupCssMediaQueies from 'gulp-group-css-media-queries' // групировка медиа запросов
import rename from 'gulp-rename'
import plumber from "gulp-plumber";

const Sass = gulpSass(dartSass)

export async function sass() {
    return app.gulp.src(app.path.src.sass,{sourcemaps: app.isDev,encoding: false})
        .pipe(plumber())
        .pipe(Sass({
            outputStyle: "expanded", // запуск sass
            errLogToConsole: false,
            onError: function(err) {
                return app.plugins.notify().write(err);
            }
        }))
        
    .pipe(app.plugins.replace(/@img\//g, '../img/')) // замена путей к картинке

    // если есть 2 и более медиа запроса на одинаковую ширину, он их обьеденит (только в продакшене)
    .pipe(
        app.plugins.if(
            app.isBuild,
            groupCssMediaQueies()
        )
    ) 

    // отвечает за префиксы
    .pipe(
        autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"],
            cascade: true
        })
    ) 
    
    // сжатие файла (продакшн)
    .pipe(
        app.plugins.if(
            app.isBuild,
            cleanCss({removeDuplicateRules: 'true'})
        )
    )

    // в продакшене изменяем путь файл
    .pipe(app.plugins.if(app.isBuild, app.plugins.replace('/dist', "") ))


    //.pipe(app.plugins.concat('style.min.css')) // переименовывваем
    .pipe(rename({suffix: '.min'}))
    .pipe(app.gulp.dest(app.path.assembly.css)) // выгружаем в dist
   .pipe(app.plugins.browsersync.stream()) // обновляем на сервере
}