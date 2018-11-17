import { FETCH_NAME, FETCH_NAV_DETAILS, RESET } from '../constants';

const initialState = {
    myName:'',
    navData: undefined,
};

const ACTION_HANDLERS = {
    [FETCH_NAME]: (state, action) => ({
        ...state,
        myName: action.payload
    }),
    [FETCH_NAV_DETAILS]: (state, action) => ({
        ...state,
        navData: action.payload
    }),
    [RESET]: () => (initialState),
};


const gpsReducer = (state = initialState, action) => {
    let handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
};

export default gpsReducer;