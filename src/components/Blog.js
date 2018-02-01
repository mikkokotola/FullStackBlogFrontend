import React from 'react'
const Blog = ({ blog, detailsVisible, toggleDetailVisibility, addLike, showDeleteButton,removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  if (detailsVisible) {
    if (showDeleteButton ) {
      return (
        <div style={blogStyle}>
          <p><a onClick={toggleDetailVisibility}>
            <strong>{blog.title}</strong></a> {blog.author}</p>
          <p>  {blog.url}</p>
          <p>  {blog.likes} likes <LikeButton id={blog.id} addLike={addLike} /> <DeleteButton removeBlog={removeBlog} /></p>
          <p>  Added by {blog.user.name}</p>
        </div>
      )
   } else {
      return (
        <div style={blogStyle}>
          <p><a onClick={toggleDetailVisibility}>
            <strong>{blog.title}</strong></a> {blog.author}</p>
          <p>  {blog.url}</p>
          <p>  {blog.likes} likes <LikeButton id={blog.id} addLike={addLike} /></p>
          <p>  Added by {blog.user.name}</p>
        </div>
      )}
  }
  else {

    return (
      <div>
        <a onClick={toggleDetailVisibility}><strong>{blog.title}</strong></a> {blog.author}
      </div>
    )
  }

}

const LikeButton = ({ addLike }) => {
  return (
    <button onClick={addLike}>Like</button>
  )
}

const DeleteButton = ({ removeBlog }) => {
  return (
    <button onClick={removeBlog}>Delete</button>
  )
}

export default Blog