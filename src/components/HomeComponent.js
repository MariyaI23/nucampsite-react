import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading }  from "./LoadingComponent";
import { baseUrl} from "../shared/baseUrl";

//We are adding isLoading and errMess as props and are creating an if statement in RenderCard below to check if isLoading is truthy, if it is it will return the Loading component so the spinner will show up with the message "Loading..."
//If errMess is truthy we will return the context of the error message.
//If neither of those if statement is truthy then it will just return the Card with the campsite info
function RenderCard({item, isLoading, errMess}) {
    if(isLoading) {
        return <Loading />
    }
    if(errMess) {
        return <h4>{errMess}</h4>
    }
    return (
        <Card>
            <CardImg src={baseUrl + item.image} alt = {item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

function Home(props) {
    return (
        /*Here we will be rendering the RenderCard component and will be passing the "item" prop. The rest of the props were already passed to the HomeComponent in the MainComponent where we are actually rendering the HomeComponent*/
        /*After adding redux thunk we will now pass isLoading and errMess props to the RenderCard below */
        <div className = "container">
            <div className = "row">
                <div className = "col-md m-1">
                    <RenderCard 
                        item = {props.campsite}
                        isLoading={props.campsitesLoading}
                        errMess={props.campsitesErrMess}
                     />
                </div>
                <div className = "col-md m-1">
                    <RenderCard 
                        item ={props.promotion}
                        isLoading={props.promotionLoading}
                        errMess={props.promotionErrMess}
                     />
                </div>
                <div className = "col-md m-1">
                    <RenderCard item = {props.partner} />
               </div>
            </div>
        </div>
    )
}

export default Home;