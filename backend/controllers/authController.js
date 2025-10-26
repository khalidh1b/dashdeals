const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;

exports.getJwtToken = (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });    
    res.send({ token });
};