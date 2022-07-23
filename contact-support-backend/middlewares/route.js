const userRoutes = require('../routes/userRoutes');
const supportRoutes = require('../routes/supportRoutes');

module.exports = (app) => {
    app.use('/api/user', userRoutes);
    app.use('/api/support', supportRoutes);
}