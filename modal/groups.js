const {Schema ,model} = require ('mongoose')

const GroupSchema = new Schema({
    name:{
        type:String,
        unique:true,
        require:true
    },
    members:Array
})

module.exports =model('Group',GroupSchema)