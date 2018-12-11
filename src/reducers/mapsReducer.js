import {
    GET_CURRENT_POSTITION,
    FETCH_ZONES,
    FETCH_MARKERS_DETAILS,
    FETCH_SEARCH_FILTERS_DATA,
    RESET,
} from '../constants';

const initialState = {
    geoPosition: {},
    zonesData: [],
    markersData: [],
    searchFilterData: [],
};

const ACTION_HANDLERS = {
    [GET_CURRENT_POSTITION]: (state, action) => ({
        ...state,
        geoPosition: action.payload
    }),
    [FETCH_ZONES]: (state, action) => ({
        ...state,
        zonesData: action.payload
    }),
    [FETCH_MARKERS_DETAILS]: (state, action) => ({
        ...state,
        markersData: action.payload
    }),
    [FETCH_SEARCH_FILTERS_DATA]: (state, action) => ({
        ...state,
        searchFilterData: action.payload
    }),
    [RESET]: () => (initialState),
};


const mapsReducer = (state = initialState, action) => {
    let handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
};

export default mapsReducer;
