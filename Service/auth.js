// Creating this service that would help us to store the sessionId with the user object.


// we would be storing the ID of the respected user inside the hashmap to maintain the session based user data.

const sessionIDToUserMAP = new Map();

function setUser(id,user){
    sessionIDToUserMAP.set(id,user);
}

function getuser(id){
    return sessionIDToUserMAP.get(id);
}

module.exports = {
    setUser,
    getuser,
}


