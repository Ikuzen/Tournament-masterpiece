import { TournamentModel } from '../../models/tournaments/tournament-model'
const mongoosePaginate = require('mongoose-paginate-v2');

const express = require('express');
const tournamentRouter = express.Router();
const cors = require('cors')
tournamentRouter.use(cors({ origin: 'http://localhost:4200' }))

tournamentRouter.get("/", async (request, response) => {
    try {
        let paginationQuery, tournamentQuery;
        if (!request.query.limit && !request.query.page) {
            paginationQuery = {
                limit: 10,
                page: 1
            }
        } else {
            paginationQuery = {
                limit: request.query.limit,
                page: request.query.page
            }
        }
        tournamentQuery = request.query;
        delete tournamentQuery.page;
        delete tournamentQuery.limit;
        if(!tournamentQuery){
            tournamentQuery = undefined
        }        

        const tournaments = await TournamentModel.paginate(tournamentQuery, { paginationQuery }, 10, function (error, pageCount, paginatedResults) {
            if (error) {
                response.status(404).send(error);
            }
        })
        response.send(tournaments);
    } catch (error) {
        response.status(404).send(`tournaments not found`);
    }
});
tournamentRouter.get("/:id", async (request, response) => {
    try {
        const tournament = await TournamentModel.findById(request.params.id).exec();
        response.send(tournament);
    } catch (error) {
        response.status(404).send(`tournament ${request.params.id} not found`);
    }
});

tournamentRouter.get("/name/:name", async (request, response) => {
    try {
        const tournament = await TournamentModel.findOne({ name: request.params.name }).exec();
        response.send(tournament);
    } catch (error) {
        response.status(404).send(`tournament ${request.params.name} not found`);
    }
});
tournamentRouter.get("/other/games", async (request, response) => {
    try {
        let games = await TournamentModel.find().select('game').exec();
        games = [... new Set(games.map(data => data.game))] // filter to unique game
        games = games.filter(game => game !== 'NA')
        response.send(games);
    } catch (error) {
        response.status(404).send(`games not found`);
    }
});

// tournamentRouter.get("/name/:name", async (request, response) => {
//     try {
//         const tournament = await TournamentModel.find({name: new RegExp(`^${request.params.name}`)}).exec();
//         response.send(tournament);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

module.exports = tournamentRouter;
