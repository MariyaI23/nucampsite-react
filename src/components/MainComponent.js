import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from './ContactComponent';
import About from './AboutComponent.js';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, fetchCampsites, fetchComments, fetchPromotions, fetchPartners, postFeedback } from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition} from "react-transition-group";



//Adding the actions import from react-redux-form will make available an action creator named actions.resset. It will be used in the mapDispatchToProps as the value of a function named resetFeedbackForm
//After creating the postComment action creator we need to replace here every instance of addComment to postComment

/*Since we are moving the state to reducer.js all of the following imports are no longer needed. Also the whole constructor method was removed from the Main component. */
/*import {CAMPSITES} from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';*/
/*The .. is added before the /shared/campsites import so the app knows to go down one directory,and then look for the "shared" directory */

/*To get the state for redux we are setting up the mapStatetoProps function.It will take the state as an argument and it will return the campsites,comments,partners and promotions' arrays as props. Therefore all the occurences of word "state" in the Main component were changed to props as Main is no longer setting the state but recieving it as props.*/

const mapStateToProps = state => {
    return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions
    };
};


//The mapDispatchtoProps below can be set up either as a function or as an object. The recommended way is to set it up as an object.
//We are setting up a property addComment and for it's value we will set up an arrow function with a parameter list containing the items show.
//In the arrow function's body we will call the action's creator- addCommentpassing in that data.
//Then we are adding this mapDispatchtoProps at the bottom of this file to the connect function as the second argument. This will make the addComment  action creator function available inside the Main component as prop.
//Then we can pass the addComment creator function as a prop to the CampsiteInfo component which rendered below. The the CampsiteInfo component itself has to be updated to use that addComment creator function.
//After introducing redux thunk we will add the fetchCampsites arrow function to the mapDispatchToProps.We will have it call the fetchCampsites action creator.That way this creator is available to the Main component as props.
//We want to fetch the campsites data as soon as the Main component is rendered to the DOM. That is why we are adding the method componentDidMount() right before the render method of the Main component below
//componentDidMount is a built in react method parth of the Lifecycle Methods.The render() method is also a Lifecycle method as it is part of the "life of the component-the part were it renders other components." We added the fetchComments and fetchPromotions action creators as well so they can be fetched once the component has mounted
//After installing json-server we added the new methods to call the new action creators(fetchCooments and fetchPromotions) to mapDispatchToProps



