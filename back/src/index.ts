import * as express from 'express';
import * as debug from 'debug';
import * as config from './config'
import { initialize } from 'express-openapi';
import v1WorldsService from './api-v1/services/worldService'
const log = debug('tn:express');
const app = express();
const PORT = 3000;
const BodyParser = require("body-parser");

//services import
const userRoute = require('./user-service/user-route')
const tournamentRoute = require('./tournament-service/tournament-route')

//openApi import
initialize({
    app,
    apiDoc: './api-v1/api-doc.yml',
    dependencies: {
        worldsService: v1WorldsService
      },
    paths: './api-v1/paths'
  });


const mongoose = require('mongoose');
mongoose.connect(config.uri+'TournamentDB');

const db = mongoose.connection

app.use(BodyParser.json());
app.use('/user',userRoute)
app.use('/tournament',tournamentRoute)
db.once('open', function () {
    console.log("connected")
});

app.get('/', (req, res) => {
    res.send('<h1>tournament API</h1>');
});

app.listen(PORT, () => log('Listening on port', PORT));
