const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || "Sparsh@123" // Use environment variable

function setUser(User){
    return jwt.sign({
        _id: User._id,
        email: User.email,
    },
    secret,
    { expiresIn: '24h' } // Add expiration
    );
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify( token, secret )
    } catch (error) {
       return null; 
    }
    
}

module.exports={
    setUser,
    getUser
};