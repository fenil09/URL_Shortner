const mongoose = require('mongoose');

const urlschema = new mongoose.Schema({

    shortId:{
        type:String,
        required: true,
        unique: true
    },

     redirectURL:{
        type:String,
        required : true,
     },

     visithistory: [{
        timestamp:{ 
            type:Number
        }
     }],
     
},{timestamps: true});

const url = mongoose.model('url', urlschema);
module.exports = url;