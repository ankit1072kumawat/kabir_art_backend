const express = require('express');
const People = require('../models/people');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer')
const checkAuth = require('./../middleware/check-auth')
const peopleController = require('./../controllers/people')

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {//destination where images will store
//         cb(null, __dirname + '/uploads')
//     },
//     filename: function (req, file, callback) {
//         callback(null, Date.now() + file.originalname);
//     }
//   })
  //configuration
  // const upload = multer({
  //   storage: storage,
  // })
  const STORAGE = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const uploads = multer({ storage: STORAGE });

  router.post('/upload', uploads.single('image'), (req, res, next) => {
    console.log(req.file);
    res.json({ 
        message: 'Uploaded successfully!', 
        data: {
            filename:req.file.filename,
            path:req.file.path
        } 
    });
})


router.get('/', peopleController.get_all_people);

router.post('/people', uploads.single('image'), checkAuth, peopleController.post_people);
router.get('/:people_id', peopleController.get_people_by_id)

router.delete('/:people_id', checkAuth, peopleController.delete_people)

router.patch('/:people_id', checkAuth, peopleController.update_people_entry)
module.exports = router