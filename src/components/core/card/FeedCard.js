import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter, CardLink, Button, Row, Col, CardHeader } from 'reactstrap';
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
                                {(!likes.includes(this.props.currentUser.username) || (this.state.liked === "true" && this.state.status === "LIKE")) ?  
                                    <Mutation mutation={LIKE_POST}>
                                        {(LikePost, { data }) => (
                                            <Button onClick={() => {
                                                LikePost({ variables: { 
                                                    postid: this.props.data.id,
                                                    username: this.props.currentUser.username
                                                } });
                                                this.setState({liked: "true", status: "UNLIKE"});
                                            }}
                                            color="link">Like</Button>
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
                                            }}
                                            color="link">Unlike</Button>
                                        )}
                                    </Mutation> 
                                }
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
                <div>
                    <Button color="link" onClick={() => this.toggle(this)}>Comment</Button>    
                </div>                            
                {(this.state.commentToggle) ? <CommentEditor this={this} toggle={this.toggle} currentUser={this.props.currentUser} post={this.props.data} /> : null}
                </CardFooter>
                </div>
                </Card>
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