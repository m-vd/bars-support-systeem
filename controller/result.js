const express = require('express');
const router = express.Router();
const math = require('mathjs')

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
                res.render('result', { all: allRoles, math: math });
            }
        })
})

module.exports = router;
