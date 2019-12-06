const express = require('express');
const router = express.Router();

const Role = require('../models/role');
const CriticalIndicator = require('../models/criticalIndicator');

router.get("/", (req, res) => {

    Role.find({}, (err, foundRoles) => {
        if (err) {
            console.log(err);
        } else {
            res.render("ciForm", { roles: foundRoles })
        }
    })

})

router.post("/", (req, res) => {
    role = req.body.role
    newCI = req.body.newCI

    Role.findOne({ name: role }, (err, foundRole) => {
        if (err) {
            console.log(err);
        } else {
            if (!foundRole) {
                var new_role = {
                    name: role
                }
                Role.create(new_role, (err, newlyCreatedRole) => {
                    if (err) {
                        console.log(err);
                    }
                    foundRole = newlyCreatedRole;
                })
            }
            CriticalIndicator.create({ description: newCI }, (err, newlyCreatedCI) => {
                if (err) {
                    console.log(err);
                } else {
                    foundRole.criticalIndicator.push(newlyCreatedCI);
                    foundRole.save()
                }
            })
        }
    })

    res.redirect("/")
})

module.exports = router;
