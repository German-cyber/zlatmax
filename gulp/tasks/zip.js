import zipPlugin from "gulp-zip"

export const zip = () => {
    app.plugins.delete(`${app.path.rootFolder}.zip`)
        return app.gulp.src(`${app.path.buildFolder}/**/*.*`,{})
            .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
            .pipe(app.gulp.dest('./'))  
}