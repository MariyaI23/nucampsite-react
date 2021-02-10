import React, {Component} from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import {NavLink} from "react-router-dom";

class Header extends Component {
    /*We need to add a constructor and a state in order to make the Navbar responsive. */
     /*the isModalOpen will be a boolean property initialy set to false. This property will keep track if the modal is open or not. */
    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);       {/*Here we are binding the eventhandler(the toggleNav method) to the component, so when the eventhandler is called it will refer correctly to "this" which is the component. */}
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
    }

    /*Bellow we are setting up a method to handle when the NavBarToggler is clicked. When this method is triggered it will change the state using setState to the oposite of the current state. We are using the logical not operator in this case "!". */
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    /*Now we are setting up a toggleModal method just like the togleNav method above. We will also bind this method in the constructor above. */
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    /*Now we will set up the handleLogin method(event handler) used in the <Form> component. Since we are not using a backend to handle the data submission, we will just set up an alert to alert us of the form's values.We will use this.toggleModal to close the modal, and event.preventDefault to prevent the whole page from being re-rendered. Next we need to also bind this handleLogin event handler in the constructor*/
    handleLogin(event) {
        alert(`Username: ${this.username.value} Password: ${this.password.value} Remember: ${this.remember.checked}`);
        this.toggleModal();
        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>     {/*Instead of wrapping the whole return statement in a div which will serve no other purpose and will add unnecessary node to the DOM, we can use React.Fragment. It will satisfy the requirement to return only a single element and it will not add another node to the DOM. The shorthand version will be jus to wrap the return elements in <> </>. But this is not fully supported yet. */}
                <Jumbotron fluid>
                    <div className = "container">
                        <div className = "row">
                            <div className = "col">
                                <h1>NuCamp</h1>
                                <h2>a better way to camp</h2>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark sticky = "top" expand = "md">   {/* The sticky="top" is taken from the reactstrap documentation. The expand attaribute is from bootstrap and will make the navbar expand for sizez meduim an up, but it will collapse and show the toggler for sizes sm and extra-sm.*/}
                  <div className = "container">
                      <NavbarBrand className = "mr-auto" href = "/"><img src = "assets/images/logo.png" height = "30" width = "30" alt = "NuCamp Logo" /></NavbarBrand>
                      <NavbarToggler onClick = {this.toggleNav} />    {/*The onClick event here will make it so, when the Navbar Toggler is clicked it will trigger the toggleNav method/event. */}
                      <Collapse isOpen = {this.state.isNavOpen} navbar>   {/*Here is we are setting up the Collapse React-Router attribute and are using an attribute: isOpen setting to either false or true depending on the current state. We are adding a navbar attaribute as well per reactstrap documentation */}
                          <Nav navbar>                                    {/*We are setting up the links towards each part of our page. Each NavLink is a separate NavItem in the Nav React-Router component. */}
                              <NavItem>
                                  <NavLink className = "nav-link" to ="/home">
                                      <i className = "fa fa-home fa-lg" /> Home
                                  </NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink className = "nav-link" to = "/directory">
                                      <i className = "fa fa-list fa-lg" /> Directory
                                  </NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink className = "nav-link" to = "/aboutus">
                                      <i className = "fa fa-info fa-lg" /> About
                                  </NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink className = "nav-link" to = "/contactus">
                                      <i className = "fa fa-address-card fa-lg" /> Contact Us
                                  </NavLink>
                              </NavItem>
                          </Nav>
                          <span className="navbar-text ml-auto">         {/*We are using a JSX span element to wrap a button component for the modal. We are placing it here so it is still inside the Collapse component so it will show when the navbar is collapsed. We are styling it so it will be the same style as the rest of the navbar items.The ml-auto will allign it horizontally to the right. */}
                              <Button outline onClick={this.toggleModal}>
                                  <i className=" fa fa-sign-in fa-lg" /> Login
                              </Button>
                          </span>
                      </Collapse>
                  </div>
                </Navbar>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>                                               {/*The reactstrap <Modal> component comes with 2 built in attributes: isOpen and toggle. The shown value of the isOpen attribute means that when this state is false which initily we set it to be -the modal will be closed/hidden. If the state changes to true, the modal will be open/visible. The toggle attribute will also be added to the modalHeader, that way it will provide a way to close the modal if it has been opened. */}
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" 
                                innerRef = {input => this.username=input} />     {/*Since we are using uncontrolled forms here in the HeaderComponent we need a way to set the values of the input fields. We will user the innerRef attribute and set it to a call back function where the value of the input field is passed.Then we define the property of each input field: this. username etc. and set it to equal the value of the input field(whatever the user entered) */}
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" 
                                innerRef={input => this.password = input}/>
                            </FormGroup>
                            <FormGroup check>     {/*For the checkboxes reactstrap requires us to add the check boolean attribute in the FormGroup component and in the Label component. Also the Input component must be nested inside the Label Component.In that case we don't need the htmlFor attribute in the label tag or the id attribute in the input tag */}
                                <Label check>
                                    <Input type="checkbox" name="remember" innerRef={input => this.remember = input}/>
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
           </React.Fragment>
        );
    }
}

export default Header;