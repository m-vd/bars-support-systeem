const express = require('express');
const router = express.Router();

const Role = require('../models/role');


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
                res.render('evaluate', { all: allRoles });
            }
        })
})

module.exports = router;
