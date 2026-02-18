const jwt = require("jsonwebtoken");

module.exports = function(requiredRole){

    return function(req,res,next){

        const token = req.cookies.token;
        if(!token){
            const nextUrl = encodeURIComponent(req.originalUrl);
            return res.redirect(requiredRole === "shop"? `/shop/login?next=${nextUrl}`: `/client/login?next=${nextUrl}`);
        }
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if(decoded.role !== requiredRole){
                return res.redirect("/");
            }

            req.user = {
                id: decoded.id,
                role: decoded.role
            };

            next();

        }catch(err){
            res.clearCookie("token");
            return res.redirect("/client/login");
        }
    }
}
