import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewPostPage extends Component {

  state = {
    title: '',
    content: '',
    thumbnail: '',
  }

  updatePostTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  updatePostContent = (e) => {
    this.setState({ content: e.target.value });
  }

  updatePostThumbnail = (e) => {
    this.setState({ thumbnail: e.target.value });
  }

  createPost = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/posts', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    title: this.state.title,
		    content: this.state.content,
		    thumbnail_image_url: this.state.thumbnail,
		    votes: 0,
		    comments: []
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // Can also import and use <Redirect to="/" />
        this.props.history.push('/');
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="container">
      <div className="row">
        <div className="col-8 offset-2 form-control mt-5 p-5 text-left">
          <h2>New Post</h2>
          <form onSubmit={ this.createPost }>
            <input 
              value={ this.state.title } 
              onChange={ this.updatePostTitle }
              type="text" 
              placeholder="Title"
              className="form-control mb-3"
              required />
            <input 
              value={ this.state.content }
              onChange={ this.updatePostContent } 
              type="text" 
              placeholder="Content"
              className="form-control mb-3"
              required />
            <input 
              value={ this.state.tThumbnail } 
              onChange={ this.updatePostThumbnail }
              type="text" 
              placeholder="Thumbnail URL"
              className="form-control mb-4" />
            <button type="submit" className="btn btn-primary float-right">Add Post</button>
            <Link to="/" className="btn btn-secondary float-right mr-2">Cancel</Link>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default NewPostPage;
