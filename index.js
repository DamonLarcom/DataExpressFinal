const express = require('express');
const routes = require('./routes/routes');
const path = require('path');
const { url } = require('inspector');


const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser('parser'));

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let urlencodedParser = express.urlencoded({
    extended: true
});

app.get('/', routes.welcome);
app.get('/signup', urlencodedParser, routes.signup);
app.get('/login', urlencodedParser, routes.login);
app.get('/login', urlencodedParser, routes.edit);

app.listen(3000);
