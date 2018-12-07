import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import List from '../components/feed/List';

class Feed extends Component {
    render() {
        return(
            <Row>
                <Col sm="8">
                    <List />
                </Col>
                <Col sm="4">
                    <Card className="mb-2">
                        <CardBody>
                            Imagine some nice sidebar content here. I can see it now! Tutorials! Recommendations! Trending Topics! Anything but advertisments please! 
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            Imagine some nice sidebar content here
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default Feed;