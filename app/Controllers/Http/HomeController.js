'use strict'
// const Home = use('App/Models/Home')
const Blog = use('App/Models/Blog')
const Helpers = use('Helpers')



class HomeController {
    async home({ view }) {
        return view.render('home', {})
    }
    async BlogStore({request, response ,session }){

        let new_name
        const blogPics = request.file('img_blog', {
            types: ['image'],
            size: '2mb'
        })
        await blogPics.moveAll(Helpers.publicPath('uploads'), (file) => {
            return {
                name: `${new Date().getTime()}.${file.subtype}`
            }
        })
        if (blogPics.movedAll()) {
            const movedFiles = blogPics.movedList()
            await Promise.all(movedFiles.map((file) => {
                new_name = file.fileName
            }))
        }
        else {
            return blogPics.errors()
        }

        const blog = new Blog()
        blog.image = `/uploads/${new_name}`
        blog.name_blog = request.input('name_blog')
        blog.sub_blog = request.input('sub_blog')
        blog.text_blog = request.input('text_blog')
        blog.autor_blog = request.input('autor_blog')
        session.flash({ notification: 'Blog Agregado! ' })
        await blog.save()
        return response.redirect('/home')
    }
}

module.exports = HomeController
