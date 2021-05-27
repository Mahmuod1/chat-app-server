const express= require('express')
const app=express();
const mongoose= require('mongoose')
const bodyParser= require('body-parser')
const message= require('./controllers/message')
const cors = require('cors')
const socketIo=require('socket.io')
const http =require('http')
const auth = require('./controllers/auth')
const server= http.createServer(app,{
    cors: {
        origin: ["http:localhost/3000"],
        allowedHeaders: ["Access-Control-Allow-Origin"],
        credentials: true
      }
})
const io=socketIo(server)
const user= require('./controllers/user')
const group = require('./controllers/group')
const Message=require('./modal/message')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors('*'))
io.on('connection',(socket)=>{

socket.on('join',({room,name,userId},callback)=>{
    socket.join(room)
    callback()
})

socket.on('messageToGroup',(msg)=>{

Message.create(msg).then(data=>{
    
    io.to(msg.to).emit('messageToClient',data)
    
}).catch(e=>{
    io.to(msg.to).emit('error',{error:e})
})

})

    })
app.use('/message',message)
app.use('/auth',auth)
app.use('/user',user)
app.use('/group',group)
const PORT= process.env.PORT||8000;
/*  */

mongoose.connect('mongodb://mahmuod:I5Rl1sKovQfMSeuF@cluster0-shard-00-00.gbjh2.mongodb.net:27017,cluster0-shard-00-01.gbjh2.mongodb.net:27017,cluster0-shard-00-02.gbjh2.mongodb.net:27017/chatApp?ssl=true&replicaSet=atlas-55gpxt-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
})
.then(()=>{
    server.listen(PORT,()=>{
        console.log('server is up in post ',PORT)
    })
}).catch(e=>{
    console.log('server cannot connect ',e)
})








