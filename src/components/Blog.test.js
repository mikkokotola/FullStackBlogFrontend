import React from 'react'
import { shallow, mount } from 'enzyme'
import SimpleBlog from './Blog'
import Blog from './Blog'
import blogs from '../services/blogs';

describe('<SimpleBLog />', () => {
    it('renders content', () => {
        const blog = {
            title: 'Komponenttitestaus',
            author: 'Taavi Testi',
            likes: 2
        }

        const simpleBLogComponent = shallow(<SimpleBlog blog={blog} onClick={null} />)
        const contentDiv = simpleBLogComponent.find('.content')

        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.likes)
    })

    it('clicking the button twice calls event handler twice', () => {
        const blog = {
            title: 'Komponenttitestaus',
            author: 'Taavi Testi',
            likes: 2
        }

        const mockHandler = jest.fn()

        const simpleBLogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

        const button = simpleBLogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })

})

describe.only('<Blog />', () => {
    const blog = {
        title: 'Komponenttitestaus',
        author: 'Taavi Testi',
        url: 'www.testi.org',
        likes: 2
    }
    let blogComponent

    beforeEach(() => {
        const mockDetailVisibilityHandler = jest.fn()
        const mockAddLikeHandler = jest.fn()
        const mockRemoveBlogHandler = jest.fn()

        const blogComponentFull = (
            <Blog
                blog={blog}
                detailsVisible={false}
                toggleDetailVisibility={mockDetailVisibilityHandler}
                addLike={mockAddLikeHandler}
                showDeleteButton={false}
                removeBlog={mockRemoveBlogHandler}
            />)

        //console.log(blogComponentFull)

        blogComponent = shallow(blogComponentFull)
    })

    it('initially renders only title and author', () => {

        const contentDiv = blogComponent.find('.content')
        //console.log(contentDiv.debug())

        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
        //expect(contentDiv.text()).toContain('hopo')
        //expect(contentDiv.text()).toContain(blog.likes)
    })

    /* it('after clicking name the details are displayed', () => {
        // haetaan klikattava osa komponentista
        const titleA = blogComponent.find('.titleA')
        titleA.simulate('click')

        // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
        const contentDiv = blogComponent.find('.content')
        expect(contentDiv.text()).toContain(blog.likes)
    }) */


})