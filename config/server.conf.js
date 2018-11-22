module.exports = {
    server: process.env.NODE_ENV === 'development' ? '//127.0.0.1:8079' : '',
    database: process.env.Database || 'mongodb://127.0.0.1:27017/casa',
    saltRounds: 10,
}