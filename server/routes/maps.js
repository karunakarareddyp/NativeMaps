const express = require('express');

const router = express.Router();

const model = require('../models/Schemas');

router.get('/me', (req, res) => res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
}));

router.get('/getMarkers', (req, res) => {
    model.Markers.aggregate([
        {"$sort": {"pingtime": -1}},
        { "$group": {
                "_id": {
                    "deviceId": "$deviceId",
                },
                "deviceId": { "$first": "$deviceId"},
                "pingtime": { "$first": "$pingtime" },
                "latitude": { "$first": "$latitude"},
                "longitude": { "$first": "$longitude"}
            }
        },
    ], (err, markers) => {
        if (err) res.send(err);
        res.send(markers);
    })
});

router.get('/getAlerts', (req, res) => {
    model.Alerts.find({ }, (err, alerts) => {
        if (err) res.send(err);
        console.log('Tracing Alerts Data =>', alerts);
        res.send(alerts);
    });
});

router.get('/getSearchFilterData', (req, res) => {
    const txt = req.query.filter;
    console.log("Search Query ", txt);
    model.Alerts.find({employeeId: new RegExp(txt, 'i')}, (err, alerts) => { // i - indicates case in-sensitive
        if (err) res.send(err);
        console.log('Filter Data =>', alerts);
        res.send(alerts);
    });
});

router.get('/getZones', (req, res) => {
    const onlyFirstRecord = req.query.firstRecord;
    model.Zones.find({}, (error, zones) => {
        if (error) res.send(error);
        console.log('Zones  =>', zones);
        let op = zones;
        if(onlyFirstRecord && zones && zones.length) {
            op = [zones[0]]
        }
        res.send(op);
    });

});

router.post('/storeZoneInfo', (req, res) => {
    const zoneName = req.body.zoneName;
    const coordinates = req.body.coordinates;
    console.log("Request Body =>", req.body);
    const points = coordinates.map((point) => [point.latitude, point.longitude]);
    const zoneData = new model.Zones({
        _id: Math.floor(Math.random()*1000000),
        name: zoneName,
        plainPoints:JSON.stringify(points),
        color: "green"
    });
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

/*
Below code is useful when data required from multiple collections base on Unique key.

router.get('/getZones', (req, res) => {
    const name = req.query.name;
    console.log("name ", name);
    model.Users.find({firstName: name}, (err, users) => {
        if (err) res.send(err);
        console.log('Users  =>', users);
        if(users && users.length) {
            const {deviceId} = users[0];
            console.log('deviceId ', deviceId);
            model.Zones.find({deviceId: deviceId}, (error, zones) => {
                if (error) res.send(error);
                console.log('Zones  =>', zones);
                res.send(zones);
            });
        }
    });
});
*/