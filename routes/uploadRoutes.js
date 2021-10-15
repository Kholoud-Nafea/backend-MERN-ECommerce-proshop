import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
   destination(req, file, cb) {
      cb(null, 'uploads/')
   },
   filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.
         originalname)}`)
   }
})

//to avoid allow any type of files
function checkFileType(file, cb) {
   const filetypes = /jpg|jpeg|png/
   const extnameChecked = filetypes.test(path.extname(file.originalname).toLowerCase()) //return true or false
   const mimetypeChecked = filetypes.test(file.mimetype)

   if(extnameChecked && mimetypeChecked) {
      return cb(null, true)
   } else {
      cb('Images only!')
   }
}

const upload = multer({
   storage,
   fileFilter: function(req, file, cb){
      checkFileType(file, cb)
   }
})

router.post('/', upload.single('image'), (req, res) => {
   res.send(`/${req.file.path}`)
})
export default router