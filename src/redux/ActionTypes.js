export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const COMMENTS_FAILED = 'COMMENTS_FAILED';

export const ADD_CAMPSITES = "ADD_CAMPSITES";
export const CAMPSITES_LOADING = " CAMPSITES_LOADING";
export const CAMPSITES_FAILED = "CAMPSITES_FAILED";

export const ADD_PROMOTIONS = 'ADD_PROMOTIONS';
export const PROMOTIONS_LOADING = 'PROMOTIONS_LOADING';
export const PROMOTIONS_FAILED = 'PROMOTIONS_FAILED';

export const ADD_PARTNERS = "ADD_PARTNERS";
export const PARTNERS_LOADING = "PARTNERS_LOADING";
export const PARTNERS_FAILED = "PARTNERS_FAILED";






//The CAMPSITES_LOADING import is for when we have requested the campsites information but it hasn't loaded yet
//The CAMPSITES_FAILED import is for when the server request has failed for some reason and the data was not able to be loaded.Then this action will let the redux store know that so the state can update to show an error message
//The ADD_CAMPSITES import is what will be dispatched when the campsites data has been succesfuly retrieved from the server and can be safely added to the state.
//The imports after that follow similar logic