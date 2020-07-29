import {UserModel} from './user-model'
import {jwtMW, isLoggedIn, isAdmin} from '../secret'
const exjwt = require('express-jwt');

const express = require('express');
const cors = require('cors')
const userRouter = express.Router();
userRouter.use(cors({origin: 'http://localhost:4200'}))

//POST
userRouter.post("/",  async (request, response) => {
    try {
        const user = new UserModel(request.body);
        const result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

//GET all
userRouter.get("/", isLoggedIn, async (request, response) => {
    try {
        const result = await UserModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(404).send(`users not found`);
    }
});

//GET by id

userRouter.get("/:id", isLoggedIn, async (request, response) => {
    try {
        const user = await UserModel.findById(request.params.id).exec();
        response.send(user);
    } catch (error) {
        response.status(404).send(`user ${request.params.id}not found`);
    }
});


//GET by username
userRouter.get("/username/:username", isLoggedIn,  async (request, response) => {
    try {
        const user = await UserModel.find({ username: new RegExp(`^${request.params.username}$`) }).exec();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

//UPDATE by id

userRouter.put("/:id", isLoggedIn, async (request, response) => {
    try {
        const user = await UserModel.findById(request.params.id).exec();
        user.set(request.body);
        const result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(404).send(`user ${request.params.id}not found`);
    }
});
//DELETE by id

userRouter.delete("/:id", isLoggedIn, 
    async (request, response) => {
    try {
        const result = await UserModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(404).send(`tournament ${request.params.id}not found`);
    }
});
//DELETE ALL
userRouter.delete("/", isAdmin, async (request, response) => {
    try {
        const result = await UserModel.deleteMany().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = userRouter;
