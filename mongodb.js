const {MongoClient, ObjectID} = require('mongodb');
 
const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID();


MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {

    if (error) {
        console.log('Unable to connect');
    }

    const db = client.db(databaseName);
    
    db.collection('users').deleteMany({
        age:27
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
  /*db.coll)ection('users').updateOne({
        _id: new ObjectID('5e780672735e85b7d7b54579')
    },{
        $inc:{
            age:1
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
       console.log(error)
    })


  db.collection('task').updateMany({
    _id: new ObjectID('5e780672735e85b7d7b54579')
},{
    $inc:{
        age:1
    }
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
   console.log(error)
})
*/

 /*   db.collection('users').findOne({name:'Jose Eduardo Sierra Vargas'},(error,user)=>{
          
        if(error){
            return console.log('Unable to fetch');
        }

        console.log(user);

    })

    db.collection('users').find({name:'Jose Eduardo Sierra Vargas'}).toArray((error,result)=>{
          console.log(result)
    })

    db.collection('users').find({name:'Jose Eduardo Sierra Vargas'}).count((error,result)=>{
        console.log(result)
  })

  db.collection('task').findOne({_id:new ObjectID('5e780e47eb12a0b81ca19665')},(error, result)=>{
      if(error){
          console.log(error)
      }

      console.log(result)
  })
  db.collection('task').find({}).toArray((error, result)=>{
      console.log(result)
  })*/
   /*  db.collection('users').insertOne(
        {
            _id:id,
            name: "Pablo Gomez",
            age: 27
        }
    , (error, result) => {
        if (error) {
            return console.log('Unable to insert user');
        }
      
        console.log(result.ops);

    })
  */
  /*  db.collection('users').insertMany([
        {
            name: 'Jose Eduardo Sierra Vargas',
            age: 27
        },
        {
            name: 'Jose Luis Rodriguez',
            age: 25
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert user');
        }
      
        console.log(result.ops);

    })

 

    db.collection('task').insertMany([
        {
            name:'Do excercises',
            time:'4hrs',
            date:'24/03/2020'
        },
        {
            name:'Practice English',
            time:'5hrs',
            date:'25/03/2020'
        },

        {
            name:'Watch a course',
            time:'4hrs',
            date:'26/03/2020'
        }

    ],(error,result)=>{
        if(error){
            console.log('Unable to insert a task')
        }

        console.log(result.ops)
    })
    console.log("connected corrected")
       */
})