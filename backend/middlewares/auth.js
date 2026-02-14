const jwt = require('jsonwebtoken');

function auth(role){
    return function(req,res,next){

        const token = req.cookies.token;

        if(!token){
            return res.redirect(`/${role}/login?redirect=` + req.originalUrl);
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");

            if(role && decoded.role !== role){
                return res.redirect(`/${decoded.role}/dashboard`);
            }

            req.user = decoded;
            next();

        }catch(error){
            return res.redirect(`/${role}/login?redirect=` + req.originalUrl);
        }
    };
}

module.exports = auth;
