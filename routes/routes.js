const mongoose = require('mongoose');
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

exports.login = (req, res) => {

}

exports.signup = (req, res) => {

}

exports.createUser = (req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password,
        email : req.body.email,
        age : req.body.age,
        q1Ans: req.body.q1Ans,
        q2Ans: req.body.q2Ans,
        q3Ans: req.body.q3Ans
    });
    user.save((err, user) => {
        if(err) return console.error(err);
        console.log(req.body.username + ' created');
    })
};

exports.editUser = (req, res) => {
    User.findById(req.params.username, (err, user) => {
        if(err) return console.error(err);
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.age = req.body.age;
        user.q1Ans = req.body.q1Ans;
        user.q2Ans = req.body.q2Ans;
        user.q3Ans = req.body.q3Ans;
        user.save((err, user) => {
          if(err) return console.error(err);
          console.log(req.body.username + ' updated.');
        });
        res.redirect('/');
      })
}
