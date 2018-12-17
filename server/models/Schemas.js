const mongoose = require('mongoose');

const { Schema } = mongoose;

const MarkersSchema = new Schema({
    _id: Object,
    deviceId: String,
    latitude: Number,
    longitude: Number,
    pingTime: Date,
});
const Markers = mongoose.model('idcarddatanews', MarkersSchema);

const ZonesSchema = new Schema({
    _id: Number,
    name: String,
    color: String,
    deviceId: String,
    points: String,
    plainPoints: String,
});
const Zones = mongoose.model('zones', ZonesSchema);

const UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    userId: String,
    deviceId: String,
    zones: [
        { type: mongoose.Schema.ObjectId, ref: 'zones' }
    ]
});
const Users = mongoose.model('users', UsersSchema);

const AlertsSchema = new Schema({
    deviceId: String,
    latitude: Number,
    longitude: Number,
    message: String,
});
const Alerts = mongoose.model('alerts', AlertsSchema);

module.exports = {
    Zones: Zones,
    Markers: Markers,
    Alerts: Alerts,
    Users: Users
};
