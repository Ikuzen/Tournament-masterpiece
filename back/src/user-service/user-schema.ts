const mongoose = require('mongoose');
const Schema = mongoose.Schema;
export const UserSchema = new Schema({
    username: { type : String ,minlength: [4, 'username must be 4 characters minimum'], maxlength: 12, unique : true },
    email:  { type: String , required : true},
    password: {type: String , required : true },
    birthdate: {type: Date , required : true },
    role:{type: String, default: 'user'},
    register_date: {type: Date, default: Date.now}
},
{collection:"user"});

UserSchema.index({username: 1}, {unique: true}); //unique name restriction

