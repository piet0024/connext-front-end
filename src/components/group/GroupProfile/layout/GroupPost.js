import React, { Component } from 'react';
import { Button, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import GroupFeed from './GroupFeed';
import {Editor, EditorState, RichUtils} from 'draft-js';
import './editor-style.css';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
// Todo wrap in a feed query components, with mutation component on the form

const CREATE_POST = gql`
  mutation CreatePost($userid: ID!, $groupid: ID!, $content: String!) {
    createPost(
    user: {
      id: $userid
    },
    group: {
      id: $groupid
    },
    tags: "",
    content: $content
  ) {
    id
    user {
      username
    }
    group {
      name
    }
    content
    likedBy {
      username
    }
  }
  }
`;

class GroupPost extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        
        this.state = {
            editorState: EditorState.createEmpty(),
            dropdownOpen: false,
            currentUser: {
                id: "",
                username: "NO USER SELECTED"
            },
        };
        this.onEditorChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
    }

    render() {
        return(
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <Label style={{marginRight: "5px"}} > Current user: </Label>
                    <DropdownToggle caret>
                        {this.state.currentUser.username}
                    </DropdownToggle>
                    <DropdownMenu>
                    {
                        this.props.members.map(user => (
                            <DropdownItem key={user.id} onClick={() => this.setState({currentUser: {id: user.id, username: user.username}})}>{user.username}</DropdownItem>
                        ))
                    }
                    </DropdownMenu>
                </Dropdown>
                <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onEditorChange}
                />
                <Mutation mutation={CREATE_POST}>
                    {(CreatePost, { data }) => (
                        <Button onClick={() => {
                            CreatePost({ variables: { 
                                userid: this.state.currentUser.id,
                                groupid: this.props.id,
                                content: this.state.editorState.getCurrentContent().getPlainText(),
                             } });
                             this.setState({editorState: EditorState.createEmpty()});
                        }}>submit</Button>
                    )}
                </Mutation>
                
                <GroupFeed currentUser={this.state.currentUser} posts={this.props.posts} style={{marginTop: "50px"}} />
            </div>
        );
    }
}

export default GroupPost;
