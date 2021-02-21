import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row} from 'reactstrap';
import {Link} from "react-router-dom";
import { Control, Form, Errors } from 'react-redux-form';

/*Setting up functions to help with the validation of the react-redux form */
/*the "required" function takes "val"(value) as an argument and checks if a value was received(that input was entered by user). Otherwise "val" will evaluate as false if it was undefined or null. */
/*Then "required" will check to make sure that lenght of the "val" string received is greater than 0. If no input was entered this will evaluate as false and will create an error. */
/*The maxLength function requires to be wrapped in another function due to the way it will be called later. The first one takes the maximum length, then the second one takes the value(the input string) */
/*Then from inside the inner function we want to return true if the max length has not been exceeded.So !val will return true because if there is no value, then the maximum length clearly has not been exceeded OR(||)  we will also return true if the value's length is less than or equal to the maximum. If both of these conditions are false than the function will return false for maxLength and it will create an error.*/
/*minLength works similarly. It wraps a function in a function and the inner function will return true if there is a value and if that value is greater than or equal to the minimum. If not-it will return as false for minLength and that will create an error. */
/*Next function isNumber will check to see if the value entered is a number.We are using the + unary operator to turn the value into a number if possible, if not possible it will return NaN. Then with !NaN we are checking to see if the value is oposite of NaN. Ultimatelly if it is a valid number this(!NaN) will return as true(like saying-this is NOT NaN), otherwise-false. */
/*With the last function we will use a regular expression to check if the email input is correct. The first part [A-Z0-9._%+-] checks to see if the first part of the email contains any of those permited letters(from A-Z), numbers(from 0-9) and symbols(._%+-). Then we check to see if there is the @ symbol and following that where the domain name would be we are permitting letters(A-Z), again numbers(0-9) any number of times. After that a . is required(\.) then the domain extension which can be any letters(A-Z) but only between 2 and 4 letters {2,4} */
/*At the end of the regular expression we are using the JS built in method test() which will test whatever value is passed in to see if it matches the regex pattern. */
/*Each of these form validation functions will be implemented in the Form below in the Controls tags. */

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     /*Below we will set up the form validation method, passing in the properties we need to validate. Inside this method we'll set up an errors object. The properties of this object will hold the error messages for the for fields if there are any errors. Each will be initialized with an empty string("") which means there are no errors. */
     /*The first if statement will check if the firstName field has been touched. If yes, then another if statement nested inside the first one will check if the lenght of the value that was entered inside that field is < 2. If so, then we are setting up and error message for the fist name.Then we are setting up an else if check to see if the first name is > 15 characters. If so then we'll set up another error message for that. The same validation logic will be used for the last name.*/
     /*To check the phone number we need to use a regular expression to make sure that the phone number entered contains only digits(that is what \d stands for). The if statement will check if the phoneNum field has been touched AND(&&) if it failed the reg.expr. test with the logical NOT operator-!(basically saying-it is not true that the number contains digits only). If so, then an error message will be sent for that. */
     /*With the email field we will check if the email field has been touched AND(&&) if the string entered  DOESN'T include the "@" symbol with the logical !(NOT) operator. If so, we'll set up an error message. */
     /*At the end we will return the errors object. If there were any validation errors for any of the fields, then the corresponding property in the errors object should contain an error message. If not it should contain an empty string. */
     /*After implementing react-redux-form we no longer need the validate method. */

    /*validate(firstName, lastName, phoneNum, email) {
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

    }*/

    /*The code until the handleSubmit() is commented out as we are implementing redux */
    /*We don't need to bind the handleBlur method like the other ones above is because we will use an arrow function which allows it to have access to the state. Also we are not passing "even" here but "field" instead.Inside this method we will use setState() to change the "touched" object. We don't want to change the entire "touched" object, we only wnat to change one of the properties inside it.We do it by using the spread syntax. This will spread out the this.state.touched object, then will update the property that corresponds to the filed that triggered this event(if the user entered some input into first or last name or phine or email etc.We are using the computed property [field] to get the name of the property that was changed, and we will set the value of [field] to true so we know that the property was touched.) */
   /* handleBlur= (field) => () => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }*/
    /*The touched property is needed for form validation. It means if an input field has been "touched" by the user.We will set it up as an object.The touched property will keep track if the things listed inside it have been touched or not(if the user has entered anything in that field or not). The initial value for those fields is false(they are untouched).That way we know that if an input field has not been touched we don't need to run validation on that field yet. In order to know if the user has entered something into the input field we use an event called Blur which fires when the user enters something into the field and then leaves it. In the form bellow we will enter onBlur event handler set to a method called handleBlur.*/
    

    /*The following method will be set up to handle changes to form elements. We will be passing an event object. We are setting up the target and name variables to make it easier to access later the properties event.target and event.target.name. */
    /*With the value variable we are using a ternary operator which checks if the type of the form element that triggered this event is a checkbox then we get the value from the target's checked attribute. The checked attribute is a boolean attribute and can be either true or false. If the form element is NOT a checkbox, then we get the value from the target's value.*/
    /*After that we are useing setState() method with a computed property name in order to set the property based on the target's name. Depending on which form element triggered this event, that "name" could be firstName, lastName, email etc. We want this to be flexible so the "name" is taken from the input that was changed which we get through the "event" object that was passed in rather than being hard coded here. For the value of the computed propert[name] we will use the variable "value" so we can get everything that is stored in it. After that we go back up to the constructor of the class component above and we need to bind the "this" keyword to this handleInputChange() method. */
   /* handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === "checkbox" ? target.checked : target.value;

        this.setState({
            [name]: value
        })
    }*/


    /*For now we are setting up the handleSubmit() method to log the current state to the console. Since console.log expects a string, not an object, we will use a global method that will help make a string from a JS object. It is called JSON.stringify method. We are adding the same thing as an alert as well just in case so we will get this message in the console and as an alret as well. Then again we need to go back up to the constructor of the class component above and bind the "this* keyword to this event as well. After implementing react-redux-form, the word"event" in the parameter list was changed to values and (this.state) after.JSON.stringify was also replaced with values. */
    /*We are adding the resetFeedbackForm to the handleDubmit method as props to make sure that once the form is submitted the input fields will go back to their initial state and the form will be cleared. */
    handleSubmit(values) {
        //console.log("Current state is " + JSON.stringify(values));
        //alert("Current state is " + JSON.stringify(values));
        this.props.resetFeedbackForm();
        this.props.postFeedback(values);
    }
 

    /*We will create another errors varibale inside the render method as the one entered in the validate method is localy scoped and is not available here. Using this new errors varibale we will call the validate mathod using "this" keyword.We will pass in the current values of the first, last name, phone and email which are stored in the state and we have access to them. */
    /*Then the validate method will check those fields and return the errors object which will then be stored inside this errors variable. */
    /*Any time there is a change in those input fields this component will be re-rendered so this validate method will be called at every change. */
    /*Then in the form we need to set an "invalid" attribute for each inout field that we are validating.This invalid attribute will be a boolean attribute. For it's value we will set a condition that checks if there is an errors messages set for this field. An empty string will evaluate as false but if the entered input is not an empty string it will evaluate as true, so then the invalid attribute is set to true. Then below each of the inputs we are validating we'll render the <FormFeedback> component. */
    /*In the <FormFeedback> component we will render the errors message. */
    /*After we commented out the validate method we no longer need the errors variable that was calling that method. */
    
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

                {/*The following code contains the Feedback form. In the <Col> or <Label> reactstrap components we can set the margins as md={10} which is the same as className="col-md-10". In the <Label> component instead of using the "for" attribute we use htmlFor as we are in JSX. In some of the <Col> components we are using md={{size: 4,offset: 2}}. First set of {} is because we are using JS in JSX, second set of {} is because we are defining an object.This allows us to set up both the responsive size and the responsive offset for the column at the same time. This is the same as writting <div class="col-md-4 offset-md-2">.*/}
                 {/*We set the usual html attributes in the input tags but to make this a control form we need to set the value property that we defined before to be ={this.state.phoneNum} or whatever is applicable to the specif. input field. The exception is the input with type of checkbox. There instead of value we will use the checked attribute. Each input component also gets an onChange event handler that is set to the handleInputChange() method that was created earlier.*/} 
                 {/*The start <Form> tag will get an onSubmit event handler set to the method handleSubmit().Explanation about the onBlur eventhandler is by the "touched" property of the state. After implementing react-redux-form we changed the <Form> tag to <LocalForm>.*/}
                 {/*In order to still be able to use the handleSubmit method in the <LocalForm> tag with react-redux-form we need to make into an arrow function and pass the "values" to it. */}
                 {/*We also had to replace the <FormGroup> tags from reactstrap to <Row> tags from react-redux form and give them a class of form-group, */}
                 {/*The input tags where changed to Control tags from react-redux-form, the type html attribute was removed and the type of input is specified by adding for ex. .text after Control. */}
                 {/*In the control tags we add model property which tells redux that the value of lets say the first name input field will be stored in the state under the property name of firstName. The value for the model attribute will always be the same as the value of the name attribute but with a . in front of it. */}
                 {/*In the Control tags we will implement an attribute called validators. For the value we will use the appropriate functions(or rather the variables that we assigned the functions to) we set up for validating the form above. */}
                 {/*In the Controls tag for the first name the validators attribute will use several values. for the minLength and maxLenght we are also setting that we want minLength of 2 characters and maxLength of 15. */}
                 {/*After the Cotrols tag we will implement the Errors tag(component) with the attributes of className="text-danger" for making the text red; the model attribute needs to match the model of the corresponding Controls component. The show="touched" will cause the form to only show error messages if it has been touched by the user. The component="div" tells react-redux-form to wrap each message in a div. The messages attribute will contain the error messages which will be shown for the functions that are inside of it. For ex. if the "required" function comes back false it will show the message that this field is required.*/}
                 {/*In order to be able to connect the form to the state in the redux store we had to change LocalForm to Form and add a model set to feedbackForm. */}
                
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Send us your Feedback</h2>
                        <hr />
                    </div>
                    <div className="col-md-10">
                        <Form model="feedbackForm" onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstName" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators = {{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                        /*value={this.state.firstName}
                                        invalid={errors.firstName}
                                        onBlur={this.handleBlur("firstName")}
                                        onChange={this.handleInputChange}*/ 
                                     />
                                     <Errors
                                         className="text-danger"
                                         model=".firstName"
                                         show="touched"
                                         component="div"
                                         messages = {{
                                             required: "Required",
                                             minLength: "Must be at least 2 characters",
                                             maxLength: "Must be 15 characters or less"
                                         }}
                                      />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model = ".lastName" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators = {{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                        /*value={this.state.lastName}
                                        invalid={errors.lastName}
                                        onBlur={this.handleBlur("lastName")}
                                        onChange={this.handleInputChange} */
                                    />
                                      <Errors
                                         className="text-danger"
                                         model=".lastName"
                                         show="touched"
                                         component="div"
                                         messages = {{
                                             required: "Required",
                                             minLength: "Must be at least 2 characters",
                                             maxLength: "Must be 15 characters or less"
                                         }}
                                      />
                                </Col>                        
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Control.text model=".phoneNum" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        className="form-control"
                                        validators= {{
                                            required,
                                            minLength: minLength(10),
                                            maxLength: maxLength(15),
                                            isNumber
                                        }}
                                        /*value={this.state.phoneNum}
                                        invalid={errors.phoneNum}
                                        onBlur={this.handleBlur("phoneNum")}
                                        onChange={this.handleInputChange} */
                                    />
                                      <Errors
                                         className="text-danger"
                                         model=".phoneNum"
                                         show="touched"
                                         component="div"
                                         messages = {{
                                             required: "Required",
                                             minLength: "Must be at least 10 numbers",
                                             maxLength: "Must be 15 numbers or less",
                                             isNumber: "Must be a number"
                                         }}
                                      />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required,
                                            validEmail
                                        }}
                                        /*value={this.state.email}
                                        invalid={errors.email}
                                        onBlur={this.handleBlur("email")}
                                        onChange={this.handleInputChange} */
                                    />
                                      <Errors
                                         className="text-danger"
                                         model=".email"
                                         show="touched"
                                         component="div"
                                         messages = {{
                                             required: "Required",
                                             validEmail: "Invalid email address"
                                         }}
                                      />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 4, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox
                                                model=".agree"
                                                name="agree"
                                                className="form-check-input"
                                                /*checked={this.state.agree}
                                                onChange={this.handleInputChange}*/ 
                                            /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <Control.select model=".contactType" name="contactType"
                                            className="form-control"
                                            /*value={this.state.contactType}
                                            onChange={this.handleInputChange}*/  >
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".feedback" id="feedback" name="feedback"
                                        rows="12"
                                        className="form-control"
                                       /* value={this.state.feedback}
                                        onChange={this.handleInputChange} */
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;