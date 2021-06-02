const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb+srv://Jeremie:Jeremiecius5@finalprojectcluster.o2zvn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology : true,
    useNewUrlParser : true
})

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let mdb = mongoose.connection;
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
    let cookie = req.cookies.welcome
    res.cookie('welcome', `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    res.cookie('signup', `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    res.cookie('login', `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    res.cookie('edit', `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    res.render('welcome', {title:'welcome', cookie})
    res.render('login', {title:'login', cookie})
    res.render('signup', {title:'signup', cookie})
    res.render('edit', {title:'edit', cookie})
}

exports.signup = (req, res) => {
    res.render('signup');
}

exports.createUser = (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    let user = new User({
        username: req.body.username,
        password: hash,
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
        user.password = hash;
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





