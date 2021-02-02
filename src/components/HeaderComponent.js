import React, {Component} from "react";
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

class Header extends Component {
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
                <Navbar dark sticky = "top">   {/* The sticky="top" is taken from the reactstrap documentation. */}
                  <div className = "container">
                      <NavbarBrand href = "/">NuCamp</NavbarBrand>
                  </div>
                </Navbar>
           </React.Fragment>
        );
    }
}

export default Header;