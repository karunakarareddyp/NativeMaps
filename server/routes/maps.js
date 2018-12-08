const express = require('express');

const router = express.Router();

const model = require('../models/Schemas');

router.get('/me', (req, res) => res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
}));

router.get('/getMapData', (req, res) => {
    model.AlertMarkers.find({ }, (err, alerts) => {
        if (err) res.send(err);
        console.log('Tracing Alerts Data =>', alerts);
        res.send(alerts);
    });
});

router.get('/getSearchFilterData', (req, res) => {
    const txt = req.query.filter;
    console.log("Search Query ", txt);
    model.AlertMarkers.find({employeeId: new RegExp(txt, 'i')}, (err, alerts) => { // i - indicates case in-sensitive
        if (err) res.send(err);
        console.log('Filter Data =>', alerts);
        res.send(alerts);
    });
});


router.post('/storeZoneInfo', (req, res) => {
    const zoneName = req.body.zoneName;
    const coordinates = req.body.coordinates;
    console.log("Request Body =>", req.body);
    const points = coordinates.map((point) => [point.latitude, point.longitude]);
    const zoneData = new model.Zones({_id: Math.floor(Math.random()*1000000), name: zoneName, points:points, color: "green" });
    zoneData.save()
        .then(status => {
            console.log('Inserting Success =>', status);
            res.send(status);
        })
        .catch(err => {
            //res.status(400).send("Unable to save to database", error);
            console.log("Unable to save zone =>", err)
        });

});
module.exports = router;
