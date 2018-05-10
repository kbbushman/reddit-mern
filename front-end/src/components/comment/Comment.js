import React, { Component } from 'react';

class Comment extends Component {
  state = {
    reply: {
      content: '',
      votes: 0,
    }
  }

  handleReplyChange = (e) => {
    this.setState({ reply: {
        content: e.target.value,
        votes: 0,
      }
    });
  }

  handleOnSubmit = (e) => {
    let commentId = this.props.comment._id;
    let reply = this.state.reply;
    this.props.addReply(e, commentId, reply);
    this.setState({ reply: {content: ''} });
  }

  render() {
    let { comment } = this.props;
    let commentReplies;
    if (comment.comments.length > 0) {
      commentReplies = comment.comments.map(reply => {
        return (
          <div key={reply._id} className="mb-3">
            <div className="bg-white p-2">
              <p className="mb-0 p-1">{reply.content}</p>
            </div>
          </div>
        )
      });
    } else {
      commentReplies = null;
    }

    // console.log(comment);
    return (
      <div className="media text-muted py-3 mb-2 border-bottom border-gray">
        <div className="media-body mb-0 lh-50">
          <div className="d-flex justify-content-between align-items-center w-100 mb-3 p-2 bg-white">
            <div className="">
              {comment.content}
            </div>
            <div>
              <span>({comment.votes} votes)</span>
              <span onClick={() => this.props.addCommentVote(comment._id)} className="btn">upvote</span>
              <span onClick={() => this.props.removeCommentVote(comment._id)} className="btn">downvote</span>
              <span className="btn btn-sm btn-danger" onClick={() => this.props.deleteComment(comment._id)}>X</span>
            </div>
          </div>
          <div className="pl-5">
            { commentReplies }
          </div>
          <div className="mt-3 w-100 pl-5">
              <form onSubmit={(e) => this.handleOnSubmit(e)} className="form-inline w-100">
                <div className="form-group border-0 w-75">
                  <input 
                    value={this.state.reply.content} 
                    onChange={this.handleReplyChange}
                    type="text"
                    className="form-control form-control-lg mr-4 w-100 border-0"
                    placeholder="Write a reply.."/>
                  </div>
                <button className="btn btn-sm outline-none float-right" type="submit">Reply</button>
              </form>
            </div>
        </div>
      </div>
    );
  }
}

export default Comment;
