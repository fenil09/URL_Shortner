const mongoose = require('mongoose');

const Users = new mongoose.Schema({

    username:{
       type:String,
       require:true,
      
    },
    email:{
       type:String,
       required:true,
       unique:true
    },

    password:{
        type:String,
        requried:true,
        
    }
    
});

const usermodel = mongoose.model("user",Users);
module.exports = usermodel;
