const jwt = require('jsonwebtoken')
const secret="Sparsh@123"

function setUser(User){
    return jwt.sign({
        _id: User._id,
        email: User.email,
    },
    secret
    );
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify( token,secret )
    } catch (error) {
       return null; 
    }
    
}

module.exports={
    setUser,
    getUser
};