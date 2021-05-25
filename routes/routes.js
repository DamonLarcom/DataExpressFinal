const mongoose = require('mongooose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://Jeremie:Jeremiecius5@finalprojectcluster.o2zvn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology : true,
    useNewUrlParser : true
})

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let db = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: String,
    q1Ans: String,
    q2Ans: String,
    q3Ans: String
});

let User = mongoose.model('User_Collection', userSchema);