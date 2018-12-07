import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter, CardLink, Button, Row, Col, CardHeader } from 'reactstrap';

class HomeFeedCard extends Component {
    render() {
        return(
            <div className="mb-2">
                <Card>
                    <div>
                        <CardHeader className="mb-3">
                            <CardTitle>
                                <CardLink href="#">{this.props.data.user.username}</CardLink> >
                                <CardLink href={"/g/" + this.props.data.group.id} className="ml-1">{this.props.data.group.name}</CardLink>
                            </CardTitle>
                            <CardSubtitle className="text-muted">
                                {this.props.data.createdAt}
                            </CardSubtitle>
                        </CardHeader>
                        <CardBody>
                        <CardText>
                            {this.props.data.content}
                        </CardText>
                                <span>({this.props.data.likedBy.length})</span>

                                </CardBody>
                            <CardFooter>
                            <ul class="list-unstyled">
                            {
                    this.props.data.comments.map(comment => (
                        <li className="media media-comment pl-5">
                            <div className="media-body">
                                <div className="media-heading">
                                    <a href="#" className="mr-2">{comment.user.username}</a>
                                    <small className="text-muted">
                                        {comment.createdAt}
                                    </small>
                                </div>
                                <div>
                                   {comment.content} 
                                </div>
                            </div>
                        </li>
                    ))
                }
                            </ul>
                </CardFooter>
                </div>
                </Card>
            </div>
        )
    }
}

export default HomeFeedCard;