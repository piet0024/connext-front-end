import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

class GroupHeader extends Component {
    render() {
        return(
            <Row>
                <Col sm="2">
                    Avatar
                </Col>
                <Col>
                    <h1>{this.props.name}</h1>
                </Col>
                <Col>
                    <Button>
                        Join Group
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default GroupHeader;