const express = require('express');

const router = express.Router();

const model = require('../models/Schemas');

router.get('/me', (req, res) => res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
}));

router.get('/getMarkers', (req, res) => {
    const deviceId = req.query.deviceId;
    console.log('Device ID ', deviceId);
    model.Markers.aggregate(getMarkersQuery(deviceId), (err, markers) => {
        if (err) res.send(err);
        console.log("Markers =>", markers);
        res.send(markers);
    })
});

router.get('/getAlerts', (req, res) => {
    model.Alerts.find({ }, (err, alerts) => {
        if (err) res.send(err);
        res.send(alerts);
    });
});

router.get('/getSearchFilterData', (req, res) => {
    const txt = req.query.filter;
    console.log("Search Query ", txt);
    const reg = new RegExp(txt, 'i');
    model.Users.find({
        '$or': [
            { 'firstName': reg },
            { 'lastName': reg }
        ]},
        (err, users) => { // i - indicates case in-sensitive
            if (err) res.send(err);
            res.send(users);
        });
});

router.get('/getZones', (req, res) => {
    const {zoneName} = req.query;
    const query = zoneName ? {name: zoneName} : {};
    model.Zones.find(query, (error, zones) => {
        if (error) res.send(error);
        res.send(zones);
    });

});

router.put('/removeZone', (req, res) => {
    const {zoneName} = req.query;
    model.Zones.deleteOne({name: zoneName}, (error) => {
        if (error) res.send(error);
        res.send({msg: `Successfully deleted zone ${zoneName}`});
    })
});

router.post('/storeZoneInfo', (req, res) => {
    const {zoneName, coordinates, color} = req.body;
    console.log("Request Body =>", req.body);
    const points = coordinates.map((point) => [point.latitude, point.longitude]);
    const zoneData = new model.Zones({
        _id: Math.floor(Math.random()*1000000),
        name: zoneName,
        plainPoints:JSON.stringify(points),
        color: color
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

router.get('/getPolyLineHistory', (req, res) => {
    const {top, deviceId} = req.query;
    model.Markers
        .find({deviceId: deviceId})
        .sort({'pingtime': -1})
        .limit(top?top : 100)
        .exec((error, history) => {
            if (error) res.send(error);
            console.log('history  =>', history);
            res.send(history);
        });
});

function getMarkersQuery(deviceId) {
    let query;
    if(deviceId) {
        query = [
            { $sort: {"pingtime": -1}},
            { $match: {"deviceId": deviceId}},
            { $group: {
                    "_id": {
                        "deviceId": "$deviceId",
                    },
                    "deviceId": { "$first": "$deviceId"},
                    "pingtime": { "$first": "$pingtime" },
                    "latitude": { "$first": "$latitude"},
                    "longitude": { "$first": "$longitude"}
                }
            },
            {
                $lookup:
                    {
                        from: "users",
                        localField: "deviceId",
                        foreignField: "deviceId",
                        as: "userDetail"
                    }
            },
            {$match: {details: {$ne: []}}},
        ];
    } else {
        query = [
            { $sort: {"pingtime": -1}},
            { $group: {
                    "_id": {
                        "deviceId": "$deviceId",
                    },
                    "deviceId": { "$first": "$deviceId"},
                    "pingtime": { "$first": "$pingtime" },
                    "latitude": { "$first": "$latitude"},
                    "longitude": { "$first": "$longitude"}
                }
            },
            {
                $lookup:
                    {
                        from: "users",
                        localField: "deviceId",
                        foreignField: "deviceId",
                        as: "userDetail"
                    }
            },
            {$match: {details: {$ne: []}}},
        ];
    }
    return query;
}

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