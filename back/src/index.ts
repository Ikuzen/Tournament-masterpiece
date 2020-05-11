import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as uuid from 'uuid';

const app = express();

const PORT = 3000;

interface Tournament {
    id: string;
    createdAt: Date;
    name: string;
    size: number;
}

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1>fuck you</h1>');
});

const tournaments: Tournament[] = [];

app.post('/tournaments', (req, res) => {
    const body: Tournament = {
        ...(req.body as any),
        id: uuid.v4(),
        createdAt: new Date(),
    };

    if (tournaments.some(({name}) => name === body.name)) {
        res.status(409).send(
            `There already is a tournament with the name "${body.name}"`
        );
    } else {
        tournaments.push(body);
        res.send(body);
    }
});

app.get('/tournaments/:id', (req, res) => {
    const {id} = req.params;
    const tn = tournaments.find(tn => id === tn.id);
    if (!tn) {
        res.status(404).send(`Tournament ${id} Not Found`);
    } else {
        res.send(tn);
    }
});

app.get('/tournaments/', (req, res) => {
    res.send(tournaments);
});

app.listen(PORT, () => console.log('Listening on port', PORT));
