const jwt = require('njwt');

const express = require('express');
const tokenRoute = express.Router();

tokenRoute.get("/verify", async (req, res) => {
  jwt.verify(req.headers.authorization.split(' ')[1], 'kRRorxJyC1pUVDpFldyGz1jRPt8koOyj1xdHF9zxnvht2D1iwOXZDhBQdOKakJOc', (err, verifiedJwt) => {
    if (err) {
      res.send('invalid token')
    }
    else if (verifiedJwt.body.exp < Date.now()) {
      res.send(`token expired. Expiration date :${new Date(verifiedJwt.body.exp)}\n current time : ${new Date(Date.now())}`)
    }
    else {
      res.send(verifiedJwt)
    }
  })
});
module.exports = tokenRoute;