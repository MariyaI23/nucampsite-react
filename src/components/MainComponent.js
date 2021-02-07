import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from './ContactComponent';
import About from './AboutComponent.js';

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

      /*We'll set the CampsiteWithId component bellow as an arrow function as we'll need to access the Main Component's state. The function will receive props from the Route component bellow and we are destructuring the props to use the match object as a parameter in the aroow function. As a return from the arrow function we'll render the CampsiteInfo component and will pass some props: one is the selected campsite object, the other is an array with all the comments for that campsite. For the first one, we know we have the whole Campsites list in the main component so here we'll have to filter through that to get the campsite object that has an id that matches what is stored in match.params.campsiteId. Because that value is stored as a string we need to convert it to a number in order to do the comparison. For that conversion we'll use the unary + operator which does exactly that-when we have a number that is stored as a string but we want to convert it back to a number we just place the + operator in front of that string or in front of whatever holds the string as a value.For ex. if we have the string "100" we just do +"100" and now 100 is a number.At the end the filter method returns an array but we need an obect so again we place [0] at the end to get that object. For the comments we are doing pretty much the same but here we need the whole array, not just a single comment so we will omit the [0] at the end. Then we need to go and fix the CampsiteInfoComponent.*/
      const CampsiteWithId = ({match}) => {
          return (
              <CampsiteInfo campsite = {this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
              comments = {this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)} />
          );
      };

      return (
          <div>
              <Header />
              <Switch>                                                            {/*The Switch React-Router component is similar to the JS switch statement. When the user clicks on a path, it will enter this Switch component and all the other router components inside of it are like the "case" statements in the JS switch statement. It will look for a matching math and if it can't find one will default to the Redirect component at the bottom which bt default will take the user to the home page. */}
                  <Route path = "/home" component = {HomePage} />                  {/*This Route path will direct any path that tries to go to /home to the HomePage we set up in the HomeComponent. */}
                  <Route exact path = '/directory' render = { () => <Directory campsites = {this.state.campsites} />} />                           {/*This Route path will use the "exact" boolean attribute to match the exact path given.That path will be './directory'. Next to that we will set up a render attribute. In it we will have an arrow function returning the Directory component. */}       {/* onClick={campsiteId => this.onCampsiteSelect(campsiteId)}*/}   {/*Here we took the onClick method from DirectoryComponent and entered it here where we are actually rendering the DirectoryComponent so we can pass the onClick method as props to DirectoryComponent. We are not passing the whole campsite object however but just a campsite Id. Note that we had to update that in the onCampsiteSelect method above. After we installed the React-Router library we are no longer using the onClick event or the code in the line bellow. As stated in the comment at the beginning we will no longer be selecting a card to show more info.*/}
                  <Route path = "/directory/:campsiteId" component={CampsiteWithId} />       {/*The : following the /after directory tells the router that waht follows is going to be a parameter. It takes that parameter, whatever that happens to be, and puts it inside the property campsite.id. The Route component itself stores and object named: match in it's state which object has as a property an object named params. The campsite.id will get stored as a property inside that params object.(This can be viewed in the react console). After that we render a component={CamspiteWitdId}. The Route's match object will get passed to the CampsiteWithId component as a prop automatically.*/}
                  <Route exact path='/contactus' component={Contact} />          {/*Whenever we are not passing any state data to a component we can use the component attribute instead of render like in the above line */}                                                                                                                       {/* <CampsiteInfo campsite = {this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} /> */}   {/*Here we need to pass an object to the CampsiteInfo component, but since the selectedCampsite property is now storing and id (not and object) after the onCampsiteSelect method has fired, then we need to use the filter array method on the campsites array. That way we can filter through it to find the object that matches the id that was selected. Filter returns an array, however the CampsiteComponent expects to passed an object, that is why we are using [0] at the end. That way we will send 1 object, not an array. */}
                  <Route exact path ="/aboutus" render = { () => <About partners = {this.state.partners} />} />
                  <Redirect to = "/home" />                                                                                                        {/*This Redirect React-Router component plays the role of a "catch-all" similar to the default statement in the JS switch statement. */}

              </Switch>
              <Footer />
          </div>
      );
  }
}

export default Main;