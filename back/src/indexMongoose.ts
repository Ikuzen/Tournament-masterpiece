// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});


const dbConfig = {
    mongodbUrl: 'mongodb://localhost:27017',
    dbName: 'TournamentDB',
    collectionName: 'Kitten',
}
var kittySchema = new mongoose.Schema({
    name: String
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({ name: '' });
var fluffy = new Kitten({ name: 'fluffy' });


Kitten.find({ name: /^flu/ }, function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens)
})
