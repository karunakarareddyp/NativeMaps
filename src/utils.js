import {Dimensions} from "react-native";

export const getLatLongWithDeltas = (coords) => {
    if(coords) {
        const {latitudeDelta, longitudeDelta} = getLatLongDelta();
        return {
            //center: {lat: -33.8688, lng: 151.2195},
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta
        }
    }
};

const getLatLongDelta = () => {
    const {width, height} = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0922; //3.7922
    const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
    return {latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA};
};

export const getMarkersWithDelta = (points) => {
    let minX, maxX, minY, maxY;

    // init first point
    ((point) => {
        minX = point.latitude;
        maxX = point.latitude;
        minY = point.longitude;
        maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
        minX = Math.min(minX, point.latitude);
        maxX = Math.max(maxX, point.latitude);
        minY = Math.min(minY, point.longitude);
        maxY = Math.max(maxY, point.longitude);
    });

    let midX = (minX + maxX) / 2;
    let midY = (minY + maxY) / 2;
    let deltaX = (maxX - minX) + 0.02;
    let deltaY = (maxY - minY) + 0.02;

    return {
        latitude: midX, longitude: midY,
        latitudeDelta: deltaX, longitudeDelta: deltaY,
    };
};
