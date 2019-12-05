const mongoose = require('mongoose')

const criticalIndicatorSchema = new mongoose.Schema({
    description: String,
    performanceDimension: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PerformanceDimension"
    }]
});

module.exports = mongoose.model("criticalIndicator", criticalIndicatorSchema); 
