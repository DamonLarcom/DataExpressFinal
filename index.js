const express = require('express');
const routes = require('./routes/routes');
const path = require('path');
const { url } = require('inspector');


const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser('parser'));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'pug');
app.use(express.static(path.join(__dirname, 'public')));

let urlencodedParser = express.urlencoded({
    extended: true
});

app.get('/', routes.login);
app.get('/signup', urlencodedParser, routes.signup);
app.get('/edit/:username', urlencodedParser, routes.edit);
app.post('/edit/:username', urlencodedParser, routes.editUser);
app.post('/create', urlencodedParser, routes.createUser);

app.listen(3000);
