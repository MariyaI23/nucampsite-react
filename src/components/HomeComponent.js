import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderCard({item}) {
    return (
        <Card>
            <CardImg src={item.image} alt = {item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

function Home(props) {
    return (
        /*Here we will be rendering the RenderCard component and will be passing the "item" prop. The rest of the props were already passed to the HomeComponent in the MainComponent where we are actually rendering the HomeComponent */
        <div className = "container">
            <div className = "row">
                <div className = "col-md m-1">
                    <RenderCard item = {props.campsite} />
                </div>
                <div className = "col-md m-1">
                    <RenderCard item ={props.promotion} />
                </div>
                <div className = "col-md m-1">
                    <RenderCard item = {props.partner} />
               </div>
            </div>
        </div>
    )
}

export default Home;