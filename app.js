const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes.js')


// express app
const app = express()

// connect to mongoDB
const dbURI = 'mongodb+srv://<USERNAME>:<PASSWORD>@nodetuts.q4bccle.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts'
mongoose.connect(dbURI)
        .then((result) => {
            console.log("Connected to DB")
            app.listen(3000)
        })
        .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs')
app.set('views', 'src-views')


// middleware & static
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


//routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    // res.send('<p>Hello noggers</p>')
    res.render('about', { title : 'About'})
})

// blog-routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {             // ->  use   ====>  if user koi match nahi hua, send this
    res.status(404).render('404', { title : '404'})
})