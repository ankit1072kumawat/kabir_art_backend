const People = require('../models/people');
const mongoose = require('mongoose');

exports.get_all_people = (req, res, next) => {
    People.find()
        .select('_id name mobile email address image')
        .populate('task')
        .exec()
        .then(result => {
            if (result) {
                console.log('people',result)
                const response = {
                    count: result.length,
                    people: result
                }
                res.status(200).json({
                    data: response,
                    message: 'people data fetched successfully'
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

exports.post_people = (req, res, next) => {
    console.log('``````````````````````',req.body)
    const customer = new People({
        _id: new mongoose.Types.ObjectId,
        userId: Math.random(1*100),
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        address: req.body.address,
        image: req.body.image
    })
    customer.save()
        .then(result => {
            console.log('ssss',customer)
            res.status(201).json({
                message: 'People inserted successfully',
                data: result
            });
            // console.log('result',result)
        })
        .catch(error => {
            res.status(500).json({ error: error })
            console.log(error)
        });
}

exports.get_people_by_id = (req, res) => {
    const id = req.params.people_id;
    People.findById(id)
        .select('_id name mobile email address image')
        .exec()
        .then(result => {
            if (result) {
                const people = {
                    count: result.length,
                    people: result
                }

                res.status(200).json(people);
            } else {
                res.status(404).json({ message: 'No entry found for provided Id' })
            }
            // res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
}

exports.delete_people = (req, res) => {
    const id = req.params.people_id;
    People.remove({ _id: id })
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
        message: 'Deleted'
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
