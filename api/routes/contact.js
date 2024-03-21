const express = require('express')


const router = express.Router()
const authenticate = require('../middleware/authenticate')
//const Contact = require('../models/test_Contact')
const contactController = require('../controller/cont')


const contacts = []

//Get

router.get('/', contactController.getAllContactController)

/*
router.get('/', (req, res, next) => {
     /*res.status(200).json({
        //message : 'Hello i am all contacts get route'
        contacts
     })

})*/


//post
router.post('/', authenticate, contactController.postNewContactController)
/*
router.post('/', (req, res, next) => {
    //const name = req.body.name
   // const email = req.body.email

   contacts.push({
    name: req.body.name,
    email: req.body.email
   })

    //console.log(name, email)
    res.status(201).json({
      // message : 'Hello i am all contacts post route',
      message : 'Data Saved',
       //name,
      // email
    })

    const contact = new Contact({
        name : req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })
        contact.save()
               .then(data =>{
                  res.status(201).json({
                    message: 'Contact Added',
                    contact: data
                  })
               })
               .catch(err =>{
                console.log(err)
                res.status(500).json({
                    message: 'Error Occured',
                    Error: err
                })
            })

    


})*/

/*
router.get('/:id', (req, res, next) =>{//dynamic route
    const id = req.params.id
    res.json({
        id
    })
})
*/
/*
router.get('/:id', (req, res, next) =>{
    
    res.json({
       message: 'I am a single contact'
    })
})*/

router.get('/:id', contactController.getSingleContact)

/*
router.put('/:id', (req, res, next) =>{
    
    res.json({
       message: 'I am a PUT route'
    })
})

/*
router.delete('/:id', (req, res, next) =>{
    
    res.json({
       message: 'I am a DELETE route'
    })
})
*/

router.put('/:id', authenticate, contactController.editContact)

router.delete('/:id', authenticate, contactController.deleteContact)


module.exports = router