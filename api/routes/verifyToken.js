const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    if(authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
            if(err) return res.status(403).json("Invalid token!"+token);

            req.user = userData;
            next();
        });
        
    } else {
        return res.status(401).json("Authentication error");
    }
};


const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("Access denied!");
        }
    });
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).json("Access denied!");
        }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAuth,
    verifyTokenAndAdmin
};