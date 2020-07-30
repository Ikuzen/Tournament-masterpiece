import {TournamentModel} from '../../models/tournaments/tournament-model'
import { jwtMW, isTournamentOwner, isAdmin } from '../../auth';

const express = require('express');
const tournamentRouter = express.Router();
const cors = require('cors')
tournamentRouter.use(cors({origin: 'http://localhost:4200'}))
tournamentRouter.use(jwtMW);

tournamentRouter.post("/", async (request, response) => {
    try {
        const user = new TournamentModel(request.body);
        const result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

tournamentRouter.put("/:id", isTournamentOwner, async (request, response) => {
    try {
        const user = await TournamentModel.findById(request.params.id).exec();
        user.set(request.body);
        const result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(404).send(`tournament ${request.params.id}not found`);
    }
});

tournamentRouter.delete("/:id", isTournamentOwner, async (request, response) => {
    try {
        const result = await TournamentModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(404).send(`tournament ${request.params.id}not found`);
    }
});
//DELETE ALL

tournamentRouter.delete("/", isAdmin, async (request, response) => {
    try {
        const result = await TournamentModel.deleteMany().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = tournamentRouter;
