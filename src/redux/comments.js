import { COMMENTS } from "../shared/comments";
import * as ActionTypes from "./ActionTypes";

//We are importing the above form the ActionTypes module so this reducer can update it's part of the state when the ADD_COMMENT action is dispatched to the store.
//Then in the switch statement we are adding a case for when the ActionType is ADD_COMMENT. Then we are creating a new variable comment to hold the payload from the action creator.
//Since the payload was an object we can add more properties to it.We are adding an id which will be the length of the array which is stored in this part of the state. The we are adding today's date.
//At the end of the case we will return the new state using the array's concat method which lets us attach a new item to the end of an array without mutating the original array. It creates a  new array.
//So the return line takes the existing state which is an array of objects and it concatanates the new comment object to the end of the array. Then it returns that new state to the Redux store. Next several react components had to be updated to be able to dispatch the action.

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return state.concat(comment);
        default:
            return state;
    }
};