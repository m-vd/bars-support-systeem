const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const indexRoutes = require('./controller/index');
const ciRoutes = require('./controller/ci');

mongoose.connect(process.env.database_uri || "mongodb://localhost/bars-support-system", { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));

app.use("/", indexRoutes);
app.use("/ci", ciRoutes);

app.listen(3000, function () {
    console.log('Server starting on port 3000');
})