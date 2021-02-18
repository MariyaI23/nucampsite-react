//import { COMMENTS } from "../shared/comments";
import * as ActionTypes from "./ActionTypes";

//After installing json-server the structure of the code below has changed. It was commented out and the new code was added.
//We are no longer geeting a simple COOMENTS array but rather an object containing the properties errMess initialized to null and the comments array initialized to an empty array
//Now we can add 2 more cases in the switch statement. the ADD_COMMENTS case will return the previous state updated with the null error message and the comments array from the action payload
//The action type COMMENTS_FAILED will return the previous state allong with the errMess form the action payload
//At the ADD_COMMENT action the comment.id will no longer be =state.length, because the state is no longer just a simple array. Now the array is tored in the state.comments object, so we need to insert comments between state and length
//Also we can't just concat the new comment to the end anymore. We will need to spread the previous state and update just the comments property and that is where we will concat the new comment
//We had to comment out the comment.id as it was nppt needed anymore as json-server adds an id automatically. The date is being in the postComment action creator now.


export const Comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errmess: action.payload};
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            //comment.id = state.comments.length;
            //comment.date = new Date().toISOString();
            return {...state, comments: state.comments.concat(comment)};
        default:
            return state;

    }
};














//We are importing the above form the ActionTypes module so this reducer can update it's part of the state when the ADD_COMMENT action is dispatched to the store.
//Then in the switch statement we are adding a case for when the ActionType is ADD_COMMENT. Then we are creating a new variable comment to hold the payload from the action creator.
//Since the payload was an object we can add more properties to it.We are adding an id which will be the length of the array which is stored in this part of the state. Then we are adding today's date.
//At the end of the case we will return the new state using the array's concat method which lets us attach a new item to the end of an array without mutating the original array. It creates a  new array.
//So the return line takes the existing state which is an array of objects and it concatanates the new comment object to the end of the array. Then it returns that new state to the Redux store. Next several react components had to be updated to be able to dispatch the action.

/*export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return state.concat(comment);
        default:
            return state;
    }
};*/