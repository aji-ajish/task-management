import multer from 'multer'
import {v4 as uuid} from 'uuid'

const storage=multer.diskStorage({
    destination(req,res,cb){
        cb(null,'./userProfiles')
    },
    filename(req,file,cb){
        const id=uuid()
        const extension=file.originalname.split('.').pop()
        const fileName=`${id}.${extension}`
        cb(null,fileName)
    }
})

export const uploadProfile=multer({storage}).single('image')