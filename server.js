const express= require('express')
const app=express();
const mongoose= require('mongoose')
const bodyParser= require('body-parser')
const message= require('./controllers/message')
const cors = require('cors')
const http =require('http')
const auth = require('./controllers/auth')
const server= http.createServer(app)

app.use(cors('*'))
const io=require('socket.io')(server,{
   cors: { 'Access-Control-Allow-Credentials': true,
'Access-Control-Allow-Methods': ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'PATCH', 'OPTIONS'],
'Access-Control-Allow-Origin': 'http://localhost:3000',
'Connection': 'keep-alive',
'Content-Length': 1,
'Content-Type': 'text/plain; charset=UTF-8',
'Vary': 'Origin'

}       
    }
)


const user= require('./controllers/user')
const group = require('./controllers/group')
const Message=require('./modal/message')
app.get('/',(req,res)=>{
    res.write('<h1>Hello to my nodejs server :D</h1>')
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
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








