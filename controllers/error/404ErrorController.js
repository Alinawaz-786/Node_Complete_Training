exports.NotFound = (req, res, next) => {
    // Before view engine use
    // res.status(404).sendFile(path.join(rootDir,'views','errors','404.html'))
    // After view engine use
    res.status(404).render('errors/404',
        {
            pageTitle: '404 Error',
            path: 'errors/404'
        });
};