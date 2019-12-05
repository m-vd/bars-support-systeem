const express = require('express');
const router = express.Router();

const Role = require('../models/role');
const CriticalIndicator = require('../models/criticalIndicator');

router.get("/", (req, res) => {

    Role.find({}).populate().exec((err, existing_roles) => {
        if (err) {
            console.log(err);
        } else {
            res.render("ciForm", { roles: existing_roles })
        }
    })

})

router.post("/", (req, res) => {
    console.log(req)

    role = req.body.role
    newCI = req.body.newCI


    Role.findOne({ name: role }).populate().exec((err, existing_role) => {
        if (err) {
            console.log(err);
        } else {
            if (!existing_role) {
                var new_role = {
                    name: role
                }
                Role.create(new_role, (err, newlyCreatedRole) => {
                    if (err) {
                        console.log(err);
                    }
                    existing_role = newlyCreatedRole;
                })
            }
            CriticalIndicator.create({ description: newCI }, (err, newlyCreatedCI) => {
                if (err) {
                    console.log(err);
                } else {
                    existing_role.criticalIndicator.push(newlyCreatedCI);
                    existing_role.save()
                }
            })
        }
    })

    res.redirect("/")
})

module.exports = router;
