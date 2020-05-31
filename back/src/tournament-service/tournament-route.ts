import {Router} from "express"
import { Tournament } from "./tournament-interface";
import { schemaVerify } from "./schema-validator";
import * as uuid from 'uuid';
import { DbManager } from '.././db-manager';
import { dbConfig } from '.././config';

const express = require('express');
const tournamentRouter = express.Router();
const dbManager = new DbManager(dbConfig);




let tournaments: Tournament[] = [];
//POST
tournamentRouter.post('/tournaments', async (req, res) => {
    const schemaVerification = schemaVerify(req.body)
    if (schemaVerification.error) {
        return res.status(400).send(schemaVerification.error);
    }

    const tournament: Tournament = {
        ...req.body,
        _id: uuid.v4(),
        createdAt: new Date(),
    };

    try {
        await dbManager.putDocument(tournament);
        return res.send(tournament);
    } catch (e) {
        return res.status(409).send(
            `There already is a tournament with the name "${tournament.name}"`
        )
    }
});
//GET BY ID
tournamentRouter.get('/tournaments/:id', async (req, res) => {
    const { id } = req.params;
    
    const tournament: Tournament = await dbManager.getDocument(id);

    if (!tournament) {
        return res.status(404).send(`Tournament ${id} Not Found`);
    }

    return res.send(tournament);
});
//GET ALL
tournamentRouter.get('/tournaments/', async (req, res) => {
    const tournaments: Tournament[] = await dbManager.listDocuments();
    res.send(tournaments);
});
//DELETE BY ID
tournamentRouter.delete('/tournaments/:id', async(req, res) => {

    const { id } = req.params;
    
    const {deletedCount} = await dbManager.deleteDocument(id);

    if (deletedCount === 0) {
        return res.status(404).send(`Tournament ${id} Not Found`);
    }

    return res.status(204).send();
});
//DELETE ALL
tournamentRouter.delete('/tournaments/', (req, res) => {
    dbManager.deleteAllDocuments();
    return res.status(204).send();
});



//UPDATE BY ID
tournamentRouter.put('/tournaments/:id', async(req, res) => {
    const { id } = req.params;
    let objectToModify = await dbManager.getDocument(id);
    delete objectToModify._id;
    delete objectToModify.createdAt;
    let modifiedObject = Object.assign(objectToModify,req.body);
    const schemaValidation = schemaVerify(modifiedObject)
    
    if(schemaValidation.error){
        return res.status(209).send(`Couldn't update "${req.body.name}`)
    }
    try {
        const update = await dbManager.updateDocument(id, req.body);
        return res.send(update);
        
    } catch (e) {
        return res.status(409).send(
            `Couldn't update "${req.body.name}"`
        )
    }
});


module.exports = tournamentRouter;
