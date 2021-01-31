import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap'
class Directory extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
           selectedCampsite: null            
        };
    }*/
     /*Above we are establishing a property selected Camspite that will keep track of the last card the user clicked on. The intial value is set to null..*/
     /*Bellow we are setting up a method that will fire up when the user selects a campsite. We are passing the campsites object. Inside this method we will update the state property with setState() method. Inside it we'll update the selectedCampsite property that we established above from null to now the campsite object which was passed into the onCamspiteSelect() method */
    /*onCampsiteSelect(campsite) {
        this.setState({selectedCampsite: campsite});
    }*/
    /*The onCampsiteSelect() method will be triggered in the Card component bellow with an onClick event since we are trying to track wich Card the user clicks on. */
    /*Bellow we will establish a new method after the user has selected the Card he wants to view addl info on. This method will render(display) the new card with more info. */
    /*Here with the if statement we are checking to see if campsite is an object, if yes it will evaluate as truthy, however if campsite is null or undefined it will be falsy. If truthy it will display the chosen card to the user WITH the addl information(the description property) */
    /*The renderSelectedCampsite() method will be called in the final return statement at the end of this whole component. */
    /* The renderSelectedCamsite() method was commented out as it was moved to the CampsiteInfoComponent's renderCampsite() method*/
    /*renderSelectedCampsite(campsite) {
        if(campsite) {                    
            return (
                <Card>
                    <CardImg top src = {campsite.image} alt = {campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
        /*Setting up a return bellow the if block in case we didn't make it into the block if evaluated as falsy. It will return a simple empty <div> */
        /*return <div />;*/
    /*}*/
    /*ALL OF THE ABOVE CODE WAS COMMENTED OUT AS IT WAS MOVED TO THE MAINCOMPONENT. WE ARE TURNING THE DIRECTORY COMPONENT INTO PRESENTATIONAL COMPONENT. THE MAINCOMPONENT WILL BE THE CONTAINER COMPONENT THAT WILL HOLD THE STATE */

     render() {
        const directory = this.props.campsites.map(campsite => {
            return (
                <div key = {campsite.id} className = "col-md-5 m-1">           {/*Here we are using key so we can identify each item in the array of objects by it's unic id. The app will work fine without it but it gives warning in the console and we add it to follow best practices*/}
                    <Card onClick={() => this.props.onClick(campsite.id)}>     {/*Here we are passing the onClick method as props from MainComponent.js */}
                        <CardImg src = {campsite.image} alt = {campsite.name} />        {/*We are using curly braces here since we are inside JSX. We are using the map method on every item(campsite) in the campsites array of objects and we want the arrow function to return the stated properties of each one of the items. Map returns a new array. It will be rendered bellow where we added the directory variable inside the div with className="row".*/}
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
/*The bellow return is the return from the whole component. When we are ready to break out of this component and send some data back to the parent component-that is going to happend exactly in this final return statment. All the other returns above were inside the methods which are contained inside the DirectoryComponent. These methods are just being used to pass date inside the component. */
        return (
            <div className = "container">
                <div className = "row">
                    {directory}                           {/*Adding a JS variable that we set up after render(). It must be inside curly braces. This directory variable and the Directory class are two separate things.*/}
                </div>
               
            </div>
        );
    }
}

export default Directory;