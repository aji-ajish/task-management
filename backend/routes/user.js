import express from 'express';
import {
    createUser, deleteUser,
    forgotPassword, loginUser, myProfile,
    resetPassword,
    updatePassword, updateProfile, updateUserById,
    user, userList, verifyOTP
} from '../controllers/user.js';
import { isAuth } from '../middleware/isAuth.js';
import { uploadProfile } from '../middleware/multer.js';

const router = express.Router();

router.post('/user/createUser', isAuth, uploadProfile, createUser)
router.post('/user/login', loginUser)
router.get('/user/profile', isAuth, myProfile)
router.get('/user/users', isAuth, userList)
router.get('/user/:id', isAuth, user)
router.put('/user/updateUser/:id', isAuth, uploadProfile, updateUserById)
router.put('/user/updateProfile', isAuth, uploadProfile, updateProfile)
router.put('/user/changePassword', isAuth, updatePassword)
router.post('/user/forgotPassword', forgotPassword)
router.post('/user/verifyOTP', verifyOTP)
router.put('/user/resetPassword', resetPassword)
router.delete('/user/:id', isAuth, deleteUser)

export default router 