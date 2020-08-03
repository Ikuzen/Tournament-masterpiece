const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const TournamentSchema = new Schema({
    name: { type : String , unique : true },
    size:  { type: Number ,required : true},
    ownerId: { type: String },
    createdAt: {type: Date, default: Date.now},
    participants: [{
        username: {type: String},
        id: {type: String}
    }],
    organizer: {
        username: {type: String},
        id: {type: String}
    }},
{collection:"tournaments"});

TournamentSchema.index({name: 1}, {unique: true}); //unique name restriction
