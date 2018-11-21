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

const Maps = mongoose.model('alerts', AlertsSchema);
/*
navigator.geolocation.getCurrentPosition(karna);
function karna(position){console.log(position.coords.latitude);}
 */
module.exports = Maps;
