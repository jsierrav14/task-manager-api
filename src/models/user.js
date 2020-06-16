import  mongoose  from 'mongoose';
import { isEmail } from 'validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Task from './task'

const userSchema = new mongoose.Schema({
  name:{
  type:String,
  required:true,
  trim:true
  },
  email:{
    type:String,
    required:true,
    lowercase:true,
    unique:true,
    validate(value){
      if(!isEmail(value)){
         throw new Error('Email is invalid')
      }
    }
  },
  age:{
    type:Number,
    validate(value){
       if(value<0){
           throw new Error('Age must be a positive number')
       }
    }

  },
  password:{
    type:String,
    trim:true,
    minlength:7,
    required:true,
    validate(value){
         if(value.toLowerCase().includes('password')){
             throw new Error('Password cannot contain password word')
         }
    }
    
  },
  tokens:[{
     token:{
       type:String,
       required:true
     }
  }],
  avatar:{
    type:Buffer
  }

},{
timestamps:true
})

userSchema.virtual('tasks',{
  ref:'Task',
  localField:'_id',
  foreignField:'owner'
})

userSchema.methods.toJSON =  function(){
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
}

userSchema.methods.generateAuthToken = async function(){
  const user = this
  const token = jwt.sign({_id:user._id.toString()},process.env.JWT_KEY)
  
  user.tokens = user.tokens.concat({token})

  await user.save();

  return token;
}



userSchema.statics.findByCredentials =async(email, password)=>{
     const user = await User.findOne({email:email})

     if(!user){
       throw new Error('unable to login')
     }

     const isMatch = bcrypt.compare(password,user.password);
     if(!isMatch){
       throw new Error('Unable to login')
     }

     return user
}


userSchema.pre('save', async function(next) {
  const user = this

  if(user.isModified){
    user.password = await bcrypt.hash(user.password,8);
  }
  next();
})

userSchema.pre('remove',async function(next){
  const user = this;
  Task.deleteMany({owner:user._id})
  next();
})

const User = mongoose.model('User', userSchema)

export default User;