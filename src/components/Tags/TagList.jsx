import React, { Component } from "react"
import Badge from 'react-bootstrap/Badge'
import "./TagList.css"

class TagList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="tags-container">
				<h1>
        {this.props.tagList.map((value, index) => {
					return <Badge className="tag-badge" key={index}>{value}</Badge>
        })}
				</h1>
      </div>
    );
  }
}

export default TagList