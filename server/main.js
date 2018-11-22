const app = require('./app')
const port = process.env.PORT || 8079;
const mongoose = require('mongoose');
var config = require('../config/server.conf')

console.log('database:' + config.database)
mongoose.connect(config.database, { useNewUrlParser: true }, (err) => {
    if(err){
        console.error('error in connecting mongodb');
        console.log(err);
        return process.exit(1);
    }
    console.log('database connected');
    app.listen(port, function () {
        console.log(`listening on *:${port}`);
    });
})