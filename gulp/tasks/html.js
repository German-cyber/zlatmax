import { plugins } from "../../gulp/config/plugins.js"
import fileInclude from "gulp-file-include"; //для обьеденения html
import versionNumber from "gulp-version-number"; // кеширование
import pug from "gulp-pug"

export const html = () => {
  return (
    app.gulp
      .src(`${app.path.src.html}`)
      // обьеденение html файлов
      // .pipe(fileInclude())

      //pug
      .pipe(pug({
        pretty: true,
        verbose: true
      }))

      // заменяем @img на путь
      .pipe(app.plugins.replace(/@img\//g, "img/"))

      // заменяем @svg на путь
      .pipe(app.plugins.replace(/@svg\//g, "img-src/svg/"))

      // в продакшене изменяем путь файл
      .pipe(app.plugins.if(app.isBuild, app.plugins.replace('/dist', "") ))

      // хешированный ключи (только в режиме продакшена)
      .pipe(
        app.plugins.if(
          app.isBuild,
          versionNumber({
            value: "%DT%",
            append: {
              key: "_v",
              cover: 0,
              to: ["css", "js"],
            },
            output: {
              file: "gulp/version.json",
            },
          })
        )
      )

      // в продакшене сжимаем файл
      .pipe(app.plugins.if(app.isBuild, plugins.htmlmin({ collapseWhitespace: true })))
      .pipe(app.gulp.dest(app.path.assembly.html))
      .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.html) ))
      .pipe(app.plugins.browsersync.stream())
  ); // отвечает за обновления результата
};
