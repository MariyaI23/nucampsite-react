import * as ActionTypes from "./ActionTypes";

//The * lets us import all the named exports from the ActionTypes.js file all at once
//Next we are creating an action cretor function addComment. We need to apss in all the values that are needed for the comment.
//We will set this action creatotr function as an arrow functions which returns an object with the properties: type and payload. Type will be set to ActionTypes(which included all actions) we imported above and then we specify which action exactly by .ADD_COMMENT

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});