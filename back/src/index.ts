import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as uuid from 'uuid';
import {tournament_schema} from './schema-validator'
const app = express();

const PORT = 3000;

interface Tournament {
    id: string;
    createdAt: Date;
    name: string;
    size: number;
}

app.use(bodyParser.json());

function schemaVerify(tournament: Tournament): any{
    return tournament_schema.validate(tournament);
}
//Requests
app.get('/', (req, res) => {
    res.send('<h1>fuck you</h1>');
});

let tournaments: Tournament[] = [];
// let Tournaments = new Map<string,Tournament();
//POST
app.post('/tournaments', (req, res) => {
    const body: Tournament = {
        name:req.body.name,
        size:req.body.size,
        id: uuid.v4(),
        createdAt: new Date(),
    };
    const schemaVerification = schemaVerify(body)
    if(schemaVerification.error){
        res.send(schemaVerification.error);
    }
    else
    {    
        if(body.name.length >20 || body.name.length < 3){
            res.status(409).send(
                `tournament name must be between 3 and 20 characters`
            );
        }
        if(typeof body.size !== "number"){
            res.status(409).send(
                `size must be a number`
            );
        }
        if (tournaments.some(({name}) => name === body.name)) {
            res.status(409).send(
                `There already is a tournament with the name "${body.name}"`
            );
        } else {
            tournaments.push(body);
            res.send(body);
        }
    }
});
//GET BY ID
app.get('/tournaments/:id', (req, res) => {
    const {id} = req.params;
    const tn = tournaments.find(tn => id === tn.id);
    if (!tn) {
        res.status(404).send(`Tournament ${id} Not Found`);
    } else {
        res.send(tn);
    }
});
//GET ALL
app.get('/tournaments/', (req, res) => {
    res.send(tournaments);
});
//DELETE BY ID
app.delete('/tournaments/:id', (req,res)=>{
  const {id} = req.params;
  const tn = tournaments.find(tn => id ===tn.id);
  if(!tn) {
    res.status(404).send(`Tournament ${id} Not Found`);
  }
  else{
      tournaments = tournaments.filter((tournament) => tournament != tn)
      res.send(true)
  }
});

//UPDATE BY ID
app.put('/tournaments/:id', (req,res)=>{
    const body: Tournament = {
        ...(req.body as any),
        id: uuid.v4(),
        createdAt: new Date(),
    };
    const {id} = req.params;
    const tn = tournaments.find(tn => id ===tn.id);
    if(!tn) {
        res.status(404).send(`Tournament ${id} Not Found`);
    }
    else{
        for(let tournament of tournaments){
            if(tournament.id === tn.id){
                tournament = tn;
            }
        }
        res.send(true);
    }
});

app.listen(PORT, () => console.log('Listening on port', PORT));
