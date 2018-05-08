import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {

  state = {
    posts: null,
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/posts')
      .then(res => res.json())
      .then(posts => {
        // console.log(posts);
        this.setState({ posts })
      })
      .catch(err => console.log(err));
  }

  handleAddVote = (post_id) => {
    let postToUpdate = this.state.posts.filter(post => post._id === post_id);
    let updatedVotes = postToUpdate[0].votes + 1;
    // console.log(postToUpdate);
    // console.log(updatedVotes);
		fetch(`http://localhost:8080/api/posts/${post_id}`, {
			method: 'PUT',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    title: postToUpdate.title,
        content: postToUpdate.content,
        votes: updatedVotes,
        thumbnail_image_url: postToUpdate.thumbnail_image_url,
        comments: postToUpdate.comments
		  })
		}).then(res => res.json())
      .then(updatedPost => {
        // console.log("Updated Post = ", updatedPost);
        let updatedPosts = this.state.posts.filter(post => post._id !== updatedPost._id);
        updatedPost.votes = updatedVotes;
        let newPosts = updatedPosts.concat(updatedPost);
        this.setState({ posts: newPosts })
		  })
  }

  handleRemoveVote = (post_id) => {
    let postToUpdate = this.state.posts.filter(post => post._id === post_id);
    let updatedVotes = postToUpdate[0].votes - 1;
    // console.log(postToUpdate);
    // console.log(updatedVotes);
		fetch(`http://localhost:8080/api/posts/${post_id}`, {
			method: 'PUT',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    title: postToUpdate.title,
        content: postToUpdate.content,
        votes: updatedVotes,
        thumbnail_image_url: postToUpdate.thumbnail_image_url,
        comments: postToUpdate.comments
		  })
		}).then(res => res.json())
      .then(updatedPost => {
        // console.log("Updated Post = ", updatedPost);
        let updatedPosts = this.state.posts.filter(post => post._id !== updatedPost._id);
        updatedPost.votes = updatedVotes;
        let newPosts = updatedPosts.concat(updatedPost);
        this.setState({ posts: newPosts })
		  })
  }

  deletePost = (post_id) => {
    let updatedPosts = this.state.posts.filter(post => post._id !== post_id);
    // console.log(updatedPosts)
    if (window.confirm('Are you sure you want to delete this post?')) {
      fetch(`http://localhost:8080/api/posts/${ post_id }`, {  
		  method: 'DELETE',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  }
    })
      .then(res => {
        // console.log(res);
        this.setState({ posts: updatedPosts })
      })
      .catch(err => console.log(err));
    }
  }

  render() {
    // console.log("State = ", this.state.posts)

    let posts = this.state.posts
      ? this.state.posts
        .sort(((a,b) => {
          return b.votes - a.votes;
        }))
        .map(post => {
          return (
            <div key={post._id} className="media text-muted py-3 mb-2 border-bottom border-gray"> 
              <img src={post.thumbnail_image_url} alt={post.title} className="mr-2 rounded" width="50" height="50" />
              <div className="media-body mb-0 lh-50">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div>
                    <Link to={`/posts/${post._id}`}><p className="media-body mb-0">{post.title}</p></Link>
                    <p className="mb-0">Votes: {post.votes}</p>
                    <p>Comments: {post.comments.length}</p>
                  </div>
                  <div className="">
                    <button onClick={() => this.handleAddVote(post._id)} className="btn btn-sm btn-primary mr-2">Upvote</button>
                    <button onClick={() => this.handleRemoveVote(post._id)} className="btn btn-sm btn-secondary mr-2">Downvote</button>
                    <button className="btn btn-sm btn-danger" onClick={() => this.deletePost(post._id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      : <h2>Loading ...</h2>;

      console.log(posts)
    return (
      
      <div className="container">
        <div className="row">
          <div className="col-10 offset-1">
            <div className="my-3 py-3 bg-white rounded box-shadow">
              <div className="container border-bottom border-gray">
                <Link to="/posts/new" className="btn btn-primary float-right mb-4">New Post</Link>
                <h4 className="pb-2 mb-4 heading text-center">Recent Posts</h4>
              </div>
            </div>
            { posts }
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
