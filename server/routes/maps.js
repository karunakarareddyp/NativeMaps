const express = require('express');

const router = express.Router();

const Maps = require('../models/Maps');

router.get('/me', (req, res) => res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
}));

router.get('/getMapData', (req, res) => {
    Maps.find({ }, (err, alerts) => {
        if (err) res.send(err);
        console.log('Tracing Alerts Data =>', alerts);
        res.send(alerts);
    });
});

router.get('/getSearchFilterData', (req, res) => {
    const txt = req.query.filter;
    console.log("Search Query ", txt);
    Maps.find({employeeId: new RegExp(txt, 'i')}, (err, alerts) => { // i - indicates case in-sensitive
        if (err) res.send(err);
        console.log('Filter Data =>', alerts);
        res.send(alerts);
    });
});
module.exports = router;
