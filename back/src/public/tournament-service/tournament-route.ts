import {TournamentModel} from '../../models/tournaments/tournament-model'

const express = require('express');
const tournamentRouter = express.Router();
const cors = require('cors')
tournamentRouter.use(cors({origin: 'http://localhost:4200'}))

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

module.exports = tournamentRouter;
