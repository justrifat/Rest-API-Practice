const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/contacts-db')

const contactRoute = require('./api/routes/contact')
const userRoute = require('./api/routes/user')

const db = mongoose.connection
db.on('error', (err) =>{
      console.log(err)
})

db.once('open', ()=> {
     console.log('Database connection stablished')
})
//console.log(express)

const app = express()
app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({extends : true}))
app.use(bodyParser.json())


const PORT = process.env.PORT || 5000

/*
//This is a custom middleware
//next call na korle request, response running ey thakbe 
app.use((req, res, next) =>{
    console.log("I am a middleware")
    next()
})
*/

app.use('/api/contacts', contactRoute)
app.use('/api/users', userRoute)

const Schema = mongoose.Schema
const demoSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    phone: {
        type: String,
        required: true
    }
})

const Demo = mongoose.model('Demo', demoSchema)


app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/demo', (req, res)=>{
    const demo = new Demo({
        name : 'Walter White',
        phone : '0123456789'
    })

    demo.save()
        .then(data =>{
            res.json({data})
        })
        .catch(err => console.log(err))
})

app.get('/get', (req, res) =>{
    Demo.find()
        .then(data =>{
            res.json(data)
        })
        .catch(err => console.log(err))
})


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})


const contacts = [
    {name : 'Rifat' , email : 'rifat.me3489@gmail.com'},
    {name : 'abid' , email : 'abidhassan@gmail.com'},
    {name : 'jahid hasan' , email : 'jahidhasan@gmail.com'},
]