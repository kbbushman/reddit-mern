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
		}).then(res => res.json())
      .then(post => {
        // console.log("Updated Post = ", post)
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
		}).then(res => {
			return res.json();
		}).then(json => {
			this.setState({
				post: { 
					title: this.state.post.title,
					content: this.state.post.content,
					votes: this.state.post.votes,
					thumbnail_image_url: this.state.post.thumbnail_image_url,
					comments: this.state.post.comments.concat(json) 
				},
				newComment: ''
			})
		})
  }

  render() {
    // console.log(this.state.post);

    let comments = this.state.post.comments && this.state.post.comments.length
      ? this.state.post.comments.map(comment => {
          return <Comment key={comment._id} comment={comment} />
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
            <small>Comments:</small>
            { comments }
            <div className="py-4">
              <form onSubmit={ this.handleAddComment }>
                <div className="form-group">
                  <input 
                    value={ this.state.newComment } 
                    onChange={ this.handleCommentChange }
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="write comment here.."/>
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
