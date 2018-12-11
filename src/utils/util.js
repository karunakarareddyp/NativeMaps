export const getLatLongWithDeltas = (coords) => {
    if(coords) {
        const {latitude, longitude, latitudeDelta, longitudeDelta} = getLatLongDeltaWithPlainArray(coords);
        return {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta
        }
    }
};

const getLatLongDeltaWithPlainArray = (coords) => {
    const x = coords.map(c => c[0]);
    const y = coords.map(c => c[1]);
    return getLatLngWithDeltas(x, y);
};

export const getLatLongDeltaWithObject = (coords) => {
    let x = coords.map(c => c.latitude);
    let y = coords.map(c => c.longitude);
    return getLatLngWithDeltas(x, y);
};

const getLatLngWithDeltas = (x, y) => {
    const minX = Math.min.apply(null, x);
    const maxX = Math.max.apply(null, x);

    const minY = Math.min.apply(null, y);
    const maxY = Math.max.apply(null, y);

    return {
        latitude: (minX + maxX) / 2,
        longitude: (minY + maxY) / 2,
        latitudeDelta: (maxX - minX) + 0.02,
        longitudeDelta: (maxY - minY) + 0.02
    };
};

/*const getLatLongDelta = () => {
    const {width, height} = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.69922; // 0.0922;
    const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
    return {latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA};
};*/

/*export const getMarkersWithDelta = (points) => {
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
};*/

/*
export const getLatLongWithDeltas = (coords) => {
    if(coords) {
        const {latitudeDelta, longitudeDelta} = getLatLongDelta();
        let x = coords.latitude;
        let y = coords.longitude;

        let minX = Math.min.apply(null, x);
        let maxX = Math.max.apply(null, x);

        let minY = Math.min.apply(null, y);
        let maxY = Math.max.apply(null, y);

        return {
            //center: {lat: -33.8688, lng: 151.2195},
            latitude: (minX + maxX) / 2,
            longitude: (minY + maxY) / 2,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta
        }
    }
};
 */