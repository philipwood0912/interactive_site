const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

// set the port
const port = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.engine('.hbs', hbs({extname: '.hbs'}));
app.set('view engine', ".hbs");
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log(`app is running on ${port}`);
})