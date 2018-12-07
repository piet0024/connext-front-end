import React, { Component } from 'react';
import { Card, CardBody, CardText, CardLink, CardTitle, Button, CardHeader, Col } from 'reactstrap';

class GroupCard extends Component {
    render() {
        return(
            <Col sm="4">
            <Card>
                <CardBody>
                <CardTitle>
                   <CardLink
                        href={"/g/" + this.props.data.id}
                    >
                        {this.props.data.name}
                    </CardLink> 
                </CardTitle>
                <Button>
                    Imagine a Button!
                </Button>
                    </CardBody>
            </Card>
            </Col>
        );
    }
}

export default GroupCard;