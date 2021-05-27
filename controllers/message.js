const {Router}= require('express')
const router= Router()
const Message= require('../modal/message')










router.post('/create-message',(req,res)=>{
const message=req.body;

Message.create(message).then(data=>{
    res.status(201).send(data)
}).catch(e=>{
    res.status(500).send(e)
})
 
})


router.get('/get-messages/:to',(req,res)=>{
    console.log(req.params)
    Message.find({to:req.params.to}).then(data=>{
res.status(200).send(data)
}
).catch(e=>{
    res.status(404).send(e)
})
})






module.exports= router