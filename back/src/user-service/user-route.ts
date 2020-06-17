import {UserModel} from './user-model'
import {jwtMW} from '../secret'
const exjwt = require('express-jwt');

const express = require('express');
const userRouter = express.Router();

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
        response.status(500).send(error);
    }
});
userRouter.get("/:id", async (request, response) => {
    try {
        const user = await UserModel.findById(request.params.id).exec();
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
        response.status(500).send(error);
    }
});

userRouter.delete("/:id", 
    async (request, response) => {
    try {
        const result = await UserModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = userRouter;
