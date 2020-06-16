import multer from 'multer'

const uploadDocuments = multer({
    dest:'images',
    limits:{
        fileSize:1000000

    },
    fileFilter:(req,file,cb)=>{
    if(!file.originalname.match(/\.(doc|docx)$/)){
       return cb(new Error('Please upload a document'))
    }
      cb(undefined,true)
      cb(undefined,false)
    }
})

export const uploadAvatar = multer({
   limits:{
       fileSize:1000000
   },
   fileFilter:(req,file,cb)=>{
       if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
           return cb( new Error('Please upload an image'))
       }

       cb(undefined,true)
      cb(undefined,false)

   }
})

 export default uploadDocuments;