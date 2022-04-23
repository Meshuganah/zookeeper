const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//Parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
//Parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
//Middleware making the front end JS and CSS files available
app.use(express.static('public'));

const { animals } = require('./data/animals');

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});