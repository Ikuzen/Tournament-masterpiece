import {Router} from "express"
import { User } from "./user-interface";
import { schemaVerify } from "./schema-validator";
import * as uuid from 'uuid';
import { DbManager } from '.././db-manager';
import { dbConfigUser } from '.././config';

const express = require('express');
const userRouter = express.Router();
const dbManager = new DbManager(dbConfigUser);




let users: User[] = [];
//POST
userRouter.post('/users', async (req, res) => {
    const schemaVerification = schemaVerify(req.body)
    if (schemaVerification.error) {
        return res.status(400).send(schemaVerification.error);
    }

    const user: User = {
        ...req.body,
        _id: uuid.v4(),
        createdAt: new Date(),
    };

    try {
        await dbManager.putDocument(user);
        return res.send(user);
    } catch (e) {
        return res.status(409).send(
            `There already is a user with the username "${user.username}"`
        )
    }
});
//GET BY ID
userRouter.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    
    const user: User = await dbManager.getDocument(id);

    if (!user) {
        return res.status(404).send(`User ${id} Not Found`);
    }

    return res.send(user);
});
//GET BY USERNAME
userRouter.get('/users/username/:username', async(req,res) =>{
    const { username } = req.params;
    const user: User = await dbManager.getDocumentByName(username);

    if (!user) {
        return res.status(404).send(`User ${username} Not Found`);
    }

    return res.send(user);
})
//GET ALL
userRouter.get('/users/', async (req, res) => {
    const users: User[] = await dbManager.listDocuments();
    res.send(users);
});
//DELETE BY ID
userRouter.delete('/user/:id', async(req, res) => {

    const { id } = req.params;
    
    const {deletedCount} = await dbManager.deleteDocument(id);

    if (deletedCount === 0) {
        return res.status(404).send(`User ${id} Not Found`);
    }

    return res.status(204).send();
});
//DELETE ALL
userRouter.delete('/users/', (req, res) => {
    dbManager.deleteAllDocuments();
    return res.status(204).send();
});



//UPDATE BY ID
userRouter.put('/users/:id', async(req, res) => {
    const { id } = req.params;
    const objectToModify = await dbManager.getDocument(id);
    delete objectToModify._id;
    delete objectToModify.register_date;
    const modifiedObject = Object.assign(objectToModify,req.body);
    console.log(modifiedObject)
    const schemaValidation = schemaVerify(modifiedObject)
    
    if(schemaValidation.error){
        return res.status(409).send(`Couldn't update "${req.body.username}`)
    }
    try {
        const update = await dbManager.updateDocument(id, req.body);
        return res.send(update);
        
    } catch (e) {
        return res.status(409).send(
            `Couldn't update "${req.body.username}"`
        )
    }
});


module.exports = userRouter;
