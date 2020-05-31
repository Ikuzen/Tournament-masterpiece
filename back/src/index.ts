import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as uuid from 'uuid';
import { tournament_schema, schemaVerify } from './tournament-service/schema-validator';
import { dbConfig } from './config';
import { DbManager } from './db-manager';
import * as debug from 'debug';
import {Tournament} from './tournament-service/tournament-interface'
const log = debug('tn:express');

const app = express();

const PORT = 3000;
const dbManager = new DbManager(dbConfig);
const tournamentRoute = require('./tournament-service/tournament-route')
app.use(bodyParser.json());
app.use('/',tournamentRoute);
app.get('/', (req, res) => {
    res.send('<h1>tournament API</h1>');
});

app.listen(PORT, () => log('Listening on port', PORT));
