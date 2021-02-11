import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';

/*We will set up another store variable to recapture the value stored in the store variable in configureStore.js */

const store = ConfigureStore();

/*Next inside the return method of the App component we need to wrap everything in a Provider component giving it "store" as an attribute. */
/*This will make the redux store available to all react components that are children of App. After this Main component needs to be updated. */

class App extends Component {
  render() {
      return (
          <Provider store={store}>
              <BrowserRouter>
                  <div className="App">
                      <Main />
                  </div>
              </BrowserRouter>
          </Provider>
      );
  }
}

export default App;
