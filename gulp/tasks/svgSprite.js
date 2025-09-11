import svgSprite from "gulp-svg-sprite"

export const svgSprive = () =>{
    return app.gulp.src(app.path.src.svg, {})

    .pipe(svgSprite({
        mode:{
            stack:{
                sprite: '../icons.svg',
                example: true
            }
        }
    }))
    .pipe(app.gulp.dest(app.path.assembly.images))
}