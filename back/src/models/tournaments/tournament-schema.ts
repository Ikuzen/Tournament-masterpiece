const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const TournamentSchema = new Schema({
    name: { type : String , unique : true },
    size:  { type: Number ,required : true},
    createdAt: {type: Date, default: Date.now}
},
{collection:"tournaments"});

TournamentSchema.index({name: 1}, {unique: true}); //unique name restriction
