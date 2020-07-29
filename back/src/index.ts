import * as express from 'express';
import * as debug from 'debug';
import * as config from './config';
import {jwtMW} from './secret'
const userRoutePublic = require('./public/user-service/user-route')
const userRoutePrivate = require('./private/user-service/user-route')
const tournamentRoutePublic = require('./public/tournament-service/tournament-route')
const tournamentRoutePrivate = require('./private/tournament-service/tournament-route')
const loginRoute = require('./public/login/login-route')
const tokenRoute = require('./public/token-route/token-route')
const cors = require('cors')
const mongoose = require('mongoose');
const fs = require('fs')

mongoose.connect(config.uri, {useNewUrlParser:true});

const db = mongoose.connection
const log = debug('tn:express');
const app = express();
const PORT = 3000;
const BodyParser = require("body-parser");
export let privateKey:string;
fs.readFile('./keys/private.pem',(err,data)=>{
    privateKey = data;
})

// const unprotected = [
//     {url: /\/login*/, methods: ['GET', 'PUT', 'POST']},
//     {url: /\/token*/, methods: ['GET', 'PUT', 'POST']},
//     {url: /\/user*/, methods: ['GET', 'PUT', 'POST']}
// ]
app.use(cors())
app.use(BodyParser.json());
app.use(cors()); 
// app.use((jwtMW).unless({path: unprotected}));
app.use('/token', tokenRoute)
app.use('/login', loginRoute)
app.use('/user',userRoutePublic)
app.use('/user',userRoutePrivate)
app.use('/tournament',tournamentRoutePublic)
app.use('/tournament',tournamentRoutePrivate)

db.once('open', function () {
    console.log("connected")
});

app.get('/', (req, res) => {
    res.send(`<h1>tournament API</h1>`);
});

app.listen(PORT, () => log('Listening on port', PORT));
