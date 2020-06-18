const jwt = require('njwt');

const express = require('express');
const tokenRoute = express.Router();

tokenRoute.get("/verify", async (req, res) => {
    jwt.verify(req.headers.authorization.split(' ')[1], 'kRRorxJyC1pUVDpFldyGz1jRPt8koOyj1xdHF9zxnvht2D1iwOXZDhBQdOKakJOc', (err, verifiedJwt) => {
        if(err){
          res.send(err.message)
        }else{
          res.send(verifiedJwt)
        }
      })
});
module.exports = tokenRoute;