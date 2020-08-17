import {TournamentModel} from '../../models/tournaments/tournament-model'
import { jwtMW, isTournamentOwner, isAdmin, isLoggedIn, getUserFromToken } from '../../auth';

const express = require('express');
const tournamentRouter = express.Router();
const cors = require('cors')
tournamentRouter.use(cors({origin: 'http://localhost:4200'}))
tournamentRouter.use(jwtMW);

tournamentRouter.post("/", isLoggedIn, async (request, response) => {
    try {
        let  token = request.headers.authorization?.split(' ')[1];
        const user = getUserFromToken(token);
        if(request.body?.organizer?.username !== user.username && request.body?.organizer?._id !== user._id){
            response.status(500).send('organizer must be the same as the tournament creator')
        }
        const tournament = new TournamentModel(request.body);
        const result = await tournament.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

tournamentRouter.put("/:id", isTournamentOwner, async (request, response) => {
    try {
        const tournament = await TournamentModel.findById(request.params.id).exec();
        tournament.set(request.body);
        const result = await tournament.save();
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
