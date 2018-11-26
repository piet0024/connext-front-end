import React from 'react';
import GQLGroupProfile from '../components/group/GroupProfile/GQLGroupProfile';

const Group = ({ match }) => (
    <div>
        <GQLGroupProfile id={match.params.id} />
    </div>
);

export default Group;