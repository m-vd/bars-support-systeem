const mongoose = require('mongoose');

const performanceAppraisal = new mongoose.Schema({
    role: String,
    appraisal : [{
        criticalIndicator : String,
        performanceDimension : [{
            description: String,
            scale: Number
        }]
    }]

});

module.exports = mongoose.model("PerformanceAppraisal", performanceAppraisal); 
