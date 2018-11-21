import {GET_CURRENT_POSTITION, FETCH_MARKERS_DETAILS, RESET, FETCH_SEARCH_FILTERS_DATA} from '../constants';

const initialState = {
    geoPosition: {},
    navData: [],
    searchFilterData: []
};

const ACTION_HANDLERS = {
    [GET_CURRENT_POSTITION]: (state, action) => ({
        ...state,
        geoPosition: action.payload
    }),
    [FETCH_MARKERS_DETAILS]: (state, action) => ({
        ...state,
        navData: action.payload
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
