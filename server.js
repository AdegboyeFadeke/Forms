const express = require('express');
const bodyParser = require('body-parser')

// create express app
const app = express();

//parse request of content-type - application/ x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

//parse requests of content-type -application/json
app.use(express.json())

//configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connecting to database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true

}).then(() => {
    console.log("Successfully connected to the database");

}).catch(err => {
    console.log('could not connect to the database. Exiting now......', err);
    process.exit();
});

//define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to your Forms application. Take this template and make the form yours." })
})
//...........

// require form routes
require('./app/routes/form.route.js')(app);

//.........

//listen for requests
app.listen(3031, () => {
    console.log("Server is listening on port 3031");
});