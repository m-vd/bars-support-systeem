const mongoose = require('mongoose')

const performanceDimensionSchema = new mongoose.Schema({
    description: String,
    arrayOfScale: [Number]
});

module.exports = mongoose.model("PerformanceDimension", performanceDimensionSchema); 
