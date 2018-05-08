import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SinglePostPage from './pages/SinglePostPage';
import NewPostPage from './pages/NewPostPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <div className="container">
            <h1 className="App-title"><Link style={{color: "#fff"}} to="/">reddit</Link></h1>
            <h2 className="App-blurb">The front page of the web</h2>
          </div>
        </header>

        <Switch>
          <Route path="/posts/new" exact component={ NewPostPage } />
          <Route path="/posts/:post_id" component={ SinglePostPage } />
          <Route path="/" exact component={ HomePage } />
        </Switch>

      </div>
    );
  }
}

export default App;
