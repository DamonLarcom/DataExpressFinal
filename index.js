const express = require('express');
const routes = require('./routes/routes');
const path = require('path');
const { url } = require('inspector');
const expressSession = require('express-session');


const app = express();
const cookieParser = require('cookie-parser');
const { userInfo } = require('os');
app.use(cookieParser('parser'));
app.use(expressSession({
    secret: 'IW3bDeV',
    saveUninitialized: true,
    resave: true
}))



app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'pug');
app.use(express.static(path.join(__dirname, 'public')));

const getAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

let urlencodedParser = express.urlencoded({
    extended: true
});

app.get('/', routes.login);
app.post('/', urlencodedParser, routes.auth);
app.get('/welcome', getAuth, routes.welcome);
app.get('/signup', urlencodedParser, routes.signup);
app.get('/edit', urlencodedParser, routes.edit);
app.post('/edit', urlencodedParser, routes.editUser);
app.post('/create', urlencodedParser, routes.createUser);

app.get('/api', routes.api);
app.post('/api', urlencodedParser, routes.createUser);

app.get('/logout', routes.logout);

app.listen(3000);
