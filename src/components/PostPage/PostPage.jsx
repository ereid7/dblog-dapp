import React, { Component } from "react";
import "./PostPage.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

class PostPage extends Component {

  render() {
    return (
      <div className="post-page">
        <div className="post-page-container">
          <h1 className="post-title">Blog Post Title</h1>
          <div className="post-subtitle-container">
            <p>Evan's Blog - Post 20 - 5/12/2021</p>
          </div>
          <div className="post-content">
          When I was growing up in the 1960s and 70s, the chief fear on behalf of literary culture was that television was going to destroy it. What if we were becoming a nation of passive, glassy-eyed couch potatoes — mindless consumers of numbing video entertainment?

To some extent, that happened. Yet we survived! And then something came along that challenged TV. The Web was a two-way medium. Each consumer was also a potential creator or contributor in a way that never happened, couldn’t happen, with television. That’s a huge transformation of our media landscape, And we’re still just getting our heads around it.
          </div>
        </div>
      </div>
    );
  }
}

export default PostPage