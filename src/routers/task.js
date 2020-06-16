import { Router } from 'express';
const router =  new Router();
import TaskController  from '../controllers/task';
import auth from '../middleware/auth'

router.post('/tasks',auth,TaskController.add)
router.get('/tasks',auth,TaskController.getAll)
router.get('/tasks/:id',auth, TaskController.getById)
router.patch('/task/:id',auth, TaskController.updateTask)
router.delete('/task/:id',auth,TaskController.deleteTask);

export default router;