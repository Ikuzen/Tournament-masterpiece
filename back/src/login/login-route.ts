import { UserModel } from '../user-service/user-model'

const jwt = require('jsonwebtoken');

const express = require('express');
const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({username:username, password:password}).exec();
        if (user) {
            let token = jwt.sign({ _id: user._id, username: user.username }, "kRRorxJyC1pUVDpFldyGz1jRPt8koOyj1xdHF9zxnvht2D1iwOXZDhBQdOKakJOc", { expiresIn: 250000 }); 
            res.json({
                sucess: true,
                err: null,
                token
            });
        }
        else {
             res.status(401).json({
                sucess: false,
                token: null,
                err: 'Username or password is incorrect'
            });
        }
    
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = loginRouter;
