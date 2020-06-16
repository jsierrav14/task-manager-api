import { Router } from 'express';
import UserController from '../controllers/user'
import auth from '../middleware/auth'
import uploadDocuments,{uploadAvatar} from '../middleware/upload'
import {handleError} from '../middleware/errors'
const router = new Router();

router.post('/users',UserController.add)
router.get('/users/me',auth,UserController.getProfile)
router.get('/users/:id',UserController.getById)
router.patch('/users/me',auth,UserController.updateUser)
router.delete('/users/me',auth,UserController.deleteUser)
router.post('/users/login',UserController.logging)
router.post('/users/logout',auth,UserController.logout)
router.post('/users/logoutAll',auth,UserController.logoutAll)
router.post('/users/me/avatar',auth,uploadAvatar.single('upload'),UserController.uploadProfile,handleError)
router.post('/upload',auth,uploadDocuments.single('upload'),UserController.uploadDocument,handleError)
router.delete('/users/me/avatar',auth,UserController.deleteProfile)
router.get('/users/:id/avatar',UserController.getAvatar)


export default router;