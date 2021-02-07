import React from "react";
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from "react-router-dom";

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

function RenderComments({comments}) {
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

/*Next we will turn the render method of the class component into a CampsiteInfo functional component */

function CampsiteInfo(props) {
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
                <RenderComments comments = {props.comments} />
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
