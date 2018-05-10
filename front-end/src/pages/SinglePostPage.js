import React, { Component } from 'react';
import Comment from '../components/comment/Comment';

class SinglePostPage extends Component {

  state = {
    post: {},
    newComment: '',
  }

  componentDidMount = () => {
    let postId = this.props.match.params.post_id;
    fetch(`http://localhost:8080/api/posts/${postId}`)
      .then(res => res.json())
      .then(post => {
        this.setState({ post })
      })
      .catch(err => console.log(err));
  }

  handleAddVote = () => {
    let postId = this.props.match.params.post_id;
    let updatedVotes = this.state.post.votes + 1;
		fetch(`http://localhost:8080/api/posts/${postId}`, {
			method: 'PUT',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    title: this.state.post.title,
        content: this.state.post.content,
        votes: updatedVotes,
        thumbnail_image_url: this.state.post.thumbnail_image_url,
        comments: this.state.post.comments
		  })
    })
      .then(res => res.json())
      .then(post => {
			  this.setState({
          post: {
            ...post,
            votes: updatedVotes
          }
        })
		  })
  }

  handleCommentChange = (e) => {
		this.setState({ newComment: e.target.value });
  }

  handleAddComment = (e) => {
		e.preventDefault();
  	let postId = this.props.match.params.post_id;
		fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
			method: 'POST',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    content: this.state.newComment,
		    votes: 0
		  })
    })
      .then(res => res.json())
      .then(post => {
        this.setState({ post, newComment: '' })
		})
  }

  handleAddCommentVote = (commentId) => {
    let postId = this.props.match.params.post_id;
    let commentToUpdate = this.state.post.comments.filter(comment => {
      return comment._id === commentId;
    })
    commentToUpdate[0].votes += 1;
    let updateComment = commentToUpdate[0];
		fetch(`http://localhost:8080/api/posts/${postId}/comments/${commentId}`, {
			method: 'PUT',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(updateComment)
    })
      .then(res => res.json())
      .then(updatedComment => {
        let updatedComments = this.state.post.comments.filter(comment => {
          return comment._id !== commentId;
        });
        updatedComments.push(updatedComment);
			  this.setState({
          post: {
            ...this.state.post,
            comments: updatedComments
          }
        })
		  })
  }

  handleRemoveCommentVote = (commentId) => {
    let postId = this.props.match.params.post_id;
    let commentToUpdate = this.state.post.comments.filter(comment => {
      return comment._id === commentId;
    })
    commentToUpdate[0].votes -= 1;
    let updateComment = commentToUpdate[0];
		fetch(`http://localhost:8080/api/posts/${postId}/comments/${commentId}`, {
			method: 'PUT',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(updateComment)
    })
      .then(res => res.json())
      .then(updatedComment => {
        let updatedComments = this.state.post.comments.filter(comment => {
          return comment._id !== commentId;
        });
        updatedComments.push(updatedComment);
			  this.setState({
          post: {
            ...this.state.post,
            comments: updatedComments
          }
        })
		  })
  }

  handleDeleteComment = (commentId) => {
  	let postId = this.props.match.params.post_id;
		fetch(`http://localhost:8080/api/posts/${postId}/comments/${commentId}`, {
			method: 'DELETE',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  }
    })
      // .then(res => res.json())
      .then(post => {
        let updatedComments = this.state.post.comments.filter(comment => {
          return comment._id !== commentId;
        })
        // console.log(updatedComments)
        this.setState({
          post: {
            ...this.state.post,
            comments: updatedComments,
          },
        })
      });
  }

  handleAddReply = (e, commentId, reply) => {
    e.preventDefault();
    let postId = this.props.match.params.post_id;
    fetch(`http://localhost:8080/api/posts/${postId}/comments/${commentId}/comments`, {
			method: 'POST',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ content: reply.content, votes: reply.votes })
    })
      .then(res => res.json())
      .then(post => this.setState({ post }))
  }

  render() {
    // console.log(this.state.post);

    let comments = this.state.post.comments && this.state.post.comments.length
      ? this.state.post.comments
        .sort((a,b) => b.votes - a.votes)
        .map(comment => {
            return <Comment
                      {...this.props}
                      key={comment._id}
                      comment={comment}
                      addCommentVote={this.handleAddCommentVote}
                      removeCommentVote={this.handleRemoveCommentVote}
                      deleteComment={this.handleDeleteComment}
                      addReply={this.handleAddReply} />
          })
      : <p><small>Be the first to comment...!</small></p>;

    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4 offset-1">
            <img src={this.state.post.thumbnail_image_url} alt={this.state.post.title} height="200" className="img img-fluid" />
          </div>
          <div className="col-6 offset-1 col-md-7 offset-md-0 pt-3">
            
          </div>
          <div className="col-10 offset-1 mt-4">
            <button className="btn btn-primary mb-3" onClick={this.handleAddVote}>Vote <span className="badge badge-light ml-2">{this.state.post.votes} votes</span></button>
            <h3>{this.state.post.title}</h3>
            <p className="mb-5">{this.state.post.content}</p>
            <p>Comments:</p>
            <div className="bg-light px-4">
              { comments }
            </div>
            <div className="bg-light p-4">
              <form onSubmit={ this.handleAddComment } className="form-inline w-100">
                <div className="form-group border-0 w-75">
                  <input 
                    value={ this.state.newComment } 
                    onChange={ this.handleCommentChange }
                    type="text"
                    className="form-control form-control-lg w-100 border-0 mr-4"
                    placeholder="Write a comment..."/>
                  </div>
                <button className="btn btn-sm btn-primary float-right" type="submit">Add Comment</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePostPage;
