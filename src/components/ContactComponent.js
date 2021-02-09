import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import {Link} from "react-router-dom";

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            agree: false,
            contactType: "By Phone",
            feedback: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);     {/*This binding makes it so that we can use the "this" keyword inside the handleInputChange() method and have it point to the correct object */}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*The following class component will be set up to handle changes to form elements. We will be passing an event object. We are setting up the target and name variables to make it easier to access later the properties event.target and event.target.name. */
    /*With the value variable we are using a ternary operator which checks if the type of the form element that triggered this event is a checkbox then we get the value from the target's checked attribute. The checked attribute is a boolean attribute and can be either true or false. If the form element is NOT a checkbox, then we get the value from the target's value.*/
    /*After that we are useing setState() method with a computed property name in order to set the property based on the target's name. Depending on which form element triggered this event, that "name" could be firstName, lastName, email etc. We want this to be flexible so the "name" is taken from the input that was changed which we get through the "event" object that was passed in rather than being hard coded here. For the value of the computed propert[name] we will use the variable "value" so we can get everything that is stored in it. After that we go back up to the constructor of the class component above and we need to bind the "this" keyword to this handleInputChange() method. */
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === "checkbox" ? target.checked : target.value;

        this.setState({
            [name]: value
        })
    }

    /*For now we are setting up the handleSubmit() method to log the current state to the console. Since console.log expects a string, not an object, we will use a global method that will help make a string from a JS object. It is called JSON.stringify method. We are adding the same thing as an alert as well just in case so we will get this message in the console and as an alret as well. Then again we need to go back up to the constructor of the class component above and bind the "this* keyword to this event as well. */
    handleSubmit(event) {
        console.log("Current state is " + JSON.stringify(this.state));
        alert("Current state is " + JSON.stringify(this.state));
        event.preventDefault();      {/*When we submit a form usually the whole page refreshes. To prevent that we use event.preventDefault */}
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to="/home">Home</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>

                <div className="row row-content align-items-center">
                    <div className="col-sm-4">
                        <h5>Our Address</h5>
                        <address>
                            1 Nucamp Way<br />
                            Seattle, WA 98001<br />
                            U.S.A.
                        </address>
                    </div>
                    <div className="col">
                        <a role="button" className="btn btn-link" href="tel:+12065551234"><i className="fa fa-phone" /> 1-206-555-1234</a><br />
                        <a role="button" className="btn btn-link" href="mailto:fakeemail@fakeemail.co"><i className="fa fa-envelope-o" /> campsites@nucamp.co</a>
                    </div>
                </div>

                {/*The following code contains the Feedback form. In the <Col> or <Label> reactstrap components we can set the margins as md={10} which is the same as className="col-md-10". In the <Label> component instead of using the "for" attribute we use htmlFor as we are in JSX. In some of the <Col> components we are using md={{size: 4,offset: 2}}. First set of {} is because we are using JS in JSX, second set of {} is because we are defining an object.This allows us to set up both the responsive size and the responsive offset for the column at the same time. This is the same as writting <div class="col-md-4 offset-md-2">. We set the usual html attributes in the input tags but to make this a control form we need to set the value property that we defined before to be ={this.state.phoneNum} or whatever is applicable to the specif. input field. The exception is the input with type of checkbox. There instead of value we will use the checked attribute. Each input component also gets an onChange event handler that is set to the handleInputChange() method that was created earlier. The start <Form> tag will get an onSubmit event handler set to the method handleSubmit().*/}
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Send us your Feedback</h2>
                        <hr />
                    </div>
                    <div className="col-md-10">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        onChange={this.handleInputChange} />
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 4, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="feedback" name="feedback"
                                        rows="12"
                                        value={this.state.feedback}
                                        onChange={this.handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;