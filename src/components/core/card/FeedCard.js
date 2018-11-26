import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter, CardLink, Button } from 'reactstrap';

class FeedCard extends Component {
    render() {
        return(
            <Card>
                <CardBody>
                    <div className="mb-3">
                        <CardTitle>
                            <CardLink href="#">Person's Name</CardLink> >
                            <CardLink href="#" className="ml-1">Group Name</CardLink>
                        </CardTitle>
                        <CardSubtitle className="text-muted">
                            Time Stamp
                        </CardSubtitle>
                    </div>
                    <CardText>
                        Content of the Card
                    </CardText>
                </CardBody>
                <CardFooter>
                    <Button>Like</Button>
                </CardFooter>
            </Card>
        );
    }
}

export default FeedCard;