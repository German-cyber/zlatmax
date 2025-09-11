export const reset = () =>{
    return app.plugins.delete(app.path.clean)
}