const mapDispatchToProps = {
    postComment: (camspiteId, rating, author, text) => (postComment(camspiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset("feedbackForm")),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    fetchPartners: () => (fetchPartners()),
    postFeedback: (values) => (postFeedback(values))
};

class Main extends Component {

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
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
              /*we added campsites 2 times before the filter method because prior to adding redux thunk campsites was holding just the array of campsites, but now it holds also the isLoaded and errMess properties besides the array. If we still need to access the array we need to specify now that from  the campsites object we want the campsites array. Same thing with promotions.*/
              /*We will also pass the isLoading and errMess properties as props.This and the above step from the comments was repeated for the CampsiteWithId component below as well */
              <Home 
                  campsite = {this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}    
                  campsitesLoading={this.props.campsites.isLoading}
                  campsitesErrMess={this.props.campsites.errMess}
                  promotion = {this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                  promotionLoading={this.props.promotions.isLoading}
                  promotionErrMess={this.props.promotions.errMess}
                  partner = {this.props.partners.partners.filter(partner => partner.featured)[0]}
                  partnerLoading={this.props.partners.isLoading}
                  partnerErrMess={this.props.partners.errMess}
              />
          );
      }

      /*We'll set the CampsiteWithId component bellow as an arrow function as we'll need to access the Main Component's state. The function will receive props from the Route component bellow and we are destructuring the props to use the match object as a parameter in the arow function. As a return from the arrow function we'll render the CampsiteInfo component and will pass some props: one is the selected campsite object, the other is an array with all the comments for that campsite. For the first one, we know we have the whole Campsites list in the main component so here we'll have to filter through that to get the campsite object that has an id that matches what is stored in match.params.campsiteId. Because that value is stored as a string we need to convert it to a number in order to do the comparison. For that conversion we'll use the unary + operator which does exactly that-when we have a number that is stored as a string but we want to convert it back to a number we just place the + operator in front of that string or in front of whatever holds the string as a value.For ex. if we have the string "100" we just do +"100" and now 100 is a number.At the end the filter method returns an array but we need an obect so again we place [0] at the end to get that object. For the comments we are doing pretty much the same but here we need the whole array, not just a single comment so we will omit the [0] at the end. Then we need to go and fix the CampsiteInfoComponent.*/
      const CampsiteWithId = ({match}) => {
          return (
              <CampsiteInfo 
                  campsite = {this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                  isLoading={this.props.campsites.isLoading}
                  errMess={this.props.campsites.errMess}
                  comments = {this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)} 
                  commentsErrMess={this.props.comments.errMess}
                  postComment = {this.props.postComment}
              />
          );
      };

      //We will wrap the Switch tag here with TransitionGroup tag so we can apply the transition styles to it. Then we'll apply CSS transition tag wich requires a key. That key is provided by the router.
      //We will also apply a special attribute: classNames(not className as usual). This attribute is specific to CSSTransition. It will look in this case for "page class" and it will inculde page-enter, page-enter-active and all the other that start with "page". We'll also add a default timeout attribute set to 300ms.
      return (
          <div>
              <Header />
              <TransitionGroup>
                  <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                      <Switch>                                                            {/*The Switch React-Router component is similar to the JS switch statement. When the user clicks on a path, it will enter this Switch component and all the other router components inside of it are like the "case" statements in the JS switch statement. It will look for a matching math and if it can't find one will default to the Redirect component at the bottom which bt default will take the user to the home page. */}
                          <Route path = "/home" component = {HomePage} />                  {/*This Route path will direct any path that tries to go to /home to the HomePage we set up in the HomeComponent. */}
                          <Route exact path = '/directory' render = { () => <Directory campsites = {this.props.campsites} />} />                           {/*This Route path will use the "exact" boolean attribute to match the exact path given.That path will be './directory'. Next to that we will set up a render attribute. In it we will have an arrow function returning the Directory component. */}       {/* onClick={campsiteId => this.onCampsiteSelect(campsiteId)}*/}   {/*Here we took the onClick method from DirectoryComponent and entered it here where we are actually rendering the DirectoryComponent so we can pass the onClick method as props to DirectoryComponent. We are not passing the whole campsite object however but just a campsite Id. Note that we had to update that in the onCampsiteSelect method above. After we installed the React-Router library we are no longer using the onClick event or the code in the line bellow. As stated in the comment at the beginning we will no longer be selecting a card to show more info.*/}
                          <Route path = "/directory/:campsiteId" component={CampsiteWithId} />       {/*The : following the /after directory tells the router that waht follows is going to be a parameter. It takes that parameter, whatever that happens to be, and puts it inside the property campsite.id. The Route component itself stores and object named: match in it's state which object has as a property an object named params. The campsite.id will get stored as a property inside that params object.(This can be viewed in the react console). After that we render a component={CamspiteWitdId}. The Route's match object will get passed to the CampsiteWithId component as a prop automatically.*/}
                          <Route exact path='/contactus' render={() => <Contact resetFeedbackForm ={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />          {/*Whenever we are not passing any state data to a component we can use the component attribute instead of render like in the above line. This had to be changed to render as we needed to pass in the resetFeedabckForm as props*/}                                                                                                                       {/* <CampsiteInfo campsite = {this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]} /> */}   {/*Here we need to pass an object to the CampsiteInfo component, but since the selectedCampsite property is now storing and id (not and object) after the onCampsiteSelect method has fired, then we need to use the filter array method on the campsites array. That way we can filter through it to find the object that matches the id that was selected. Filter returns an array, however the CampsiteComponent expects to passed an object, that is why we are using [0] at the end. That way we will send 1 object, not an array. */}
                          <Route exact path ="/aboutus" render = { () => <About partners = {this.props.partners} />} />
                          <Redirect to = "/home" />                                                                                                        {/*This Redirect React-Router component plays the role of a "catch-all" similar to the default statement in the JS switch statement. */}
                      </Switch>
                  </CSSTransition>
              </TransitionGroup>
              <Footer />
          </div>
      );
  }
}

/*We are setting up the connect method to allow Main to take it's state from the redux store. Then we are wrapping the export with the "withRouter" we imported above so our Router will still work with changes made to this export.*/

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));