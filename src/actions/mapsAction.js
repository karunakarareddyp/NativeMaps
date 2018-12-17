import {
    FETCH_MARKERS_DETAILS,
    FETCH_ZONES,
    FETCH_SEARCH_FILTERS_DATA,
    FETCH_HISTORY_DATA,
    RESET,
} from '../constants';
import {Platform} from 'react-native';

const BASE_URL = (Platform.OS === 'ios') ? 'http://localhost:5000' : 'http://10.0.2.2:5000'; //192.168.1.120


export const fetchZones = (zoneName) => (dispatch) => {
    let url = `${BASE_URL}/api/maps/getZones`;
    if (zoneName) {
        url = `${url}?zoneName=${zoneName}`;
    }
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(resp => resp.json())
        .then((data) => {
            console.log("Data Received Zones =>", data);
            dispatch({type:FETCH_ZONES, payload: data});
        })
        .catch(error => {
            console.error("OOPS unable to fetch zones data.", error);
            const err = {isError: true, error:error };
            dispatch({type:FETCH_ZONES, payload: err});
        });
};

export const removeZone = (zoneName) => (dispatch) => {
    let url = `${BASE_URL}/api/maps/removeZone?zoneName=${zoneName}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data.msg);
            dispatch(fetchZones());
        })
        .catch(error => {
            console.error(`OOPS unable to remove zone ${zoneName}`, error);
        });
};

export const fetchMarkersData = (deviceId) => (dispatch) => {
    //const url = 'https://jsonplaceholder.typicode.com/todos/1';
    let url = `${BASE_URL}/api/maps/getMarkers`;
    if(deviceId) {
        url += '?deviceId='+deviceId;
    }
    console.log('fetchZones => ', url);
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(resp => resp.json())
        .then((data) => {
            console.log("Data Received Markers Data =>", data);
            /*const tmp = Number(Math.random().toFixed(2));
            data[0].latitude = data[0].latitude - tmp;
            data[0].longitude = data[0].longitude - tmp;*/
            dispatch({type:FETCH_MARKERS_DETAILS, markersData: data});
        })
        .catch(error => {
            console.error("OOPS unable to fetch Marhers data.", error);
            const err = {isError: true, error:error };
            dispatch({type:FETCH_MARKERS_DETAILS, payload: err});
        });
};

export const fetchSearchFilterData = (filterText) => (dispatch) => {
    const url = BASE_URL + '/api/maps/getSearchFilterData?filter='+filterText;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(resp => resp.json())
        .then((data) => {
            console.log("Data Received for fetchSearchFilterData =>", data);
            dispatch({type:FETCH_SEARCH_FILTERS_DATA, payload: data});
        })
        .catch(error => {
            console.error("OOPS unable to fetch data.", error);
            const err = {isError: true, error:error };
            dispatch({type:FETCH_SEARCH_FILTERS_DATA, payload: err});
        });
};

export const storeZoneInfo = (zoneName, coordinates, zoneColor) => (dispatch) => {
    const url = BASE_URL + '/api/maps/storeZoneInfo';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          zoneName: zoneName,
          coordinates: coordinates,
          color: zoneColor,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(resp => resp.json())
        .then((data) => {
            console.log("Successfully store zone data =>", data);
            dispatch(fetchZones());
        })
        .catch(error => {
            console.error("OOPS unable to store zone data.", error);
        });
};

export const fetchHistoryData = (deviceId) => (dispatch) => {
    let url = `${BASE_URL}/api/maps/getPolyLineHistory`;
    if(deviceId) {
        url += '?count=1000&deviceId='+ deviceId; //0356823035078075
    }
    console.log("URL =>", url);
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(resp => resp.json())
        .then((data) => {
            console.log("Data Received History Data =>", data);
            dispatch({type:FETCH_HISTORY_DATA, payload: data});
        })
        .catch(error => {
            console.error("OOPS unable to fetch History data.", error);
            const err = {isError: true, error:error };
            dispatch({type:FETCH_HISTORY_DATA, payload: err});
        });
};

/*
export const getCurrentLocation = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition(
      (position) => {
          dispatch({type:GET_CURRENT_POSTITION, payload: position});
      },
      (error) => {
          console.log("Unable to fetch Geo Location.", error);
      },
      {enableHighAccuracy: true, timeout:30000, maximumAge: 1000}
  )
};
 */
export const reset = () => ({ type: RESET });
