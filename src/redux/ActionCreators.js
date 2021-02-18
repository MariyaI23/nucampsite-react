import * as ActionTypes from "./ActionTypes";
import { baseUrl} from '../shared/baseUrl';

//The * lets us import all the named exports from the ActionTypes.js file all at once
//Next we are creating an action cretor function addComment. We need to apss in all the values that are needed for the comment.
//We will set this action creatotr function as an arrow functions which returns an object with the properties: type and payload. Type will be set to ActionTypes(which included all actions) we imported above and then we specify which action exactly by .ADD_COMMENT
//Next we will be using redux thunk to perform async request to the server but since we are not pulling any data from any server for this app, we will be simulating a delay by adding setTimeOut function. After that delay we'll add the campsites data to the state.
//We are importing the campsites data temporarely so we can include it in our server simulation.(This was replaced by the baseUrl import after setting up json-server.)
//Next we are adding an action creator-fetchCampsites and we are using the redux thunk syntax. We are wrapping the function in another function and redux thunk lets us pass the store's dispatch method into the inner function.
//Then we can use the dispatch method inside the inner function to dispatch different action - campsitesLoading.
//Then we are using setTimeout to simulate brief delay of 2000ms.(That was replaced by return fetch(baseUrl +"campsites"). As this is the location of the resource we want-the campsites data.). //
//The fetch method will return a promise. We are chaining .then method which will check with an if/else statement if the response we got from the server is in the ok range or not.If it is we will return the response and will continue to the next .then method. It will use the json() method to convert the response(once resolved) to JS.That JS will be the array of campsites.Then we can chain another .then method wich will grab that array in the campsites argument. If the response we got from the server is not in the ok range, we'll throw an error. The error => function after the if/else statement is if we didn't get a response from the server at all(good or bad).
//Then we can dispatch that data to the addCampsites action creator to be used as it's payload.
//After that delay, we are dispatching another action-addCampsites along with the data from the campsites array.
//The next action creator we are adding-campsitesLoading is a standard action creator, it is not using redux thunk. It will return just an object. We are not adding a payload, just a type. Since this action creator is not thunked it will not be delayed and it will go straight to the reducer.
//When the fetchCampsites action is dispatch, that will dispatch the campsitesLoading action as well.
//The next action creator is campsitesFailed. We will pass an error message into this function
//The next action creator will be addCampsites.
//Next we are adding ankther action creator to fetch cooments. This will be a thunk action creator with the 2 arrow functions with the dispatch argument passed into the inner arrow function.
//We will send a fetch request to the server running at baseUrl and will request the comments resourse which should return a promise for an array of comments objects. We will use .then to access that array as the response if the fetch was successful and again we will the json() method to convert that json to a JS array. 
//If that works we will dispatch those comments to be added to the redux store.
//Next we will set up 2 more action creators which will be regular action creators and will not be using thunk, therefore-just 1 arrow function.
//The commentsFailed action creator will have a parameter of errMess and will create an object with type of ActionTypes.COMMENTS_FAILED. And a payload containing that error message
//The addComments action creator will have a parameter of comments; a type of ActionTypes.ADD_COMMENTS and a payload of comments passed in as the argument
//The next action creator will be for fetching promotions and this pne will be thunk


export const fetchCampsites = () => dispatch => {
    dispatch(campsitesLoading());

    return fetch(baseUrl + "campsites")
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            const errMess = new Error(error.message);
            throw errMess;
        }
        )
        .then(response => response.json())
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)));

    /*setTimeout(() => {
        dispatch(addCampsites(CAMPSITES));
    }, 2000);*/
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

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + "comments")
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {
        const errMess = new Error(error.message);
        throw errMess;
    }
    )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

//We are adding the below logic to set up a way to post the newly added comment to the server. We must specify a method. If we don't the deafult method is "GET".In this case we specifying "POST"
//After method:"POST", we need to add new property body: that will hold the new object we created-newComment.JSON.stringify helps us turn that object into a string. That is the http request body
//Next we will add the request header with the headers property. That property needs to be an objext so it can hold one or more headers. We are giving just one header this time. With application/json the server will know to expect that the body will be formated as json.
//After error=> we will close the first .then method and chain few more .then methods. The first will deal if the response from the server is that our new comment was accepted and it was returned back to us. Then we will dispatch it with the addComment action creator so the redux store can also be updated.Then will add a catch method to catch any rejected promises or throws and let us know that something went wrong.
export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (campsiteId, rating, author, text) => dispatch => {
    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + "comments", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {throw error; }
    )
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {
        console.log("post comment", error.message);
        alert("Your comment could not be posted\nError: " + error.message);
    });
};

export const fetchPromotions = () => dispatch => {

    dispatch(promotionsLoading());

    return fetch(baseUrl + "promotions")
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {
        const errMess = new Error(error.message);
        throw errMess;
    }
    )
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});

