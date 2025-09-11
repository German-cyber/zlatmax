import replace from "gulp-replace" // плагин для замены
import browsersync from "browser-sync" // плагин для сервера
import concat from 'gulp-concat' // обьеденение и переименовывание
import newer from 'gulp-newer' // проверяет действительно ли произошло обновлений
import ifPlugins from "gulp-if" // плагин для условий
import {deleteAsync} from "del" // плагин удаления файлов
import notify  from "gulp-notify" // плагин для уведомлений
import htmlmin from "gulp-htmlmin"; // сжатие html

export const plugins = {
    replace: replace,
    browsersync: browsersync,
    concat: concat,
    newer: newer,
    if: ifPlugins,
    delete: deleteAsync,
    notify: notify,
    htmlmin: htmlmin,
}