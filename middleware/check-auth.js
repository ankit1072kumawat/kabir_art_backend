const jwt = require('jsonwebtoken');
const secret = require('./../config/db-config')
module.exports = (req,res,next) => {
    // const checkHeaders = req.headers['authorization']
    console.log(req.headers.authorization)
try {
    const decode = jwt.verify(req.headers.authorization, secret.secret);
    req.userData = decode;
    console.log('sdfsdfsdf', req.body.token)
    next();
} catch (error) {
return res.status(401).json({
    message: 'Auth failed.'
});
}
};