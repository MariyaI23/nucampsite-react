import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from './ContactComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import {CAMPSITES} from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';
/*The .. is added before the /shared/campsites import so the app knows to go down one directory,and then look for the "shared" directory */

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS                                                                             /*selectedCampsite: null    commenting this out as we will no longer be using it. Prior to installing the React-Router library our first page in the app was showing by default the directory, however we will be setting up a new Home page and will no longer be showing here the extra information on a selected card so we will be commenting out the onCampsiteSelect() method bellow as well.*/
        };
    }

    /*  onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId});
    }  */
    /*With the above method when someone clicks on a card the method will fire using the campsite's id. Then it will store the id of the campsite that was clicked on in the state's selectedCampsite property. */
  render() {
      /*Bellow we will be creating a localy scoped component HomePage that is going to be available only within the Main component. It will act as a wrapper for the Home component which we will render inside the arrow function body. The reason why we need to use an arrow function here is so we can use the "this" keyword which will point to state of the class which is a parent to the home class. If we had used a regular function the "this" keyword would've been undefined */
      const HomePage = () => {
          return (
              /*We will be filtering each array of objects(the campsites array, the promotions and partners arrays. Each object in those arrays has a featured property.Some are set to true. The filter method will check for that and if true, it will return a new array. To pull just that object out of the array we are using the array index: [0]). Allof these will be passed to the Homa page component as props*/
              <Home 
                  campsite = {this.state.campsites.filter(campsite => campsite.featured)[0]}    
                  promotion = {this.state.promotions.filter(promotion => promotion.featured)[0]}
                  partner = {this.state.partners.filter(partner => partner.featured)[0]}
              />
          );
      }

      return (
          <div>
              <Header />
              <Switch>                                                            {/*The Switch React-Router component is similar to the JS switch statement. When the user clicks on a path, it will enter this Switch component and all the other router components inside of it are like the "case" statements in the JS switch statement. It will look for a matching math and if it can't find one will default to the Redirect component at the bottom which bt default will take the user to the home page. */}
                  <Route path = "/home" component = {HomePage} />                  {/*This Route path will direct any path that tries to go to /home to the HomePage we set up in the HomeComponent. */}
                  <Route exact path = '/directory' render = { () => <Directory campsites = {this.state.campsites} />} />                           {/*This Route path will use the "exact" boolean attribute to match the exact path given.That path will be './directory'. Next to that we will set up a render attribute. In it we will have an arrow function returning the Directory component. */}       {/* onClick={campsiteId => this.onCampsiteSelect(campsiteId)}*/}   {/*Here we took the onClick method from DirectoryComponent and entered it here where we are actually rendering the DirectoryComponent so we can pass the onClick method as props to DirectoryComponent. We are not passing the whole campsite object however but just a campsite Id. Note that we had to update that in the onCampsiteSelect method above. After we installed the React-Router library we are no longer using the onClick event or the code in the line bellow. As stated in the comment at the beginning we will no longer be selecting a card to show more info.*/}
                  <Route exact path='/contactus' component={Contact} />          {/*Whenever we are not passing any state data to a component we can use the component attribute instead of render like in the above line */}                                                                                                                       {/* <CampsiteInfo campsite = {this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} /> */}   {/*Here we need to pass an object to the CampsiteInfo component, but since the selectedCampsite property is now storing and id (not and object) after the onCampsiteSelect method has fired, then we need to use the filter array method on the campsites array. That way we can filter through it to find the object that matches the id that was selected. Filter returns an array, however the CampsiteComponent expects to passed an object, that is why we are using [0] at the end. That way we will send 1 object, not an array. */}
                  <Redirect to = "/home" />                                                                                                        {/*This Redirect React-Router component plays the role of a "catch-all" similar to the default statement in the JS switch statement. */}

              </Switch>
              <Footer />
          </div>
      );
  }
}

export default Main;