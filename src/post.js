const PostComp = (props) => {

    return <div className="postItem">
    <span className="post">Title : {props.posts.title}</span> <br/>
    <span className="post">Body : {props.posts.body}</span>
  </div>;
}

export default PostComp;