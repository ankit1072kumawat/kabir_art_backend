const express = require('express');
const router = express.Router();
const postsController = require('./../controllers/posts')
const multer = require('multer')
const checkAuth = require('./../middleware/check-auth')

const STORAGE = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/posts/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const uploads = multer({ storage: STORAGE });

  router.post('/upload/posts', uploads.single('image'), (req, res, next) => {
    console.log(req.file);
    res.json({ 
        message: 'Uploaded successfully!', 
        data: {
            filename:req.file.filename,
            path:req.file.path
        } 
    });
})



router.post('/create-post', postsController.create_post)
router.get('/:post_id', postsController.getPostById)

router.get('/', postsController.getAllPosts)

// // get user Posts
router.get('/user-posts/:user',  postsController.getUserAllPosts)


// // update post
// router.get('/:postId', postsController.GetFullPost)

// // get full post
// router.get('/:postId', postsController.updatePost)

// Delete route
router.delete('/:userId/:postId',checkAuth,  postsController.deletePost)
module.exports = router