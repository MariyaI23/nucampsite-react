import React, {Component} from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import {NavLink} from "react-router-dom";

class Header extends Component {
    /*We need to add a constructor and a state in order to make the Navbar responsive. */
    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);       {/*Here we are binding the eventhandler(the toggleNav method) to the component, so when the eventhandler is called it will refer correctly to "this" which is the component. */}

        this.state = {
            isNavOpen: false
        };
    }
    /*Bellow we are setting up a method to handle when the NavBarToggler is clicked. When this method is triggered it will change the state using setState to the oposite of the current state. We are using the logical not operator in this case "!". */
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
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
                      </Collapse>
                  </div>
                </Navbar>
           </React.Fragment>
        );
    }
}

export default Header;