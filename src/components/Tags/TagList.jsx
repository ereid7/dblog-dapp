import Badge from 'react-bootstrap/Badge'
import "./TagList.css"

const TagList = (props) => {
  return (
    <div className="tags-container">
      {props.tagList.map((value, index) => {
        return <Badge className="tag-badge" key={index}>{value}</Badge>
      })}
    </div>
  );
}

export default TagList