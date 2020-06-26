import * as express from 'express';
import * as debug from 'debug';
import * as config from './config';
import {jwtMW} from './secret'
const userRoute = require('./user-service/user-route')
const tournamentRoute = require('./tournament-service/tournament-route')
const loginRoute = require('./login/login-route')
const tokenRoute = require('./token-route/token-route')
const cors = require('cors')
const mongoose = require('mongoose');
const fs = require('fs')

mongoose.connect(config.uri+'/Tournament-Masterpiece');

const db = mongoose.connection
const log = debug('tn:express');
const app = express();
const PORT = 3000;
const BodyParser = require("body-parser");
export let privateKey:string;
fs.readFile('./keys/private.pem',(err,data)=>{
    privateKey = data;
})


app.use(cors())
app.use(BodyParser.json());
app.use(cors()); 
app.use((jwtMW).unless({path: ['/token','/login', '/user']}));
app.use('/token', tokenRoute)
app.use('/login', loginRoute)
app.use('/user',userRoute)
app.use('/tournament',tournamentRoute)

db.once('open', function () {
    console.log("connected")
});

app.get('/', (req, res) => {
    res.send(`<h1>tournament API</h1>`);
});

app.listen(PORT, () => log('Listening on port', PORT));
