const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const path = require('path')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start(){
    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect('mongodb+srv://rimanof:2000se@cluster0.qilnmue.mongodb.net/todos', {})
    }catch(exception){
        console.error(exception)
    }
}

app.listen(PORT, () => {
    console.log('Server has been started!')
})

start() // start connection with database