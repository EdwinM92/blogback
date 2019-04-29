'use strict'

const Blog = use('App/Models/Blog')

class ApiController {
    async blog() {
        const blog = await Blog.all();
        return blog.toJSON() 
    }
}

module.exports = ApiController
