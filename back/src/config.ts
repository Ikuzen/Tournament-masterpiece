
const moongoose = require('mongoose')
export const dbConfigTournament = {
    mongodbUrl: 'mongodb://localhost:27017',
    dbName: 'TournamentDB',
    collectionName: 'Tournament',
    model: moongoose.model('Tournament', new moongoose.Schema({
        name:String,
        size:Number
    }))
}
export const dbConfigUser = {
    mongodbUrl: 'mongodb://localhost:27017',
    dbName: 'TournamentDB',
    collectionName: 'User',
}
