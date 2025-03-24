const {getuser} = require('../Service/auth');

async function RestricttoLoggedInUserOnly(request,response,next){
 
     const useruid = request.cookies?.uid;
     if(!useruid) return response.redirect('/login');

    const user = await getuser(useruid);
    if(!user) return response.redirect('/login');
     request.user = user;
    next();
    
}

module.exports ={
    RestricttoLoggedInUserOnly,
}