import * as express from 'express';
import * as debug from 'debug';
import * as config from './config'
const userRoute = require('./user-service/user-route')
const tournamentRoute = require('./tournament-service/tournament-route')

const mongoose = require('mongoose');
mongoose.connect(config.uri+'/TournamentDB');

const db = mongoose.connection
const log = debug('tn:express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const BodyParser = require("body-parser");

app.use(cors())
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
