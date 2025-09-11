export const copyFonts = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/dist/*.*`, { encoding: false })
        .pipe(app.gulp.dest(app.path.build.fonts))
}

export const copyCss = () =>{
    return app.gulp.src(`${app.path.assembly.css}/style.min.css`)
        .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.css) ))
}

export const copyJs = () => {
    return app.gulp.src(`${app.path.assembly.js}/app.min.js`)
        .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.js) ))
}
