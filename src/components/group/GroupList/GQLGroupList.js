import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const groupListQuery = gql`
{
    groups {
        id
        name
    }
}
`;

class GQLGroupList extends Component {
    render() {
        return(
            <Query query={groupListQuery}>
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                return (
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
                )
            }}
            </Query>
        );
    }
}

export default GQLGroupList;