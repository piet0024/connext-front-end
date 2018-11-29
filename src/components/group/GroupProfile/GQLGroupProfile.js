import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import GroupNav from './layout/GroupNav';
import GroupSidebar from './layout/GroupSidebar';
import GroupPost from './layout/GroupPost';
import GroupHeader from './layout/GroupHeader';
import { Row, Col, } from 'reactstrap';

const queryGroupInfo = gql`
    query GetGroupById($id: ID!) {
        group(id: $id) {
            id
            name
            description
            members {
                id
                username
            }
            posts {
                id
                user {
                    id
                    username
                }
                group {
                    id
                    name
                }
                createdAt
                likedBy {
                    username
                }
                content
                comments {
                    id
                    createdAt
                    user {
                        id
                        username
                    }
                    content
                }
            }
        }
    }
`

class GQLGroupProfile extends Component {
    render() {
        return(
            <Query query={queryGroupInfo} variables={{ id: this.props.id}}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return `Error!: ${error}`;
                    return (
                    <div>
                        <GroupHeader id={data.group.id} name={data.group.name} />
                        <Row>
                            <Col sm="2">
                                <GroupNav id={this.props.id} />
                            </Col>
                            <Col sm="7">
                                <GroupPost id={this.props.id} members={data.group.members} posts={data.group.posts}/>
                            </Col>
                            <Col sm="3">
                                <GroupSidebar id={this.props.id} description={data.group.description} />
                            </Col>
                        </Row>
                    </div>
                    )
                }}
            </Query>
        );
    }
}

export default GQLGroupProfile;