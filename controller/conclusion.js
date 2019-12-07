const express = require('express');
const router = express.Router();
const math = require('mathjs');

const Role = require('../models/role');
const PerformanceAppraisal = require('../models/performanceAppraisal');


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
                // Delete all Performance Appraisal entry
                PerformanceAppraisal.deleteMany({})
                    .then(() => {
                        
                        for (let i = 0; i < allRoles.length; i++){
                            role = allRoles[i];
                            a = []
                            //role.criticalIndicator.forEach
                            for (let j = 0; j < role.criticalIndicator.length; j++){
                                criticalIndicator = role.criticalIndicator[j];
                                pd = []
                                //criticalIndicator.performanceDimension.forEach
                                for (let k = 0; k < criticalIndicator.performanceDimension.length; k++){
                                    currentElement = criticalIndicator.performanceDimension[k]
                                    if (currentElement.arrayOfScale.length > 0){
                                        value = math.round(math.std(currentElement.arrayOfScale), 3)
                                        if (value < 1.5) {
                                            let toBeAdded = {
                                                description: currentElement.description,
                                                scale: math.round(math.mean(currentElement.arrayOfScale), 2)
                                            }
                                            
                                            pd.push(toBeAdded)
                                        }
                                    }
                                }

                                pd.sort((a,b) => (a.scale < b.scale) ? 1 : -1)

                                if (pd.length > 0) {
                                    appraisalToBeAdded = {
                                        criticalIndicator : criticalIndicator.description,
                                        performanceDimension: pd
                                    }
                                }
                                a.push(appraisalToBeAdded)
                            }
        
                            PerformanceAppraisal.create({ role: role.name, appraisal: a })
                                .then(() => {
                                    // do nothing
                                }, (err) => {
                                    console.log(err);
                                })
                        }
                    }, (err) => {
                        console.log(err);
                    }
                )
            }
        })

    PerformanceAppraisal.find({}, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.render('conclusion', { all: found })
        }
    })

})


module.exports = router;
