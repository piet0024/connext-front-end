import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Card, CardBody, } from 'reactstrap';

class GroupNav extends Component {
    render() {
        return (
            <Card>
                <CardBody>
                    Map links to group settings
                    <Nav vertical>
                        <NavItem>
                            <NavLink href={"/g/" + this.props.id}>
                                Activity
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={"/g/" + this.props.id + "/files"}>
                                Files
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={"/g/" + this.props.id + "/tool"}>
                                Tool
                            </NavLink>
                        </NavItem>
                    </Nav>
                </CardBody>
            </Card>

        );
    }
}

export default GroupNav;