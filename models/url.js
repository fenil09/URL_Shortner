const mongoose = require('mongoose');


// Our Schema would be having three main thing first is the shortId which would be acting would be attaching with the original URL to make it small. The second thing would be 
// the Redirect url which would be taking from the users request and the reason to store it is we would be needing it to perform the redirect logic meaning the user should
// be able to visit the original site using the short url as well. The last thing here is the visit history which would be having the detail about our url getting clicked everytime,
// it would be having the timestamp in it showing when was the URL been clicked, along with the date.
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
     
},{timestamps: true}); // => This would be giving us the timestamps when are entire schema is created using the object in mongoDB.

const url = mongoose.model('url', urlschema);
module.exports = url;