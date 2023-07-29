function authenticationMiddleware(req, res, next){
    //get the accessToken
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    //return 403 if accessToken was not provided 
    if (!accessToken) return res.status(403).json({
        message: "Unauthorized"
    });

    //verify if the token is valid
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) res.status(403).json({
            message: "Unauthorized"
        });
        
        //check if the accessToken is in the invalidAccessTokens list
        const InvalidAccessToken = require("../db/invalidAccessTokens.json");
        if (InvalidAccessToken.find(token => token == accessToken)) return res.json({
            message: "Unauthorized"
        })
        
        next();
    })
}