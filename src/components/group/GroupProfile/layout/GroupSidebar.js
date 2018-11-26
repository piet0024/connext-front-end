import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

class GroupSidebar extends Component {
    render() {
        return (
            <Card>
                <CardHeader>
                    Group Description 
                </CardHeader>
                <CardBody>
                    {this.props.description}
                </CardBody>
            </Card>
        );
    }
}

export default GroupSidebar;