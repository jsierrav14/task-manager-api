require('../db/mongoose');

const User = require('../src/models/user')
const Task = require('../src/models/task');

const id = '5e7fbc286fff42d28df98d00urn';
/*
User.findByIdAndUpdate(id,{age:1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:1})
}).then((result) =>{
    console.log(result);
}).catch((error)=>{
   console.log(error);
})
*/ 
 const idTask = '5e7fbf37c51cf8d2c83f8c7d'
/*Task.findByIdAndDelete(idTask,{completed:true}).then((result)=>{
    console.log(result);

    return Task.countDocuments({completed:false});
}).then((count)=>{
    console.log(count)
})*/
/*
const updateAgeAndCount = async(id, age)=>{
    const user = await User.findByIdAndUpdate(id,{age});
    const count = await User.countDocuments({age});

    return count;
}

updateAgeAndCount(id, 1).then((result)=>{
  console.log(result)
}).catch((e)=>{
    console.log(e)
})
*/
const deleteTaskAndCount =  async(id)=>{
    const tast = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed:false});

    return count;
}


deleteTaskAndCount(idTask).then(result=>console.log(result)).catch(error=>console.log(error));
