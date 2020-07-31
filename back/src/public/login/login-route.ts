import { UserModel } from '../../models/users/user-model'
import { _secret } from '../../auth';
import { request } from 'express';
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token')
const express = require('express');
const loginRouter = express.Router();
const Bcrypt = require("bcryptjs");


loginRouter.post("/", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username: username }).exec();
        if (!user) {
            res.status(401).json({
                success: false,
                access_token: null,
                err: 'Username or password is incorrect'
            })
        }
        if(!Bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                success: false,
                message: 'Invalid login credentials!'
            });
        }
        let access_token = jwt.sign({ _id: user._id, username: user.username, role: user.role }, _secret, { expiresIn: Date.now() + 250000 });
        const refresh_token = randtoken.uid(256);
         res.json({
            success: true,
            err: null,
            access_token,
            refresh_token,
            expiresAt: new Date(Date.now() + 250000)
        });
        
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = loginRouter;
