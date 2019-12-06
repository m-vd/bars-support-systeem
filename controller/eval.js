const express = require('express');
const router = express.Router();

const Role = require('../models/role');
const CriticalIndicator = require('../models/criticalIndicator');
const PerformanceDimension = require('../models/performanceDimension');


router.get("/", (req, res) => {
    Role.find({})
        .populate({
            path: 'criticalIndicator',
            model: 'CriticalIndicator',
            populate: {
                path: 'performanceDimension',
                model: 'PerformanceDimension'
            }
        }).exec((err, allRoles) => {
            if (err) {
                console.log(err);
            } else {
                console.log(allRoles);
                res.render('evaluate', { all: allRoles });
            }
        })
})

module.exports = router;
