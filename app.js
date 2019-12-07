const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const indexRoutes = require('./controller/index');
const ciRoutes = require('./controller/ci');
const pdRoutes = require('./controller/pd');
const evalRoutes = require('./controller/eval');
const resultRoutes = require('./controller/result');
const conclusionRoutes = require('./controller/conclusion');

mongoose.connect(process.env.database_uri || "mongodb://localhost/bars-support-system", { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));

app.use("/", indexRoutes);
app.use("/ci", ciRoutes);
app.use("/pd", pdRoutes);
app.use("/eval", evalRoutes);
app.use("/result", resultRoutes);
app.use("/conclusion", conclusionRoutes);

app.listen(process.env.PORT | 3000, function () {
    console.log('Server starting on port 3000');
})