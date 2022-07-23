const _ = require('lodash');
const { User } = require('../models/userModel')
const bcrypt = require('bcrypt');

module.exports.login = async (req, res) => {
    let user = await User.findOne({ userName: req.body.userName })
    if (!user) return res.status(400).send('Invalid userName or password');

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send('Invalid userName or password');

    const token = user.generateJWT();
    return res.status(200).send({
        message: 'Login Succssful!',
        token: token,
        user: _.pick(user, ['_id', 'id', 'userName', 'fullName', 'totalSupport'])
    })
}

module.exports.createUser = async (req, res) => {
    try {
        let user = {}
        user = await User.findOne({ userName: req.body.userName })
        if (user) return res.status(400).send('User name already register!')
        let userModel = await User.find()
        console.log(userModel)
        user = new User(_.pick(req.body, ['userName', 'fullName', 'totalSupport']))
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.id = userModel.length + 1
        const result = await user.save();
        return res.status(200).send({
            message: "User create successfully;",
            user: _.pick(result, ["_id", 'id', 'userName', 'fullName', 'totalSupport'])
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getAllUser = async (req, res) => {
    try {
        await User.find().then(users => {
            return res.status(200).send(users)
        }).catch(err => {
            return res.status(400).send(err)
        })


    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getOneUser = async (req, res) => {
    User.findById(req.body._id)
        .then(user => {
            if (!user) {
                return res.status(404).send("User not found")
            } else {
                return res.status(200).send(user)
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

module.exports.editUser = async (req, res) => {
    try {
        let userId = req.params.id
        const user = await User.findById(userId);
        let updatedFields = _.pick(req.body, ['id', 'userName', 'fullName', 'totalSupport']);

        let {userName,fullName} = req.body

        if (userName === '') {
            updatedFields.userName = user.userName
        } if (fullName === '') {
            updatedFields.fullName = user.fullName
        } 
        
        _.assignIn(user, updatedFields)

        user.save()
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a create operation"
                });
            });

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.deleteUser = async (req, res) => {
    await User.deleteOne({ _id: req.params.id }).then(response => {
        return res.status(200).json("User delete successfully!")
    }).catch(err => {
        return res.status(400).send(err)
    })
}

