
// This constant nanoid is holding the package shortid which would be helping us to create an short ID.
const nanoid = require('shortid');

const urlmodel = require('../models/url');
const helpgettingID = require('../controllers/users');
const usermodel = require('../models/users');
const { default: mongoose } = require('mongoose');

// In this function we would be checking for the url not to be empty if it is not empty then we would be createe a short ID first using the shortid package and then pushing
// the shortID, redirectURL inside mongoDB.
async function GenerateshortURL(request, response){
    const body = request.body;
    if(!body.url){
        response.status(400).json({msg : "Please enter the url"});
    }
    const Idshort = nanoid();
    await urlmodel.create({
        shortId:Idshort,
        redirectURL: body.url,
        visithistory: [],
        createdBy: request.user._id,
    })
    response.render('home',{
      id : Idshort
    });

} 

// This function would be helping us to handle the redirect mechanism, so we would be first getting the shortID from the shorten URL and then would be finding that shortID,
// from the mongodb, once we get that shortID we would be updating the visithistory by entering the timestamp, meaning when was the url like the shorturl accessed. Once this is done
// then we would be getting the original url associated with the shortID and redirecting the user to that original url again.
async function HandleRedirect(request, response){

  try{
    const shortId= request.params.shortId
    const entry = await urlmodel.findOneAndUpdate({
        shortId,
    },{
        $push:{
          visithistory : {
            timestamp : Date.now(),
          }
        }
    });
    response.redirect(entry.redirectURL);
    
  }catch(error){
    console.error("Error in processing your request",error);
    response.status(500).json({error: "Internal Server Error"});
  }
    
}

// This function is quite simple, it is helping us to know how many times the url was clicked which is straight forward because we are just going to return the length
// of the visithistory array which is holding the timestamps which are created when the user sends a request using the new generated short url.
async function GetAnalytics(request, response){
 const shortId = request.params.shortId;
  const siteobject = await urlmodel.findOne({
    shortId,
  })
  response.json({ clicks : siteobject.visithistory.length});
}


  async function handleEJSRendering(req,res){
    const userurl = await urlmodel.find({createdBy: req.user._id});
        return  res.render("home",{
    url:userurl,
   });
  }



module.exports = {
    GenerateshortURL,
    HandleRedirect,
    GetAnalytics,
    handleEJSRendering,
}