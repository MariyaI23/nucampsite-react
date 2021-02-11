import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';

/*Importing all created in the reducer.js file. Creating another named export configureStore were our store variable will be set to the createStore() redux function. */
/*Inside createStore function we will pass the Reducer function and initialState. the configureStore function will just return the store we set up. Next we move to App.js component. */

export const ConfigureStore = () => {
    const store = createStore(
        Reducer,
        initialState
    );

    return store;
};