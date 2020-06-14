import * as express from 'express';
import * as debug from 'debug';
import * as config from './config'
import {options} from './swagger/swagger-generator'
const log = debug('tn:express');
const app = express();
const PORT = 3000;
const BodyParser = require("body-parser");

//services import
const userRoute = require('./user-service/user-route')
const tournamentRoute = require('./tournament-service/tournament-route')

//swagger import
const swaggerRoute = require('./swagger/swagger-route')
// const expressSwagger = require('express-swagger-generator')(app);
// expressSwagger(options)


const mongoose = require('mongoose');
mongoose.connect(config.uri+'TournamentDB');

const db = mongoose.connection

app.use('/api-docs', swaggerRoute.swaggerUi.serve, swaggerRoute.swaggerUi.setup(swaggerRoute.swaggerDocument));


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
