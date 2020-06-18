import {UserModel} from './user-model'
import {jwtMW} from '../secret'
const exjwt = require('express-jwt');

const express = require('express');
const cors = require('cors')
const userRouter = express.Router();
userRouter.use(cors({origin: 'http://localhost:4200'}))

userRouter.post("/", async (request, response) => {
    try {
        const user = new UserModel(request.body);
        const result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
userRouter.get("/", async (request, response) => {
    try {
        const result = await UserModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(404).send(`users not found`);
    }
});
userRouter.get("/:id", async (request, response) => {
    try {
        const user = await UserModel.findById(request.params.id).exec();
        response.send(user);
    } catch (error) {
        response.status(404).send(`user ${request.params.id}not found`);
    }
});

userRouter.get("/username/:username", async (request, response) => {
    try {
        const user = await UserModel.findById(request.params.id).exec();
        response.send(user);
    } catch (error) {
        response.status(404).send(`user ${request.params.username}not found`);
    }
});
//GET by username
userRouter.get("/username/:username", async (request, response) => {
    try {
        const user = await UserModel.find({ username: new RegExp(`^${request.params.username}`) }).exec();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

userRouter.put("/:id", async (request, response) => {
    try {
        const user = await UserModel.findById(request.params.id).exec();
        user.set(request.body);
        const result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(404).send(`user ${request.params.id}not found`);
    }
});

userRouter.delete("/:id", 
    async (request, response) => {
    try {
        const result = await UserModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(404).send(`tournament ${request.params.id}not found`);
    }
});

userRouter.delete("/", async (request, response) => {
    try {
        const result = await UserModel.deleteMany().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = userRouter;
