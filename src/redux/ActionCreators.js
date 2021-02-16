import * as ActionTypes from "./ActionTypes";
import { CAMPSITES } from '../shared/campsites';

//The * lets us import all the named exports from the ActionTypes.js file all at once
//Next we are creating an action cretor function addComment. We need to apss in all the values that are needed for the comment.
//We will set this action creatotr function as an arrow functions which returns an object with the properties: type and payload. Type will be set to ActionTypes(which included all actions) we imported above and then we specify which action exactly by .ADD_COMMENT
//Next we will be using redux thunk to perform async request to the server but since we are not pulling any data from any server for this app, we will be simulating a delay by adding setTimeOut function. After that delay we'll add the campsites data to the state.
//We are importing the campsites data temporarely so we can include it in our server simulation
//Next we are adding an action creator-fetchCampsites and we are using the redux thunk syntax. We are wrapping the function in another function and redux thunk lets us pass the store's dispatch method into the inner function.
//Then we can use the dispatch method inside the inner function to dispatch different action - campsitesLoading.
//Then we are using setTimeout to simulate brief delay of 2000ms. After that delay, we are dispatching another action-addCampsites along with the data from the campsites array.
//The next action creator we are adding-campsitesLoading is a standard action creator, it is not using redux thunk. It will return just an object. We are not adding a payload, just a type. Since this action creator is not thunked it will not be delayed and it will go straight to the reducer.
//When the fetchCampsites action is dispatch, that will dispatch the campsitesLoading action as well.
//The next action creator is campsitesFailed. We will pass an error message into this function
//The next action creator will be addCampsites.

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});

export const fetchCampsites = () => dispatch => {
    dispatch(campsitesLoading());

    setTimeout(() => {
        dispatch(addCampsites(CAMPSITES));
    }, 2000);
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});