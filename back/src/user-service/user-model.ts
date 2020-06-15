import {UserSchema} from './user-schema'

const mongoose = require('mongoose');
export const UserModel = mongoose.model("User",UserSchema, 'users')
