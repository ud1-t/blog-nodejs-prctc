const http = require('http')
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req, res) => {
    // console.log(req.statusCode, req.url, req.method)

    // lodash
    const randomNum = _.random(0, 20)
    console.log(randomNum)

    const greet = _.once(() => {
        console.log('Hello')
    })

    greet()
    greet()

    // set header content type
    res.setHeader('Content-Type', 'text/html')

    let path = './src/'
    switch(req.url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break;
        case '/he':
            res.statusCode = 301
            res.setHeader('Location', '/about')
            res.end()
            break;
        default:
            path += '404.html'
            res.statusCode = 404
            break;
    }

    // send an HTML file
    fs.readFile(path, (err, data) => {
        if(err)
            console.log(err)
        
        res.end(data)
    })
})

server.listen(3000, 'localhost', () => {
    console.log('Server listening request on port 3000')
})