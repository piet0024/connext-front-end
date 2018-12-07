import React, { Component } from 'react';

import gql from "graphql-tag";
import { Query } from "react-apollo";

import HomeFeedCard from '../core/card/HomeFeedCard';

const queryPosts = gql`
    query GetPosts {
            posts {
                id
                user {
                    id
                    username
                }
                group {
                    id
                    name
                }
                createdAt
                likedBy {
                    username
                }
                content
                comments {
                    id
                    createdAt
                    user {
                        id
                        username
                    }
                    content
                }
            }
        }
`

class List extends Component {
    render() {
        return (
            <Query query={queryPosts}>
                 {({ loading, error, data }) => {
                if (loading) return (<div className="lds-ripple"><div></div><div></div></div>);
                if (error) return `Error!: ${error}`;
                return (
                                    <div>
                {
                    data.posts.map(post => (
                        <HomeFeedCard key={post.id} data={post}  />
                    ))
                }
                
            </div>
                );
                }}
            </Query>
        );
    }
}

export default List;