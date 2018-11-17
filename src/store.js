import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import gpsReducer from './reducers/gpsReducer';

const reducer = combineReducers({
    main: gpsReducer,
});

const getStore = (initialState = {}) => {
    const store = createStore(
        reducer,
        initialState,
        compose(applyMiddleware(thunk))
    );

    return store;
};

export default getStore;
