import React from 'react'
import PropTypes from 'prop-types'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='content'>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)


const Blog = ({ blog, detailsVisible, toggleDetailVisibility, addLike, showDeleteButton, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (detailsVisible) {
    if (showDeleteButton) {
      return (
        <div style={blogStyle} className='content'>
          <div className='titleA'><a onClick={toggleDetailVisibility}>
            <strong>{blog.title}</strong></a> {blog.author}</div>
          <p>  {blog.url}</p>
          <p>  {blog.likes} likes <LikeButton id={blog.id} addLike={addLike} /> <DeleteButton removeBlog={removeBlog} /></p>
          <p>  Added by {blog.user.name}</p>
        </div>
      )
    } else {
      return (
        <div style={blogStyle} className='content'>
          <div className='titleA'><a onClick={toggleDetailVisibility}>
            <strong>{blog.title}</strong></a> {blog.author}</div>
          <p>  {blog.url}</p>
          <p>  {blog.likes} likes <LikeButton id={blog.id} addLike={addLike} /></p>
          <p>  Added by {blog.user.name}</p>
        </div>
      )
    }
  }
  else {

    return (
      <div className='content'>
        <div className='titleA'>
          <a onClick={toggleDetailVisibility}><strong>{blog.title}</strong></a> {blog.author}
        </div>
      </div>
    )
  }

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  detailsVisible: PropTypes.bool.isRequired,
  toggleDetailVisibility: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  removeBlog: PropTypes.func
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

export default (Blog, SimpleBlog)