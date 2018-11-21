import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import mapsReducer from './reducers/mapsReducer';

const reducer = combineReducers({
    main: mapsReducer,
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
