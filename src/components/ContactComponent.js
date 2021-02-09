import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
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
            feedback: '',
            touched: {
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);     {/*This binding makes it so that we can use the "this" keyword inside the handleInputChange() method and have it point to the correct object */}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     /*Below we will set up the form validation method, passing in the properties we need to validate. Inside this method we'll set up an errors object. The properties of this object will hold the error messages for the for fields if there are any errors. Each will be initialized with an empty string("") which means there are no errors. */
     /*The first if statement will check if the firstName field has been touched. If yes, then another if statement nested inside the first one will check if the lenght of the value that was entered inside that field is < 2. If so, then we are setting up and error message for the fist name.Then we are setting up an else if check to see if the first name is > 15 characters. If so then we'll set up another error message for that. The same validation logic will be used for the last name.*/
     /*To check the phone number we need to use a regular expression to make sure that the phone number entered contains only digits(that is what \d stands for). The if statement will check if the phoneNum field has been touched AND(&&) if it failed the reg.expr. test with the logical NOT operator-!(basically saying-it is not true that the number contains digits only). If so, then an error message will be sent for that. */
     /*With the email field we will check if the email field has been touched AND(&&) if the string entered  DOESN'T include the "@" symbol with the logical !(NOT) operator. If so, we'll set up an error message. */
     /*At the end we will return the errors object. If there were any validation errors for any of the fields, then the corresponding property in the errors object should contain an error message. If not it should contain an empty string. */
    validate(firstName, lastName, phoneNum, email) {
        const errors = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: ''
        };

        if(this.state.touched.firstName) {
            if(firstName.length < 2) {
                errors.firstName = "First name must be at least 2 characters.";
            } else if (firstName.length > 15) {
                errors.firstName = "First name must be 15 or less characters.";
            }
        }

        if(this.state.touched.lastName) {
            if(lastName.length < 2) {
                errors.lastName = "Last name must be at least 2 characters.";
            } else if (lastName.length > 15) {
                errors.lastName = "Last name must be 15 or less characters.";
            }
        }
    
        const reg = /^\d+$/;
        if(this.state.touched.phoneNum && !reg.test(phoneNum)) {
            errors.phoneNum = "The phone number should contain only numbers.";
        }

        if(this.state.touched.email && !email.includes("@")) {
            errors.email = "Email should contain a @.";
        }
       
        return errors;

    }

    /*We don't need to bind the handleBlur method like the other ones above is because we will use an arrow function which allows it to have access to the state. Also we are not passing "even" here but "field" instead.Inside this method we will use setState() to change the "touched" object. We don't want to change the entire "touched" object, we only wnat to change one of the properties inside it.We do it by using the spread syntax. This will spread out the this.state.touched object, then will update the property that corresponds to the filed that triggered this event(if the user entered some input into first or last name or phine or email etc.We are using the computed property [field] to get the name of the property that was changed, and we will set the value of [field] to true so we know that the property was touched.) */
    handleBlur= (field) => () => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }
    /*The touched property is needed for form validation. It means if an input field has been "touched" by the user.We will set it up as an object.The touched property will keep track if the things listed inside it have been touched or not(if the user has entered anything in that field or not). The initial value for those fields is false(they are untouched).That way we know that if an input field has not been touched we don't need to run validation on that field yet. In order to know if the user has entered something into the input field we use an event called Blur which fires when the user enters something into the field and then leaves it. In the form bellow we will enter onBlur event handler set to a method called handleBlur.*/
    

    /*The following method will be set up to handle changes to form elements. We will be passing an event object. We are setting up the target and name variables to make it easier to access later the properties event.target and event.target.name. */
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
 
    /*We will create another errors varibale inside the render method as the one entered in the validate method is localy scoped and is not available here. Using this new errors varibale we will call the validate mathod using "this" keyword.We will pass in the current values of the first, last name, phone and email which are stored in the state and we have access to them. */
    /*Then the validate method will check those fields and return the errors object which will then be stored inside this errors variable. */
    /*Any time there is a change in those input fields this component will be re-rendered so this validate method will be called at every change. */
    /*Then in the form we need to set an "invalid" attribute for each inout field that we are validating.This invalid attribute will be a boolean attribute. For it's value we will set a condition that checks if there is an errors messages set for this field. An empty string will evaluate as false but if the entered input is not an empty string it will evaluate as true, so then the invalid attribute is set to true. Then below each of the inputs we are validating we'll render the <FormFeedback> component. */
    /*In the <FormFeedback> component we will render the errors message. */
    render() {

        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.phoneNum, this.state.email)

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

                {/*The following code contains the Feedback form. In the <Col> or <Label> reactstrap components we can set the margins as md={10} which is the same as className="col-md-10". In the <Label> component instead of using the "for" attribute we use htmlFor as we are in JSX. In some of the <Col> components we are using md={{size: 4,offset: 2}}. First set of {} is because we are using JS in JSX, second set of {} is because we are defining an object.This allows us to set up both the responsive size and the responsive offset for the column at the same time. This is the same as writting <div class="col-md-4 offset-md-2">. We set the usual html attributes in the input tags but to make this a control form we need to set the value property that we defined before to be ={this.state.phoneNum} or whatever is applicable to the specif. input field. The exception is the input with type of checkbox. There instead of value we will use the checked attribute. Each input component also gets an onChange event handler that is set to the handleInputChange() method that was created earlier. The start <Form> tag will get an onSubmit event handler set to the method handleSubmit().Explanation about the onBlur eventhandler is by the "touched" property of the state.*/}
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
                                        invalid={errors.firstName}
                                        onBlur={this.handleBlur("firstName")}
                                        onChange={this.handleInputChange} />
                                        <FormFeedback>{errors.firstName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        invalid={errors.lastName}
                                        onBlur={this.handleBlur("lastName")}
                                        onChange={this.handleInputChange} />
                                        <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                        invalid={errors.phoneNum}
                                        onBlur={this.handleBlur("phoneNum")}
                                        onChange={this.handleInputChange} />
                                        <FormFeedback>{errors.phoneNum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        invalid={errors.email}
                                        onBlur={this.handleBlur("email")}
                                        onChange={this.handleInputChange} />
                                        <FormFeedback>{errors.email}</FormFeedback>
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