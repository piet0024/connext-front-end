import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter, CardLink, Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import CommentEditor from "./CommentEditor";

const LIKE_POST = gql`
  mutation LikePost($postid: ID!, $username: String!) {
    likePost(
        postid: $postid,
        user: {
            username: $username
        }
    ) {
        id
    }
  }
`;

const UNLIKE_POST = gql`
  mutation UnlikePost($postid: ID!, $username: String!) {
    unlikePost(
        postid: $postid,
        user: {
            username: $username
        }
    ) {
        id
    }
  }
`;

class FeedCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            liked: "",
            status: "",
            commentToggle: false
        };
    }

    toggle(self) {
        self.setState(prevState => ({
            commentToggle: !prevState.commentToggle
        }));
    }

    render() {
        var likes = [];
        this.props.data.likedBy.map(user => {
            likes.push(user.username);
            return null;
        });
        return(
            <div>
                <Card>
                    <CardBody>
                        <div className="mb-3">
                            <CardTitle>
                                <CardLink href="#">{this.props.data.user.username}</CardLink> >
                                <CardLink href="#" className="ml-1">{this.props.data.group.name}</CardLink>
                            </CardTitle>
                            <CardSubtitle className="text-muted">
                                {this.props.data.createdAt}
                            </CardSubtitle>
                        </div>
                        <CardText>
                            {this.props.data.content}
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col md="3">
                                {(!likes.includes(this.props.currentUser.username) || (this.state.liked === "true" && this.state.status === "LIKE")) ?  
                                    <Mutation mutation={LIKE_POST}>
                                        {(LikePost, { data }) => (
                                            <Button onClick={() => {
                                                LikePost({ variables: { 
                                                    postid: this.props.data.id,
                                                    username: this.props.currentUser.username
                                                } });
                                                this.setState({liked: "true", status: "UNLIKE"});
                                            }}>LIKE</Button>
                                        )}
                                    </Mutation>
                                    :
                                    <Mutation mutation={UNLIKE_POST}>
                                        {(LikePost, { data }) => (
                                            <Button onClick={() => {
                                                LikePost({ variables: { 
                                                    postid: this.props.data.id,
                                                    username: this.props.currentUser.username
                                                } });
                                                this.setState({liked: "true", status: "LIKE"});
                                            }}>UNLIKE</Button>
                                        )}
                                    </Mutation> 
                                }
                            </Col>
                            <Col md="3">
                                likedBy: 
                                {this.props.data.likedBy.map(user => (
                                        user.username + ","
                                    )
                                )}
                            </Col>
                            <Col md="6">
                                <Button onClick={() => this.toggle(this)}>Comment</Button>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
                {
                    this.props.data.comments.map(comment => (
                        <Card style={{padding: "25px", marginLeft: "25px", marginRight: "25px"}}>
                            <CardBody>
                                <CardTitle>
                                    <CardLink href="#">{comment.user.username}</CardLink>
                                </CardTitle>
                                <CardSubtitle className="text-muted">
                                    {comment.createdAt}
                                </CardSubtitle>
                            </CardBody>
                            <CardText>
                                {comment.content}
                            </CardText>
                        </Card>
                    ))
                }
                {(this.state.commentToggle) ? <CommentEditor this={this} toggle={this.toggle} currentUser={this.props.currentUser} post={this.props.data} /> : null}
            </div>
            
        );
    }
}

FeedCard.propTypes = {
    key: PropTypes.string,
    data: PropTypes.object,
    currentUser: PropTypes.object
};

export default FeedCard;