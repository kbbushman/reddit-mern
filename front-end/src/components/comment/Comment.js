import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return (
      <div className="small">
        <ul className="list-group">
          <li className="list-group-item">{this.props.comment.content}</li>
        </ul>
      </div>
    );
  }
}

export default Comment;
