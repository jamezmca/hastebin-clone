const express = require('express')
const app = express()
//view engine is ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    const code = `Welcome to HasteBin!

Use the commands in the top right corner
to create a new file to share with others.`

    //, lineNumbers: code.split('\n').length but instead
    //did it in main file
    res.render('code-display', { code })
})

app.get('/new', (req, res) => {
    res.render("new")
})

app.listen(3000)