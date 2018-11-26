import React, { Component } from 'react';
import '../assets/css/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar, Nav, NavbarBrand, NavItem, NavLink, Container, } from 'reactstrap';

import Feed from './Feed';
import GroupList from './GroupList';
import Group from './Group';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar color="light" primary>
            <NavbarBrand href="/">Connext</NavbarBrand>
            <Nav>
              <NavItem>
                <NavLink href="/">Feed</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/g/mine">Groups List</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/g/1">Group ID 1</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/g/1/file">Group ID 1 Files</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
          <Container>
            <Switch>
              <Route exact path="/" component={Feed} />
              <Route path="/g/mine" component={GroupList} />
              <Route path="/g/:id" component={Group} />
              <Route path="/g/:id/:tool" component={Group} />
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
