//import { CAMPSITES } from '../shared/campsites';
//import { COMMENTS } from '../shared/comments';
//import { PARTNERS } from '../shared/partners';
//import { PROMOTIONS } from '../shared/promotions';

/*We will be moving all of our state data from the Main component to here. We are creating an object-initialState. We will get that state from the data files we have imported above.*/
/* We will be exporting both of these variable as named exports, therefore we need to add the "export" keyword in front of the variables.*/

// export const initialState = {
  //  campsites: CAMPSITES,
   // comments: COMMENTS,
   // partners: PARTNERS,
   // promotions: PROMOTIONS
//};

/*Next setting up a Reducer function which will use default function parameters so if there is no state passed in, the state will get set to the initialState object. The Reducer function will also take an "action" argument. The Reducer will just return the same state that was passed in without making any changes. */

// export const Reducer = (state=initialState, action) => {
  //  return state;
// }