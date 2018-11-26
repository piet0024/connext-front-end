import React, { Component } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import GroupNav from './layout/GroupNav';
import GroupSidebar from './layout/GroupSidebar';
import GroupPost from './layout/GroupPost';
import GroupHeader from './layout/GroupHeader';
import { Row, Col, } from 'reactstrap';

const queryGroupInfo = gql`
    query groups($id: ID!) {
        groups(id: $id) {
            id
            name
            description
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
                        <GroupHeader id={data.groups[0].id} name={data.groups[0].name} />
                        <Row>
                            <Col sm="2">
                                <GroupNav id={this.props.id} />
                            </Col>
                            <Col sm="7">
                                <GroupPost id={this.props.id} />
                            </Col>
                            <Col sm="3">
                                <GroupSidebar id={this.props.id} description={data.groups[0].description} />
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