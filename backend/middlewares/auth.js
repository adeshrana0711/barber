const jwt = require("jsonwebtoken");

module.exports = function(role){

    return function(req,res,next){
        const token = req.cookies.token;
        if(!token) return res.status(401).send("Login required");

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if(decoded.role !== role)
                return res.status(403).send("Access denied");

            req.user = {
                id: decoded.id,
                role: decoded.role
            };

            next();

        }catch(err){
            res.status(401).send("Invalid token");
        }
    }
}
