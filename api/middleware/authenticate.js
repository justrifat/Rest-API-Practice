const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) =>{
    try{

        //console.log(req.headers)

        const token = req.headers.authorization.split(' ')[1]
        //console.log(token)
        const decode = jwt.verify(token, 'SECRET')

        

        req.user = decode
        next()

    }
    catch(error){
        res.json({
            message: 'Authentication Failed'
        })
    }
}

module.exports = authenticate