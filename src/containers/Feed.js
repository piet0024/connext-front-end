import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import List from '../components/feed/List';

class Feed extends Component {
    render() {
        return(
            <Row>
                <Col sm="8">
                    <List />
                </Col>
                <Col sm="4">
                    Sidebar Here
                </Col>
            </Row>
        )
    }
}

export default Feed;