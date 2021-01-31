import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import {CAMPSITES} from '../shared/campsites';
/*The .. is added before the /shared/campsites import so the app knows to go down one directory,and then look for the "shared" directory */

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null
        };
    }

    onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId});
    }
    /*With the above method when someone clicks on a card the method will fire using the campsite's id. The it will store the id of the campsite that was clicked on in the state's selectedCampsite property. */
  render() {
      return (
          <div>
              <Navbar dark color="primary">
              <div className="container">
                  <NavbarBrand href="/">NuCamp</NavbarBrand>
              </div>
              </Navbar>
              <Directory campsites = {this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)} />   {/*Here we took the onClick methdo from DirectoryComponent and entered it here where we are actually rendering the DirectoryComponent so we can pass the onClick method as props to DirectoryComponent. We are not passing the whole campsite object however but just a campsite Id. Note that we had to update that in the onCampsiteSelect method above */}
              <CampsiteInfo campsite = {this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} />   {/*Here we need to pass an object to the CampsiteInfo component, but since the selectedCampsite property is now storing and id (not and object) after the onCampsiteSelect method has fired, then we need to use the filter array method on the campsites array. That way we can filter through it to find the object that matches the id that was selected. Filter returns an array, however the CampsiteComponent expects to passed an object, that is why we are using [0] at the end. That way we will send 1 object, not an array. */}
          </div>
      );
  }
}

export default Main;