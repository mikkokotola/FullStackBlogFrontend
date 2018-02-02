import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs';


describe('Dummy', () => {
    it('tests run', () => {
        expect(true)
    })
})

describe('<App />', () => {
    let app

    describe.only('when user is not logged', () => {
        beforeEach(() => {
            // luo sovellus siten, että käyttäjä ei ole kirjautuneena
            app = mount(<App />)

        })

        it('only login form is rendered', () => {
            app.update()
            expect(app.text()).toContain('Login')
            expect(app.text()).not.toContain('TokaBlogi')
        })
    })

    describe('when user is logged', () => {
        beforeEach(() => {
            // luo sovellus siten, että käyttäjä on kirjautuneena
            app = mount(<App />)
            const user = {
                username: 'omistaja',
                name: 'Olli Omistaja',
                token: '1231231214'
            }

            localStorage.setItem('loggedUser', JSON.stringify(user))
        })

        it('all notes are rendered', () => {
            app.update()
            //console.log(app.debug())
            expect(app.text()).toContain('TokaBlogi')
            //expect(blogComponents.length).toEqual(blogService.blogs.length)    
        })
    })

    /* beforeAll(() => {
        app = mount(<App />)
    }) */

    /* it('renders all notes it gets from backend', () => {
        app.update()
        const blogComponents = app.find(Blog)
        expect(blogComponents.length).toEqual(blogService.blogs.length)
    }) */
})
