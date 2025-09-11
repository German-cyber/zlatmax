// получение имя папки нашего проекта
import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve()) // имя папки проекта (gulp)

const buildFolder = './dist' // путь к папке с результатом
const srcFolder = './src' // папка исходников

// пути 
export const path = {
    build:{
        // папка для выгрузки результата
        html:`${buildFolder}/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/`, 
    },
    assembly:{
        html:`${srcFolder}/`,
        css: `${srcFolder}/css/`,
        js: `${srcFolder}/js/dist`,
        images: `${srcFolder}/img`,
        favicon: `${srcFolder}/img/icon`
    },
    src: {
        // папка исходников 
        // html: `${srcFolder}/html/*.html`, 
        html: `${srcFolder}/html/*.pug`,
        sass: `${srcFolder}/sass/*.scss`,
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img-src/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img-src/**/*.svg`,
        files: `${srcFolder}/files/**/*.*`, // исходники
        // указать расширение и имя картинки для favicon
        favicon: `${srcFolder}/icons.png`,
    },
    watch:{
        // пути для наблюдателя 
        html: `${srcFolder}/**/*.pug`,
        //html: `${srcFolder}/**/*.html`,
        sass: `${srcFolder}/sass/**/*.scss`,
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/img-src/**/*.{jpg,jpeg,png,gif,webp,ico,svg}`,
        files: `${srcFolder}/files/**/*.*`,
    },
    clean: buildFolder, // путь к папке с результатам (перед изменением файлы в ней будут удалятся чтоб избежать ненужных файлов)
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ''
}