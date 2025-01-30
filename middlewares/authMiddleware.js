const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'forbidden access' });
    }
    
    const token = req.headers.authorization.split(' ')[1];
    const isfirebaseToken = req.headers.firebase;

    if(token && !isfirebaseToken) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: 'forbidden access' });
            }
            req.decoded = decoded;
            next();
        });
    } else if(isfirebaseToken) {
        try {
            const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
            req.user = decodedToken;
            next();
        } catch (error) {
            console.error("Token verification error:", error);
            return res.status(401).send({ message: 'Unauthorized: Invalid token' });
        }
    }
    
};

module.exports = { verifyToken };