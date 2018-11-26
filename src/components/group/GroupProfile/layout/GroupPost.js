import React, { Component } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import List from '../../../feed/List';

// Todo wrap in a feed query components, with mutation component on the form

class GroupPost extends Component {
    render() {
        return(
            <div>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="user">Username</Label>
                            <Input
                                type="text"
                                name="user"
                                id="user"
                                placeholder="nick"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="post">Add Post</Label>
                            <Input
                                type="textarea"
                                name="post"
                                id="post"
                                placeholder="Put Anything here"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="topic">Topics</Label>
                            <Input
                                type="text"
                                name="topic"
                                id="topic"
                                placeholder="Group Taxonomy Tags"
                            />
                        </FormGroup>
                        <Button type="submit">
                            Post
                        </Button>
                    </Form>
                </CardBody>
            </Card>
            <List />
            </div>
        );
    }
}

export default GroupPost;
