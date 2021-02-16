import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from "react-router-dom";
import { Loading } from "./LoadingComponent";

/*Since the DirectoryComponent is a presentational component we can use functional components here.In the below featured component's parameter list instead of passing the whole props object we are descructuring it and pass the campsite and the onClick properties. After installing the React-router, we removed the onClick as it is no longer handled here.  */
/*We are creating a Link here that is set to follow the path to the directory and we are adding ${campsite.id} as a template literal because we want to show the card with the particular campsite id that the user clicks on. We are just setting up the link here. Separately the router needs to be set up with the router parameters in the Main component (nested in the Switch component where all the other Routes are) so the link would actually work.*/
function RenderDirectoryItem({campsite}) {
     return (
        <Card>   
            <Link to={`/directory/${campsite.id}`}>  
                <CardImg width ="100%"src = {campsite.image} alt = {campsite.name} />       
                <CardImgOverlay>
                     <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
     );

}

function Directory(props) {
    const directory = props.campsites.campsites.map(campsite => {
        return (
            <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite} />
            </div>
        )
    });

    if(props.campsites.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    if(props.campsites.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.campsites.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className = "container">
            <div className = "row">
                <div className = "col">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>
            <div className = "row">
                {directory}                           
            </div>
           
        </div>
    );
}

export default Directory;

/*As we are transitioning the Directory component to be made with functional components, all of the code bellow will be commented out. To be deleted later. */
/*  class Directory extends Component {  */
    /*constructor(props) {
        super(props);
        this.state = {
           selectedCampsite: null            
        };
    }*/
     /*Above we are establishing a property selectedCamspite that will keep track of the last card the user clicked on. The intial value is set to null..*/
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

     /*  render() {
        const directory = this.props.campsites.map(campsite => {
            return (
                <div key = {campsite.id} className = "col-md-5 m-1">     */      {/*Here we are using key so we can identify each item in the array of objects by it's unic id. The app will work fine without it but it gives warning in the console and we add it to follow best practices*/}
                    /*  <Card onClick={() => this.props.onClick(campsite.id)}>  */   {/*Here we are passing the onClick method as props from MainComponent.js */}
                     /*   <CardImg src = {campsite.image} alt = {campsite.name} />     */   {/*We are using curly braces here since we are inside JSX. We are using the map method on every item(campsite) in the campsites array of objects and we want the arrow function to return the stated properties of each one of the items. Map returns a new array. It will be rendered bellow where we added the directory variable inside the div with className="row".*/}
                     /*   <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });  */
/*The bellow return is the return from the whole component. When we are ready to break out of this component and send some data back to the parent component-that is going to happend exactly in this final return statment. All the other returns above were inside the methods which are contained inside the DirectoryComponent. These methods are just being used to pass date inside the component. */
       /*  return (
            <div className = "container">
                <div className = "row">
                    {directory}   */                    {/*Adding a JS variable that we set up after render(). It must be inside curly braces. This directory variable and the Directory class are two separate things.*/}
               /*  </div>
               
            </div>
        );
    }
}

export default Directory; */