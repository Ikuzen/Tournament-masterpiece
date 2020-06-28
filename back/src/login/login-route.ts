import { UserModel } from '../user-service/user-model'
import { _secret } from '../secret';
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token') 
const express = require('express');
const loginRouter = express.Router();


loginRouter.post("/", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({username:username, password:password}).exec();
        if (user) {
            let access_token = jwt.sign({ _id: user._id, username: user.username, role: user.role }, _secret, { expiresIn: Date.now()+250000 }); 
            const refresh_token = randtoken.uid(256);
            res.json({
                success: true,
                err: null,
                access_token,
                refresh_token,
                expiresAt: new Date(Date.now()+250000)


            });
        }
        else {
             res.status(401).json({
                success: false,
                access_token: null,
                err: 'Username or password is incorrect'
            });
        }
    
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = loginRouter;
