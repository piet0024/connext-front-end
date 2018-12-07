import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

import groupAvatar from '../../../../assets/img/group_avatar_min.jpg';

class GroupHeader extends Component {
    render() {
        return(
            <Row className="mt-2 mb-2">
                <Col sm="2">
                    <img
                        src={groupAvatar}
                        className="group-avatar justify-content-sm-center"
                    />
                </Col>
                <Col sm="7">
                    <h1 className="align-middle">{this.props.name}</h1>
                </Col>
                <Col sm="3">
                    <Button>
                        Join Group
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default GroupHeader;