import { _secret } from "../../auth";

const jwt = require('njwt');

const express = require('express');
const tokenRoute = express.Router();

tokenRoute.get("/verify", async (req, res) => {
  jwt.verify(req.headers.authorization.split(' ')[1], _secret, (err, verifiedJwt) => {
    if (err) {
      res.send(err.userMessage)
    }
    else if (verifiedJwt.body.exp < new Date(Date.now())) {
      res.send(`token expired. Expiration date :${new Date(verifiedJwt.body.exp)}\n current time : ${new Date(Date.now())}`)
    }
    else {
      res.send(verifiedJwt)
    }
  })
});
module.exports = tokenRoute;