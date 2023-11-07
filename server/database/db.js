// import mongoose from "mongoose"
const mongoose = require('mongoose')


const User = require('../models/user.model')


const connect = async (uri) =>{
    // const uri = 'mongodb://localhost:27017/linkedin';
    try{
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log("database connected successfully")
    }
    catch(err){
        console.log("error while connecting to database : ", err)
    }
}
User.createIndexes({ email: 1 })
  .then(() => {
    console.log('Index created successfully on the "email" field.');
  })
  .catch((error) => {
    console.error('Error creating index:', error);
  });

module.exports = connect

// export default connect