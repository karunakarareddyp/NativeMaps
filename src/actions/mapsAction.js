import {
    GET_CURRENT_POSTITION,
    FETCH_MARKERS_DETAILS,
    FETCH_ZONES,
    FETCH_SEARCH_FILTERS_DATA,
    RESET,
} from '../constants';
const BASE_URL = 'http://localhost:5000'; //192.168.1.120
// const BASE_URL = 'http://10.0.2.2:5000'; //For Android

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

export const fetchZones = (onlyFirstRecord) => (dispatch) => {
    let url = `${BASE_URL}/api/maps/getZones`;
    if(onlyFirstRecord) {
        url = `${url}?firstRecord=${true}`;
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

export const fetchMarkersData = () => (dispatch) => {
    //const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const url = `${BASE_URL}/api/maps/getMarkers`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(resp => resp.json())
        .then((data) => {
            console.log("Data Received from MongoDB =>", data);
            dispatch({type:FETCH_MARKERS_DETAILS, payload: data});
        })
        .catch(error => {
            console.error("OOPS unable to fetch data.", error);
            const err = {isError: true, error:error };
            dispatch({type:FETCH_MARKERS_DETAILS, payload: err});
        });
};

export const fetchSearchFilterData = (filterText) => (dispatch) => {
    //const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const url = BASE_URL + '/api/maps/getSearchFilterData?filter='+filterText;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(resp => resp.json())
        .then((data) => {
            console.log("Data Received from MongoDB =>", data);
            dispatch({type:FETCH_SEARCH_FILTERS_DATA, payload: data});
        })
        .catch(error => {
            console.error("OOPS unable to fetch data.", error);
            const err = {isError: true, error:error };
            dispatch({type:FETCH_SEARCH_FILTERS_DATA, payload: err});
        });
};

export const storeZoneInfo = (zoneName, coordinates) => (dispatch) => {
    //const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const url = BASE_URL + '/api/maps/storeZoneInfo';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          zoneName: zoneName,
          coordinates: coordinates
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(resp => resp.json())
        .then((data) => {
            console.log("Successfully store zone data =>", data);
        })
        .catch(error => {
            console.error("OOPS unable to store zone data.", error);
            const err = {isError: true, error:error };
            // dispatch({type:STORE_ZONE_DATA, payload: err});
        });
};

export const reset = () => ({ type: RESET });
