const User = require('./../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secret = require('./../config/db-config')

const mongose = require('mongoose');

exports.create_user = (req, res, next) => {
    console.log('********',req)
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(422).json({
                    message: 'user email already exists'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        // const user = new User({
                        //     _id: new mongose.Types.ObjectId,
                        //     name: req.body.name,
                        //     email: req.body.email,
                        //     password: hash,

                        // });
                        const user = new User(req.body);
                        user.password = hash
                        user.save()
                            .then(result => {
                                console.log('result', result)
                                if (result) {
                                    res.status(201).json({
                                        message: 'user sign up successfully',
                                        data: result
                                    })
                                }
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}

exports.login_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            console.log('user', process.env.JWT_key)
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'User Unauthorized'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'User Unauthorized'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        secret.secret,
                        {
                            // expiresIn: "1hr"
                        });

                    return res.status(201).json({
                        message: 'Login successful',
                        token: token,
                        // user:user
                    })
                }
                res.status(401).json({
                    message: 'User Unauthorized'
                })

            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}

exports.get_all_users = (req, res, next) => {
    User.find()
        // .select('_id email password')
        .then(result => {
            if (result) {
                console.log('-----------',result)
                const data = {
                    count: result.length,
                    data: result
                }
                res.status(200).json({
                    message: 'users data fetched successfully',
                    data: data
                })
            }
        })
        .catch(error => {
            if (error) {
                res.status(500).json({
                    error: error
                })
            }
        })

}
exports.get_user_by_id = (req, res, next) => {
    const id = req.params.userId;
    // console.log(id)
    User.findById(id)
        .select('_id email password')
        .then(result => {
            if (result) {
                res.status(200).json({
                    data: result,
                    message: 'user details fetched successfully'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
exports.delete_user = (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'user deleted.'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}