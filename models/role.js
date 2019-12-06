const mongoose = require('mongoose');

const role = new mongoose.Schema({
    name: String,
    criticalIndicator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CriticalIndicator"
    }]
});

module.exports = mongoose.model("Role", role); 
