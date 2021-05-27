class User{
    constructor(){
        this.users=[]
    }
    findUser(id,room,userName){
        return this.users.find(user=>{
            return user.room==room && user.name==userName &&user.id==id
        })
    }
    addUserToRoom(id,userName,room){

        this.users.push({id,userName,room})
        const existingUser=this.findUser(id,room,userName)
        
        if(existingUser){
return {error:'this User is exists'}
        }
        
    }
    removeUserFromRoom(id){

    }
}