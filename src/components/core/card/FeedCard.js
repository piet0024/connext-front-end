import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter, CardLink, Button, Row, Col } from 'reactstrap';

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

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
            status: ""
        };

    }

    render() {
        var likes = [];
        this.props.data.likedBy.map(user => {
            likes.push(user.username);
            return null;
        });
        return(
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
                        <Col md="9">
                            likedBy: 
                            {this.props.data.likedBy.map(user => (
                                    user.username + ","
                                )
                            )}
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        );
    }
}

export default FeedCard;