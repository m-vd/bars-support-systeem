const express = require('express');
const router = express.Router();

const CriticalIndicator = require('../models/criticalIndicator');
const PerformanceDimension = require('../models/performanceDimension')

router.get("/", (req, res) => {
    CriticalIndicator.find({}).populate().exec((err, existingCIs) => {
        if (err) {
            console.log(err);
        } else {
            res.render("pdForm", { cis: existingCIs })
        }
    })
})

router.post("/", (req, res) => {
    ci = req.body.ci;
    newPD = req.body.newPD;

    CriticalIndicator.findOne({ description: ci }).populate().exec((err, existingCI) => {
        if (err) {
            console.log(err)
        } else {
            if (existingCI) {
                var pd = {
                    description: newPD
                }
                PerformanceDimension.create(pd, (err, newlyCreatedPD) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(newlyCreatedPD)
                        existingCI.performanceDimension.push(newlyCreatedPD);
                        existingCI.save();
                    }
                })
            }
        }

    })
    res.redirect("/")
})

router.post("/:id", (req, res) => {
    console.log(req.body)
    PerformanceDimension.findById(req.params.id, (err, foundPD) => {
        if (err) {
            console.log(err);
        } else {
            foundPD.arrayOfScale.push(req.body.scale);
            foundPD.save();
        }
    })
    res.redirect('back')
})


module.exports = router;
