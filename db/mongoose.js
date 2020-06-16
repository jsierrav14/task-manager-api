import { connect } from 'mongoose';

connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false,
    autoIndex:true
},(error,result)=>{
    if (error) {
        throw error;
    } else {
        console.log("Conexion correcta");
    }
})

/*
const task = new Task({
    name:'Whatch a course',
    description:'      This task is for learning NodeJS an be an expert in JavaScript     ',    
    date:'2020-03-28'
})

task.save().then(()=>{
    console.log(task)
}).catch((error)=>{
    console.log(error);
})

const me = new User({
    name:'  David Mendosa ',
    email:'david@gmail.com',
    age:24,
    password:'12345678assword'
})

 me.save().then(()=>{
   console.log(me);
 }).catch((error)=>{
     console.log('Error', error)
 })

*/