const mongoose = require('mongoose');
const usermodel = require('../models/users');
var verifyId ="";
const {v4:uuidv4} = require('uuid');
const AuthService = require('../Service/auth');

 function rendersignup(request,response){
    return response.render('signup');
 }

 function renderlogin(request,response){
    return response.render('login');
 }



async function handleSignUp(request, response){
    const {email, password}= request.body;
    await usermodel.create({
        email,
        password,
    });
    return response.render('home');

}

async function handlelogin(request,response){
    const {email,password} = request.body;
    const user =await usermodel.findOne({email,password});
    if(!user){
        response.render('login')
    }
    else{
        const sessionID = uuidv4();
        AuthService.setUser(sessionID,user);
        response.cookie("uid",sessionID);
        response.redirect("/");
    }
}

module.exports ={
    handleSignUp,
    rendersignup,
    renderlogin,
    handlelogin,
    verifyId,

}