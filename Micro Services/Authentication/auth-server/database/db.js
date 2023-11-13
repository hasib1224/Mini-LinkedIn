const mongoose = require('mongoose')


const connect = async (uri) => {
    mongoose.connect('mongodb://user_db:27017/user_db', { useNewUrlParser: true, useUnifiedTopology: true, directConnection: true });
    const db = mongoose.connection;

    db.on('error', (err) => {
        console.log(err);
    })

    db.once('open', () => {
        console.log('Connected to user database!');
    })
}



module.exports = connect
