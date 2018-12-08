const mongoose = require('mongoose');

const { Schema } = mongoose;

const AlertsSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
});

const AlertMarkers = mongoose.model('alerts', AlertsSchema);

const ZonesSchema = new Schema({
    _id: {
        type: Number
    },
    name: {
        type: String
    },
    color: {
        type: String
    },
    plainPoints: [[]],

});
const Zones = mongoose.model('zones', ZonesSchema);

module.exports = {
    AlertMarkers: AlertMarkers,
    Zones: Zones
};
