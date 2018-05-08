import React, { Component } from 'react';

class Comment extends Component {
  render() {
    console.log(this.props.comment);
    let commentComments
    if (this.props.comment.comments.length > 0) {
      commentComments = this.props.comment.comments.map(commentComment => {
        return (
          <ul key={commentComment._id} className="list-group">
            <li className="list-group-item pl-5">{commentComment.content}</li>
          </ul>
        )
      });
    } else {
      commentComments = null;
    }
    

    return (
      <div className="small">
        <ul className="list-group">
          <li className="list-group-item">{this.props.comment.content}</li>
            { commentComments }
        </ul>
      </div>
    );
  }
}

export default Comment;
