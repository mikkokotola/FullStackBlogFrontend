import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      new_blog_title: '',
      new_blog_url: '',
      new_blog_author: '',
      error: null,
      message: null,
      loginVisible: '',
      addBlogFormVisible: '',
      username: '',
      password: '',
      user: null
    }
  }

  componentWillMount() {
    blogService.getAll().then(
      blgs => {
        //const blogs = blgs.map(blg => { blg, detailsVisible: true })
        const blogs = blgs.map(blg => Object.assign({}, blg, { detailsVisible: this.state.blogs.find(n => n.id === blg.id) === undefined ? false : this.state.blogs.find(n => n.id === blg.id).detailsVisible }))
        this.setState({ blogs })
      }
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  addBlog = (e) => {
    e.preventDefault()
    //const currentUser = oldBlog.user
    const blogObject = {
      title: this.state.new_blog_title,
      author: this.state.new_blog_author,
      url: this.state.new_blog_url
    }

    blogService.create(blogObject).then(newBlog => {
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        new_blog_author: '',
        new_blog_title: '',
        new_blog_url: '',
        message: `New blog "${newBlog.title}" added!`
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 4000)
    })
  }

  addLike = (id) => {
    return () => {
      const oldBlog = this.state.blogs.find(n => n.id === id)

      const savedUser = oldBlog.user
      const updatedBlog = {
        title: oldBlog.title,
        author: oldBlog.author,
        url: oldBlog.url,
        likes: oldBlog.likes + 1
      }

      //const changedBlog = { ...blog, likes: !blog.important }

      blogService.update(id, updatedBlog)
        .then(response => {
          const responseAugmentedWithAddedBy = { ...response, user: savedUser }
          this.setState({
            blogs: this.state.blogs.map(blog => blog.id !== id ? blog : responseAugmentedWithAddedBy),
            message: `Blog "${responseAugmentedWithAddedBy.title}" has new like!`
          })
          setTimeout(() => {
            this.setState({ message: null })
          }, 4000)
        })

    }
  }

  removeBlog = (id) => {
    return () => {
      const blogToDelete = this.state.blogs.find(blog => blog.id === id)
      console.log("Deleting:")
      console.log(blogToDelete)

      if (window.confirm(`Are you sure you want to remove blog "${blogToDelete.title}?"`)) {

        blogService.remove(id)
          .then(response => {
            this.setState({
              blogs: this.state.blogs.filter(blog => blog.id !== id),
              message: `Blog "${blogToDelete.title}" has been deleted`
            })
            setTimeout(() => {
              this.setState({ message: null })
            }, 4000)
          })
          .catch(error => {
            this.setState({
              blogs: this.state.blogs.filter(blog => blog.id !== id),
              message: `Blog "${blogToDelete.title}" was already removed from the database!`
            })

            setTimeout(() => {
              this.setState({ notification: null })
            }, 4000)

          })
      }
    }
  }

  login =
    async (e) => {
      e.preventDefault()
      try {
        const user = await loginService.login({
          username: this.state.username,
          password: this.state.password
        })

        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        blogService.setToken(user.token)
        this.setState({ username: '', password: '', user })
      } catch (exception) {
        this.setState({
          error: 'Käyttäjätunnus tai salasana virheellinen.',
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 4000)
      }
    }


  loginForm = () => {
    const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
    const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={e => this.setState({ loginVisible: true })}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            handleLoginFieldChange={this.handleLoginFieldChange}
            login={this.login}
            username={this.state.username}
            password={this.state.password}
          />
          <button onClick={e => this.setState({ loginVisible: false })}>Cancel</button>
        </div>
      </div>
    )
  }

  addBlogForm = () => {
    const hideWhenVisible = { display: this.state.addBlogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: this.state.addBlogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={e => this.setState({ addBlogFormVisible: true })}>Add new blog</button>
        </div>
        <div style={showWhenVisible}>
          <AddBlogForm addBlog={this.addBlog} new_blog_title={this.state.new_blog_title} new_blog_author={this.state.new_blog_author} new_blog_url={this.state.new_blog_url} handleBlogFieldChange={this.handleBlogFieldChange} />
          <button onClick={e => this.setState({ addBlogFormVisible: false })}>Cancel</button>
        </div>
      </div>
    )
  }


  logout = async (e) => {
    e.preventDefault()
    await window.localStorage.removeItem('loggedUser')
  }


  handleBlogFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLoginFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  toggleDetailVisibility = (id) => {
    return () => {
      const blog = this.state.blogs.find(n => n.id === id)
      let changedBlog
      if (blog.detailsVisible !== undefined) {
        changedBlog = { ...blog, detailsVisible: !blog.detailsVisible }
      } else {
        changedBlog = { ...blog, detailsVisible: true }
      }
      this.setState({
        blogs: this.state.blogs.map(b => b.id === id ? changedBlog : b)
      })
    }
  }


  render() {
    return (
      <div>
        <h1>Bloglist</h1>
        <ErrorNotification message={this.state.error} />
        <SuccessNotification message={this.state.message} />
        {this.state.user === null ?
          this.loginForm()
          :

          <div>
            <p>{this.state.user.name} logged in</p>

            <form onSubmit={this.logout}>
              <button>Log out</button>
            </form>

            {this.addBlogForm()}

            <div>
              <h2>Blogs</h2>
              {console.log("Rendering bloglist")}
              {this.state.blogs.map(blog => {
                console.log(this.state.user.username)
                console.log(blog.user.username)
                const removeFunction = this.state.user.username === blog.user.username ? this.removeBlog(blog.id) : null
                const showDeleteButton = this.state.user.username === blog.user.username ? true : false
                console.log(removeFunction)
                return (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    detailsVisible={blog.detailsVisible ? blog.detailsVisible : false}
                    toggleDetailVisibility={this.toggleDetailVisibility(blog.id)}
                    addLike={this.addLike(blog.id)}
                    showDeleteButton={showDeleteButton}
                    removeBlog={removeFunction} />)
              })
              }

            </div>
          </div>
        }
      </div>
    )
  }
}

const LoginForm = ({ handleLoginFieldChange, login, username, password }) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          Username
        <input
            type="text"
            name="username"
            value={username}
            onChange={handleLoginFieldChange}
          />
        </div>
        <div>
          Password
        <input
            type="password"
            name="password"
            value={password}
            onChange={handleLoginFieldChange}
          />
        </div>
        <button>Login </button>
      </form>
    </div>
  )
}
/*
const blogListView = () => (
  <div>
    <h2>Blogs</h2>
    {this.state.blogs.map(blog =>
      <Blog key={blog._id} blog={blog} />
    )}

  </div>
)
*/

const AddBlogForm = ({ addBlog, new_blog_title, new_blog_author, new_blog_url, handleBlogFieldChange }) => {
  return (
    <div>
      <h2>Add new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          TItle
                  <input
            type="text"
            name="new_blog_title"
            value={new_blog_title}
            onChange={handleBlogFieldChange}
          />
        </div>
        <div>
          Author
                  <input
            type="text"
            name="new_blog_author"
            value={new_blog_author}
            onChange={handleBlogFieldChange}
          />
        </div>
        <div>
          URL
                  <input
            type="text"
            name="new_blog_url"
            value={new_blog_url}
            onChange={handleBlogFieldChange}
          />
        </div>

        <button>Save</button>
      </form>
    </div>

  )
}


const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div id="error">
      {message}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div id="success">
      {message}
    </div>
  )
}

export default App;
