import * as ActionTypes from "./ActionTypes";

//Next we are adding a reducer function to handle each part of the state
//Each reducer function will take 2 parameters-state(which refers to the current state that is in the store and is going to be changed by this reducer)
//The first time that the reducer is called the state would not exist. We need to use the default parameter syntax to initialize the state(or at least that part of the state which is handled by this reducer) from the imported data, in this case the CAMPSITES array of object.
//For the second parameter the reducer takes and "action" object.
//Then in the body if the function we'll check for the type of the action and return the state. It is common to use JS switch statement for this.
//Since we are implementing redux-thunk we will be changing the function below, so it was commented out and a it was recreated.

{/*export const Campsites = (state = CAMPSITES, action) => {
    switch(action.type) {
        default:
            return state;
    }
}*/}


//Before the state was holding directly the campsites array, but now it will hold 3 properties: a boolean isLoading property, an errMess property and the campsites array. We are initializing them all and they will be the default function parameters.
//After that we are adding the responses to the different campsites related actions to the switch statement
//For the first case to ADD_CAMPSITES we are returning the previous state spread out and we will update it's values to say that is no longer loading, there are no error messages and the campsites array will be populated with the payload.
//For the second case CAMPSITES_LOADING-again we are updating the state's values to show that we are waiting for the data to load, and the campsites array is empty as we haven;t received it yet from the server
//For the third case CAMPSITES_FAILED we are updating the state's values to reflect the error message. No need to add the campsites array here as it has suposedly failed to load.

export const Campsites = ( state = {
    isLoading: true,
    errMess: null,
    campsites: []
  }, action) => {
  switch (action.type) {
      case ActionTypes.ADD_CAMPSITES:
          return {...state, isLoading: false, errMess: null, campsites:action.payload};
      case ActionTypes.CAMPSITES_LOADING:
          return {...state, isLoading: true, errMess: null, campsites: []};
      case ActionTypes.CAMPSITES_FAILED:
          return {...state, isLoading: false, errMess: action.payload};
      default: 
          return state;
  }
};