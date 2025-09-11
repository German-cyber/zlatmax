
export  const server = (done) =>{
    app.plugins.if(app.isBuild,
        app.plugins.browsersync.init({
            server:{
                baseDir: app.path.assembly.html
            },
            notify: false,
            port:3000
        })
    )
}