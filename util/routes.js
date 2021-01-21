const authorRoutes = require('../routes/author');
const userRoutes = require('../routes/user');
const adminRoutes = require('../routes/admin');
const authenticationRoutes = require('../routes/auth');

function define(app) {
    app.use('/author', authorRoutes);
    app.use('/admin', adminRoutes);
    app.use('/auth', authenticationRoutes);
    app.use('/', userRoutes);

    app.use((req, res, next) => {
        res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    });
}


module.exports = {define};