import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import GroupCard from '../../core/card/GroupCard';
import { Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const groupListQuery = gql`
{
    groups {
        id
        name
        description
    }
}
`;

class GQLGroupList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    render() {
        return(
            <Query query={groupListQuery}>
            {({ loading, error, data }) => {
                if (loading) return (<div className="lds-ripple mt-3"><div></div><div></div></div>);
                if (error) return `Error! ${error.message}`;

                return (
                    <div>
                        <Row>
                            <Button onClick={this.toggle}>
                                Create New Group
                            </Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Create New Group</ModalHeader>
          <ModalBody>
            A Form will go here!.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
                        </Row>
                    <ul>
                        {data.groups.map(group => (
                            <li key={group.id}>
                                <a href={`/g/${group.id}`}>
                                    {group.name}
                                </a>
                            </li>
                        )
                        )}
                    </ul>
                    <Row>
                        {data.groups.map(group => (
                            <GroupCard data={group} />
                        ))}
                    </Row>
                    </div>
                )
            }}
            </Query>
        );
    }
}

export default GQLGroupList;