const mongoose = require('mongoose')

const performanceDimensionSchema = new mongoose.Schema({
    description: String,
});

module.exports = mongoose.model("performanceDimension", performanceDimensionSchema); 
