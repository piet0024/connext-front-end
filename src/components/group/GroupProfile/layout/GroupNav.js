import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Card, CardBody, } from 'reactstrap';

class GroupNav extends Component {
    render() {
        return (
            <Card>
                <CardBody>
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
                        <NavItem>
                            <NavLink href={"/g/" + this.props.id + "/tool"}>
                                Tool Ex
                            </NavLink>
                        </NavItem>
                    </Nav>
                </CardBody>
            </Card>

        );
    }
}

export default GroupNav;