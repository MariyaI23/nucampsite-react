export const ADD_COMMENT = "ADD_COMMENT";
export const CAMPSITES_LOADING = " CAMPSITES_LOADING";
export const CAMPSITES_FAILED = "CAMPSITES_FAILED";
export const ADD_CAMPSITES = "ADD_CAMPSITES";

//The second import is for when we have requested the campsites information but it hasn't loaded yet
//The third import is for when the server request has failed for some reason and the data was not able to be loaded.Then this action will let the redux store know that so the state can update to show an error message
//The forth import is what will be dispatched when the campsites data has been succesfuly retrieved from the server and can be safely added to the state.