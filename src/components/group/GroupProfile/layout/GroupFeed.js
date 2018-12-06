import React, { Component } from 'react';

import FeedCard from '../../../core/card/FeedCard';

class GroupFeed extends Component {
    render() {
        return (
            <div>
                {
                    this.props.posts.map(post => (
                        <FeedCard key={post.id} data={post} currentUser={this.props.currentUser} />
                    ))
                }
                
            </div>
        );
    }
}

export default GroupFeed;