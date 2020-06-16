import "babel-polyfill"
import express, {json} from 'express';
import '../db/mongoose';
import userRouter from './routers/user';
import task from './routers/task';

const app = express();
const port = process.env.PORT;


app.use(json());
app.use(userRouter)
app.use(task)



app.listen(port, () => {
    console.log('server is up in ' + port);
})
