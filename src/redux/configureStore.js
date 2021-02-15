import { createStore, combineReducers } from 'redux';
import { Campsites } from "./campsites";
import { Comments} from "./comments";
import { Partners } from "./partners";
import { Promotions } from "./promotions";

/*Importing all created in the reducer.js file. Creating another named export configureStore were our store variable will be set to the createStore() redux function. */
/*Inside createStore function we will pass the Reducer function and initialState. the configureStore function will just return the store we set up. Next we move to App.js component. After we imported and combined the reducers this was replaced by the combineReducers function*/
/*The store will accept only 1 reducer. We created separate reducer functions for campsites, partners, promotions and comments. Now we need to combine those reducers into 1. */
/*In order to combine all reducers we need to use the combineReducers function which we have to import from redux in the imports above. */
//We are also importing all of the reducers we created.
//We will be passing an object that contains all of the reducers as properties. The property names define how the data from each reducer will be kept in the overall state object tree.
//At this point the reducer.js file in the redux folder can also be deleted(I have just commented out everything in it).

export const ConfigureStore = () => {
    const store = createStore(
       combineReducers({
           campsites: Campsites,
           comments: Comments,
           partners: Partners,
           promotions: Promotions
       })
        
    );

    return store;
};