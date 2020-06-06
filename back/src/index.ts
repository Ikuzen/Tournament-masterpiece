import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as debug from 'debug';
const log = debug('tn:express');
const app = express();
const PORT = 3000;
const tournamentRoute = require('./tournament-service/tournament-route');
const userRoute = require('./user-service/user-route')

app.use(bodyParser.json());
app.use('/',tournamentRoute);
app.use('/',userRoute)
app.get('/', (req, res) => {
    res.send('<h1>tournament API</h1>');
});

app.listen(PORT, () => log('Listening on port', PORT));
