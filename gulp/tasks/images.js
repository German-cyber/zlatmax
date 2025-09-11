import sharpOptimizeImages from 'gulp-sharp-optimize-images'

export async function images(){
    return app.gulp.src(app.path.src.images, { encoding: false, allowEmpty: true })
        .pipe(app.plugins.newer(app.path.assembly.images)) // проверяем на обновления
        .pipe(
            sharpOptimizeImages({
                // оптимизация картинок
                webp: {
                  quality: 50,
                  alsoProcessOriginal: false,
                },
            })
        )
        .pipe(app.gulp.dest(app.path.assembly.images))

        .pipe(app.gulp.src(app.path.src.images, { encoding: false, allowEmpty: true }))
        .pipe(app.plugins.newer(app.path.assembly.images)) // проверяем на обновления
        .pipe(
            sharpOptimizeImages({
                // оптимизация картинок
                avif: {
                  quality: 50,
                  effort: 4,
                },
            })
        )
        .pipe(app.gulp.dest(app.path.assembly.images))

        .pipe(app.gulp.src(app.path.src.images, { encoding: false, allowEmpty: true }))
        .pipe(app.plugins.newer(app.path.assembly.images)) // проверяем на обновления
        .pipe(
            sharpOptimizeImages({
                // оптимизация картинок
                jpg_to_jpg: {
                  quality: 50,
                  mozjpeg: true,
                },
            })
        )
        .pipe(app.gulp.dest(app.path.assembly.images))

        .pipe(app.gulp.src(app.path.src.images, { encoding: false, allowEmpty: true }))
        .pipe(app.plugins.newer(app.path.assembly.images)) // проверяем на обновления
        .pipe(
            sharpOptimizeImages({
                // оптимизация картинок
                png_to_png: {
                  quality: 50,
              }
            })
        )
        .pipe(app.gulp.dest(app.path.assembly.images))


        .pipe(app.gulp.src(app.path.src.images, { encoding: false, allowEmpty: true }))
        .pipe(app.plugins.newer(app.path.assembly.images)) // проверяем на обновления
        .pipe(
            sharpOptimizeImages({
                // оптимизация картинок
                jpeg_to_jpg: {
                  quality: 50,
              }
            })
        )
        .pipe(app.gulp.dest(app.path.assembly.images))

        .pipe(app.gulp.src([
            `${app.path.assembly.images}/**/*.*`,
            `!${app.path.assembly.images}/stack/*`
        ],{ encoding: false }))
        .pipe(app.plugins.if(app.isBuild,
             app.gulp.dest(app.path.build.images)
        ))
}