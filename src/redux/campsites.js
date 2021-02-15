import { CAMPSITES } from '../shared/campsites';

//Next we are adding a reducer function to handle each part of the state
//Each reducer function will take 2 parameters-state(which refers to the current state that is in the store and is going to be changed by this reducer)
//The first time that the reducer is called the state would not exist. We need to use the default parameter syntax to initialize the state(or at least that part of the state which is handled by this reducer) from the imported data, in this case the CAMPSITES array of object.
//For the second parameter the reducer takes and "action" object.
//Then in the body if the function we'll check for the type of the action and return the state. It is common to use JS switch statement for this.

export const Campsites = (state = CAMPSITES, action) => {
    switch(action.type) {
        default:
            return state;
    }
}