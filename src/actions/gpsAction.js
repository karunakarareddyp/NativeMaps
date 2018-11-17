import { FETCH_NAME, FETCH_NAV_DETAILS, RESET } from '../constants';

export const getName = ()=> (dispatch) => {
    dispatch({type:FETCH_NAME, payload: 'Karna'});
};

export const getNavData = () => (dispatch) => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    // /api/emp/getEmployees
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data);
            dispatch({type:FETCH_NAV_DETAILS, payload: data});
        })
        //.catch(dispatchError);
};

export const reset = () => ({ type: RESET });
