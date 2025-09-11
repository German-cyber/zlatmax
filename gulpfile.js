// модуль галпа
import gulp from "gulp"

// импорт путей
import {path} from "./gulp/config/path.js"
//импорт всех плагинов
import { plugins } from "./gulp/config/plugins.js"

// глобальная переменная которая содержит пути и модуль gulp
global.app = {
    // флаги находится ли проект в разработке
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins,
}


// импорт задачи
import { copyFonts, copyCss, copyJs } from "./gulp/tasks/copy.js"
import { reset } from "./gulp/tasks/reset.js"
import { html } from "./gulp/tasks/html.js"
import { server } from "./gulp/tasks/server.js"
import { sass } from "./gulp/tasks/sass.js"
import {js} from "./gulp/tasks/js.js"
import { images } from "./gulp/tasks/images.js"
import { fonts, fontsStyle } from "./gulp/tasks/fonts.js"
import {svgSprive} from "./gulp/tasks/svgSprite.js"
import {zip} from './gulp/tasks/zip.js'

import {generatFavicon, faviconMarkups} from './gulp/tasks/favicon.js'

// наблюдатель за изменениями в файл
function watcher(){
    // gulp.watch(path.watch.files, copy)
    gulp.watch([
        `./src/components/**/*.pug`,
        `./src/html/**/*.pug`,
    ], html)
    gulp.watch(path.watch.sass, sass)
    gulp.watch([`${path.watch.js}`, `!./src/js/dist/*.min.js`], js)
    gulp.watch(path.watch.images, images)
}

const mainTask = gulp.series (gulp.parallel(html, sass, js,images)) 

// построение сценариев выполнения задач
const dev =  gulp.series(reset, mainTask, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTask, copyFonts, copyCss, copyJs)
const deployZip = gulp.series(reset, mainTask, copyFonts, zip)


//экспорт сценариев
export { dev }
export { build }
export { deployZip }
export { svgSprive } // svg спрайт

export { fonts } // шрифты
export { fontsStyle } // файл шрифтов
export { server } // отдельно сервер (можно запускать dist если указать app.path.build.html)

// создание и встраивание favicon
export { generatFavicon }
export { faviconMarkups }

const favicon = gulp.series(generatFavicon, faviconMarkups)
export {favicon} // экспортируем в сценарий

// сценарий по умолчинию
gulp.task('default', dev)