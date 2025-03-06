
const nanoid = require('shortid');

const urlmodel = require('../models/url');
const shortid = require('shortid');


async function GenerateshortURL(request, response){
    const body = request.body;
    if(!body.url){
        response.status(400).json({msg : "Please enter the url"});
    }
    const Idshort = nanoid();
    await urlmodel.create({
        shortId:Idshort,
        redirectURL: body.url,
        visithistory: []
    })
    response.json({id : Idshort});

}

async function HandleRedirect(request, response){
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
}

async function GetAnalytics(request, response){
 const shortId = request.params.shortId;
  const siteobject = await urlmodel.findOne({
    shortId,
  })
  response.json({ clicks : siteobject.visithistory.length});
}

module.exports = {
    GenerateshortURL,
    HandleRedirect,
    GetAnalytics,
}