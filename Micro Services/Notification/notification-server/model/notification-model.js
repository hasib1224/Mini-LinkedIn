const mongoose = require('mongoose')

const Schema = mongoose.Schema


const notificationSchema = new Schema({

    postId : {
        type : String,
        required : true 
    },
    receiverId :{ 
        type : String,
        required : true
    },
    seen :{
        type : Boolean,
        default : false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;