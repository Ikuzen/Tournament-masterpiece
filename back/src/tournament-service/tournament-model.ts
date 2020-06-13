import {TournamentSchema} from './tournament-schema'

const mongoose = require('mongoose');
export const TournamentModel = mongoose.model("Tournament",TournamentSchema, 'tournaments')
