// import mongoose from "mongoose"
const mongoose = require('mongoose')


// const User = require('../models/user.model')


// const connect = async (uri) =>{
//     // const uri = 'mongodb://localhost:27017/linkedin';
//     try{
//         await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//           });
//           console.log("database connected successfully")
//     }
//     catch(err){
//         console.log("error while connecting to database : ", err)
//     }
// }

const connect = async (uri) => {
    mongoose.connect('mongodb://post_db:27017/post_db', { useNewUrlParser: true, useUnifiedTopology: true, directConnection: true });
    const db = mongoose.connection;

    db.on('error', (err) => {
        console.log(err);
    })

    db.once('open', () => {
        console.log('Connected to post database!');
    })
}


// User.createIndexes({ email: 1 })
//   .then(() => {
//     console.log('Index created successfully on the "email" field.');
//   })
//   .catch((error) => {
//     console.error('Error creating index:', error);
//   });

module.exports = connect

// export default connect