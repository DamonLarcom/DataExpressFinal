const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

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
    color: String,
    meal: String,
    superhero: String
});

let User = mongoose.model('User_Collection', userSchema);

exports.logout = (req, res) => {
    res.session.destroy = (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('logged out.')
            res.redirect('/');
        }
    }
}

exports.login = (req, res) => {
    let cookie = req.cookies.login;
    res.cookie('login', `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    res.render('login', {title:'login', cookie})
}

exports.signup = (req, res) => {
    let cookie =req.cookies.signup
    res.cookie('signup', `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    res.render('signup', {title:'signup', cookie})
}

//AUTHENTICATE USER, BEGIN SESSION
exports.auth = (req, res) => {
    User.findById({username: req.body.username}, (err, user) => {
        if(user) {
            bcrypt.compareSync(req.body.password, user.password, (err, matched) => {
                if(matched) {
                    req.session.user = {
                        isAuthenticated : true,
                        username: req.body.username
                    }
                }
            })
        } else {
            console.log("No user found")
            res.redirect('/');
        }
    });
};

exports.createUser = (req, res) => {
    let cookie = req.cookies.welcome
        res.cookie('welcome', `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        res.render('welcome', {title:'welcome', cookie})
    let salt = bcrypt.genSaltSync(10);
    console.log(req.body);
    let hash = bcrypt.hashSync(req.body.password, salt);
    let user = new User({
        username: req.body.username,
        password: hash,
        email : req.body.email,
        age : req.body.age,
        color: req.body.color,
        meal: req.body.meal,
        superhero: req.body.superhero
    });
    user.save((err, user) => {
        if(err) return console.error(err);
        console.log(req.body.username + ' created');
    })
};

exports.edit = (req, res) => {
    let cookie = req.cookies.edit
        res.cookie('edit', `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        res.render('edit', {title:'edit', cookie})
};

exports.editUser = (req, res) => {
    User.findById(req.params.username, (err, user) => {
        if(err) return console.error(err);
        user.username = req.body.username;
        user.password = hash;
        user.email = req.body.email;
        user.age = req.body.age;
        user.color = req.body.color;
        user.meal = req.body.meal;
        user.superhero = req.body.superhero;
        user.save((err, user) => {
          if(err) return console.error(err);
          console.log(req.body.username + ' updated.');
        });
        res.redirect('/');
      })
}


exports.api = (req, res) => {
    User.find({
        mostCommon: {
        color: User.find(),
        meal: User.find(),
        superhero: User.find()
        },
        leastCommon: {
            color: User.find(),
            meal: User.find(),
            superhero: User.find()
        }
}, (err, responses) => {
            res.json(responses)
        })
}


