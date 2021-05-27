const express = require('express')

const router =express.Router()

const User= require('../modal/user')
const {authenticateToken} = require('../helpers/authantication')

router.get('/get-user',authenticateToken,(req,res)=>{


    User.find({_id:req.token.id}).then(data=>{

        res.send(data)
    }).catch(e=>{
        res.send(e)
    })

})


module.exports=router