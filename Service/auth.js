// Creating this service that would help us to store the sessionId with the user object.


// we would be storing the ID of the respected user inside the hashmap to maintain the session based user data.


const jwt = require('jsonwebtoken');
const secret = "Fenil09"
function setUser(user){
  const payload= {
    _id: user._id,
    email : user.email,
  }
  return jwt.sign(payload,secret);
}

function getuser(token){
    return jwt.verify(token,secret);
}

module.exports = {
    setUser,
    getuser,
}


