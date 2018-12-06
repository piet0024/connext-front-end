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
        }
    }
`

class GQLGroupProfile extends Component {
    render() {
        return(
            <Query query={queryGroupInfo} variables={{ id: this.props.id}}>
                {({ loading, error, data }) => {
                    if (loading) return (<div className="lds-ripple"><div></div><div></div></div>);
                    if (error) return `Error!: ${error}`;
                    return (
                    <div>
                        <GroupHeader id={data.group.id} name={data.group.name} />
                        <Row>
                            <Col sm="2">
                                <GroupNav id={this.props.id} />
                            </Col>
                            <Col sm="7">
                                <GroupPost id={this.props.id} members={data.group.members} />
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