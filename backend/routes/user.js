import express from 'express';
import { createUser, deleteUser, loginUser, myProfile, user, userList } from '../controllers/user.js';
import { isAuth } from '../middleware/isAuth.js';
import { uploadProfile } from '../middleware/multer.js';

const router = express.Router();

router.post('/user/createUser', isAuth,uploadProfile, createUser)
router.post('/user/login', loginUser)
router.get('/user/profile', isAuth, myProfile)
router.get('/user/users', isAuth, userList)
router.get('/user/:id', isAuth, user)
router.delete('/user/:id', isAuth, deleteUser)

export default router 