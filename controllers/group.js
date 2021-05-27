const {Router}= require('express')
const router = Router();
const Group = require('../modal/groups')


router.post('/create-group',(req,res)=>{

    Group.create(req.body).then(data=>{
        res.send(data)
    }).catch(e=>{
        res.send(e)
    })
})
 

router.get('/get-all',(req,res)=>{
    Group.find({}).then(data=>{
        res.send(data)
    }).catch(e=>{
        res.send(e)
    })
})




module.exports=router