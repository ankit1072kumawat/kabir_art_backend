const Posts = require('../models/posts');
const People = require('../models/people');

const mongoose = require('mongoose');

exports.getAllPosts = (req, res, next) => {
    Posts.find()
        // .select('_id user title description category keyword created_at')
        .populate('task')
        // .populate('user')
        .exec()
        .then(result => {
            if (result) {
                console.log('posts111111111111111111111111111', result)
                const response = {
                    count: result.length,
                    posts: result
                }
                res.status(200).json({
                    data: response,
                    message: 'posts fetched successfully'
                });
            } else {
                res.status(404).json({
                    message: 'No data found',
                })
            }
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
}

exports.create_post = (req, res, next) => {
    console.log('``````````````````````', req.body)
    const post = new Posts({
        _id: new mongoose.Types.ObjectId,
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        keyword: req.body.keyword,
        image: req.body.image,
        created_at: new Date().toISOString()
    })
    post.save()
        .then(result => {
            console.log('ssss', post)
            res.status(201).json({
                message: 'posts inserted successfully',
                data: result
            });
        })
        .catch(error => {
            res.status(500).json({ error: error })
            console.log(error)
        });
}

exports.getUserAllPosts = async (req, res) => {
    const id = req.params.user;
    Posts.find()
        // .populate('user')
        // .select('_id name mobile email address image')
        .exec()
        .then(async (post) => {
            console.log('~~~~~~', post)
            if (!post) {
                res.status(404).json({
                    message: 'user entry not found. Please select a valid user'
                })
            }
            await res.status(200).json({
                message: "Task fetched successfully",
                post: post
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
}

exports.deletePost = (req, res) => {
    const id = req.params.postId;
    const userId = req.params.userId;

    Posts.find({
        user: {
            _id: userId
        }
    })
        .populate('user')
        // .select('_id name mobile email address image')
        .exec()
        .then(async (post) => {
            console.log('~~~~~~', post.user)
            if (!post) {
                res.status(404).json({
                    message: 'user entry not found. Please select a valid user'
                })
            }
            if(userId == post[0].user._id) {
                console.log('helooooooooo')
                deletePostAction(id, res);
            } else {
                res.status(401).json({ message: 'User is not authorized' })

            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
}

deletePostAction = (postId, res) => {
 Posts.remove({ _id: postId })
        .exec()
        .then(result => {
            res.status(200).json(result)
        }
        ).catch(err =>
            res.status(500).json({
                error: err
            })
        )
    return res.status(200).json({
        message: 'Post Deleted'
    })
}

exports.getPostById = (req, res) => {
    console.log('******',req.params)
    const id = req.params.post_id;
    console.log('******',id)
    Posts.findById(id)
        // .select('_id name mobile email address image')
        .exec()
        .then(result => {
            console.log('------',result)
            if (result) {
                const post = {
                    count: result.length,
                    posts: result
                }

                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'No post found for provided Id' })
            }
            // res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
}

exports.update_people_entry = (req, res) => {
    const id = req.params.people_id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    People.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}
