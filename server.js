const express = require('express')
const app = express()
//view engine is ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const Document = require('./models/Document')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/hastebin', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

app.get('/', (req, res) => {
    const code = `Welcome to HasteBin!

Use the commands in the top right corner
to create a new file to share with others.`

    //, lineNumbers: code.split('\n').length but instead
    //did it in main file
    res.render('code-display', { code, language: "plaintext" })
})

app.get('/new', (req, res) => {
    res.render("new")
})

app.post('/save', async (res, req) => {
    console.log(req)
    // const value = req.body.value
    // try {
    //     const document = await Document.create({ value })
    //     res.redirect(`/${document.id}`)
    // } catch (err) {
    //     res.render('new', { value })
    // }
})

app.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const document = await Document.findById(id)
        res.render('code-display', { code: document.value })
    } catch (err) {
        res.redirect('/')
    }
})

app.listen(3000, () => console.log('connected'))