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
    req.session.destroy(err => {
        if(err) {
            console.log(err);
        } else {
            console.log('logged out');
            res.redirect('/');
        }
    });
    
}

exports.login = (req, res) => {
    let cookie = req.cookies.login;
    res.cookie('login', `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    res.render('login', {title:'Login', cookie})
}

exports.signup = (req, res) => {
    let cookie =req.cookies.signup
    res.cookie('signup', `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    res.render('signup', {title:'Signup', cookie})
}

//AUTHENTICATE USER, BEGIN SESSION
exports.auth = (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if(user) {
            let matched = bcrypt.compareSync(req.body.password, user.password);
            console.log(matched);
            if(matched) {
                req.session.user = {
                    isAuthenticated: true,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    age: user.age,
                    color: user.color,
                    meal: user.meal,
                    superhero: user.superhero
                }
            }
            console.log(req.session.user)
            res.redirect('/welcome')
        } else {
            console.log("No user found")
            res.redirect('/');
        }
    });
};

exports.welcome = (req, res) => {
    let cookie = req.cookies.welcome
    res.cookie('welcome', `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    res.render('welcome', {title:'Welcome', cookie})
}

exports.createUser = (req, res) => {
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
        console.log(hash);
        console.log(req.body.username + ' created');
    })
    res.redirect('/');
};

exports.edit = (req, res) => {
    let cookie = req.cookies.edit
        res.cookie('edit', `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        res.render('edit', {title:'Edit User', cookie, session: req.session.user})
};

exports.editUser = (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    User.findOneAndUpdate({username: req.body.username},{
        username : req.body.username,
        password : hash,
        email : req.body.email,
        age : req.body.age,
        color : req.body.color,
        meal : req.body.meal,
        superhero : req.body.superhero
    }, (err) => {
        if(err){
            console.log(err);
        } else {
            console.log(req.body.username + ' updated.')
        }
    });
    res.redirect('/');
}

exports.api = (req, res) => {

    let result = User.aggregate([
        {
            $facet: {
                colors: [
                    {
                        $group: {
                            _id: '$color',
                            total: {$sum: 1}
                        }
                    },
                    {$sort: {total: -1}}
                ],
                meals: [
                    {
                        $group: {
                            _id: '$meal',
                            total: {$sum : 1}
                        }
                    },
                    {$sort: {total: -1}}
                ],
                superheroes : [
                    {
                        $group: {
                            _id: '$superhero',
                            total: {$sum: 1}
                        },
                    },
                    {$sort: {total: -1}}
                ]
            }
        }
    ], (err, stuff) =>{ res.json(stuff) });
}


