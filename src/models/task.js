import moongose from 'mongoose';

const taskSchema = new moongose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        trim:true
        
    },
    completed:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date
    },

    owner:{
        type: moongose.Schema.Types.ObjectId,
        required:true,
        ref:'User'

    }
},{
timestamps:true
})

const Task  = moongose.model('Task',taskSchema)
export default Task; 