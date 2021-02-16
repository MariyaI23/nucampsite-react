import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import {Link} from "react-router-dom";
import {Control, LocalForm, Errors} from "react-redux-form";
import { Loading } from "./LoadingComponent";


const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

/*Since this component is a presentational component we will redo it using functional components. The original commented out class component bellow will be split up into 3 functional components for each of the class component's methods */
/*In the parameter list of the first component again we are destructuring the campsites object. */
function RenderCampsite({campsite}) {
    return (
        <div className = "col-md-5 m-1">
            <Card>
                <CardImg top src = {campsite.image} alt = {campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

/*START TASK 1  then go to RenderComments component below where I have rendered this CommentForm component.That finishes TASK 1 I also had to import {Component at the top and Button from reactstrap}*/
/*TASK 2 creates the MODAL and it's fields in the CommentForm component. Adds the constructor and everything in it and creates the toggleModal and handleSubmit functions*/
/*TASK 3-validation for min and max length of the author field */
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isModalOpen: false,
            author: '',
            touched: {
                author: false
            }
        };

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

   //The this.props.addComment action creator was added to the handleSubmit method as props so when a new comment is submitted the addComent will create an action using the values from this form. Then that action will be dispatched to it's reducer which will update the state. 

    handleSubmit(values) {
    
        this.toggleModal();  
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {
        return (
            <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text 
                                    model=".author" 
                                    id="author" 
                                    name="author" 
                                    className="form-control" 
                                    placeholder="Your Name"
                                    validators = {{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: "Must be at least 2 characters",
                                        maxLength: "Must be 15 characters or less"
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea 
                                    model=".text" 
                                    id="text" 
                                    name="text"
                                    rows="6"
                                    className="form-control"
                                />
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>
            </React.Fragment>
        );
    }
}



function RenderComments({comments, addComment, campsiteId}) {
    if(comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment =>
                <div key={comment.id}><p>{comment.text}
                <br/> {comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </div>
                )}
                <CommentForm  campsiteId={campsiteId} addComment={addComment} />
            </div>
        );
    }
    return <div /> 
}

/*Next we will turn the render method of the class component into a CampsiteInfo functional component */
//In the RenderComments component below we are adding the action creator function-addComment as a prop along with the campsite's id. Then  we will go up to the RenderComments function and we will add the addComment and campsiteId to the parameter list(which is destructured). We will pass these also to the CommentForm at the end of the RenderComments' function. Then we need to pass this props in the CommentForm function to the handleSubmit method.
function CampsiteInfo(props) {
    if(props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    
    if(props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

    if(props.campsite) {
        return (
        <div className="container">
            <div className="row">
                <div className="col">
                <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/directory">Directory</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>
            <div className = "row">
                <RenderCampsite campsite = {props.campsite} />
                <RenderComments 
                    comments = {props.comments}
                    addComment = {props.addComment}
                    campsiteId = {props.campsite.id}
                 />
            </div>
        </div>
        );
    }
    return <div />;
}

export default CampsiteInfo




/*class CampsiteInfo extends Component {
  
    
    renderCampsite(campsite) {
        return (
            <div className = "col-md-5 m-1">
                <Card>
                    <CardImg top src = {campsite.image} alt = {campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }


    renderComments(comments) {
        if(comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment =>
                    <div key={comment.id}><p>{comment.text}
                    <br/> {comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                    )}
                </div>
            );
        }
        return <div />
    }

    
    render() {
        if(this.props.campsite) {
            return (
            <div className="container">
                <div className = "row">
                    {this.renderCampsite(this.props.campsite)}
                    {this.renderComments(this.props.campsite.comments)}
                </div>
            </div>
            );
        }
        return <div />;

    }

}


export default CampsiteInfo  */
