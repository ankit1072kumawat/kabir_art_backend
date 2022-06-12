
// const express = require('express');
// const router = express.Router();
// const multer = require('multer')
// // var storage = multer.diskStorage({
// // //     destination: function (req, file, cb) {//destination where images will store
// // //         cb(null, __dirname + '/uploads/')
// // //     },
// // //     filename: function (req, file, callback) {
// // //         callback(null, Date.now() + file.originalname);
// // //     }
// // //   })
// // //   //configuration
// // //   const upload = multer({
// // //     storage: storage,
// // // //   })
// const STORAGE = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, './uploads/');
//     },
//     filename: function(req, file, cb) {
//       cb(null, file.originalname);
//     }
//   });
  
// //   const fileFilter = (req, file, cb) => {
// //     // reject a file
// //     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
// //       cb(null, true);
// //     } else {
// //       cb(null, false);
// //     }
// //   };
  
// //   const upload = multer({
// //     storage: storage,
// //     limits: {
// //       fileSize: 1024 * 1024 * 5
// //     },
// //     fileFilter: fileFilter
// //   });
// // const upload = multer({dest: '/uploads'})
// const uploads = multer({ storage: STORAGE });

//   router.post('/upload',  uploads.single('photo'), (req, res) => {
//     if(req.file) {
//         res.json(req.file);
//     }
//     else throw 'error';
// });

// module.exports = router
const express = require('express');
const router = express.Router();
const multer = require('multer');
const STORAGE = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    }, filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const uploads = multer({ storage: STORAGE });

router.post('', uploads.single('image'), (req, res, next) => {
    console.log(req.file);
    res.json({ 
        message: 'Uploaded successfully!', 
        data: {
            filename:req.file.filename,
            path:req.file.path
        } 
    });
})
module.exports = router;