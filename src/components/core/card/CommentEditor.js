import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {Editor, EditorState, RichUtils} from 'draft-js';
import './editor-style.css';
import { Button } from "reactstrap";

const CREATE_COMMENT = gql`
  mutation CreateComment($userid: ID!, $postid: ID!, $content: String!) {
    createComment(
        user: {
            id: $userid
        },
        postid: $postid,
        content: $content
  ) {
        id
  }
  }
`;

class CommentEditor extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onEditorChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
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
                <Editor
                    style={{width: "80%", height: "100px"}}
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onEditorChange}
                />
                <Mutation mutation={CREATE_COMMENT}>
                    {(CreateComment, { data }) => (
                        <Button onClick={() => {
                            CreateComment({ variables: {
                                    userid: this.props.currentUser.id,
                                    postid: this.props.post.id,
                                    content: this.state.editorState.getCurrentContent().getPlainText(),
                                } });
                                this.setState({editorState: EditorState.createEmpty()});
                                this.props.toggle(this.props.this);
                        }}>submit</Button>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default CommentEditor;