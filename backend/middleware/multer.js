import multer from 'multer'


// image storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname) 
  }

  })


 const upload = multer({storage:storage})   

 export default upload;