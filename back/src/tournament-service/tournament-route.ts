import {TournamentModel} from './tournament-model'

const express = require('express');
const tournamentRouter = express.Router();
const cors = require('cors')
tournamentRouter.use(cors({origin: 'http://localhost:4200'}))
tournamentRouter.post("/", async (request, response) => {
    try {
        const user = new TournamentModel(request.body);
        const result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
tournamentRouter.get("/", async (request, response) => {
    try {
        const result = await TournamentModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(404).send(`tournaments not found`);
    }
});
tournamentRouter.get("/:id", async (request, response) => {
    try {
        const user = await TournamentModel.findById(request.params.id).exec();
        response.send(user);
    } catch (error) {
        response.status(404).send(`tournament ${request.params.id}not found`);
    }
});

tournamentRouter.get("/name/:name", async (request, response) => {
    try {
        const user = await TournamentModel.findOne({name:request.params.name}).exec();
        response.send(user);
    } catch (error) {
        response.status(404).send(`tournament ${request.params.name}not found`);
    }
});

tournamentRouter.get("/name/:name", async (request, response) => {
    try {
        const user = await TournamentModel.find({name: new RegExp(`^${request.params.name}`)}).exec();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

tournamentRouter.put("/:id", async (request, response) => {
    try {
        const user = await TournamentModel.findById(request.params.id).exec();
        user.set(request.body);
        const result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(404).send(`tournament ${request.params.id}not found`);
    }
});

tournamentRouter.delete("/:id", async (request, response) => {
    try {
        const result = await TournamentModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(404).send(`tournament ${request.params.id}not found`);
    }
});

module.exports = tournamentRouter;
