const _ = require('lodash');
const { ContactSupport } = require('../models/supportModel')

module.exports.createSupport = async (req, res) => {
    try {
        let support = new ContactSupport(_.pick(req.body, ['userID', 'fromEmail', 'supportType', 'supportText', 'status', 'isReplied']))
        support.UserInfo = req.user._id
        let supportModel = await ContactSupport.find()
        support.id = supportModel.length + 1
        const result = await support.save();
        return res.status(200).send({
            message: "A new support created!",
            support: _.pick(result, ["_id", 'id', 'userID', 'fromEmail', 'supportType', 'supportText', 'status', 'isReplied', 'UserInfo'])
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getAllSupport = async (req, res) => {
    try {
        await ContactSupport.find().then(supports => {
            return res.status(200).send(supports)
        }).catch(err => {
            return res.status(400).send(err)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getOneSupport = async (req, res) => {
    ContactSupport.findById(req.body._id)
        .then(support => {
            if (!support) {
                return res.status(404).send("Support not found")
            } else {
                return res.status(200).send(support)
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

module.exports.editSupport = async (req, res) => {
    try {
        let supportId = req.params.id
        let { fromEmail, supportType, supportText, status } = req.body
        const support = await ContactSupport.findById(supportId);

        const updatedFields = _.pick(req.body, ['id', 'userID', 'fromEmail', 'supportType', 'supportText', 'status', 'isReplied', 'UserInfo']);
        if (fromEmail === '') {
            updatedFields.fromEmail = support.fromEmail
        } if (supportType === '') {
            updatedFields.supportType = support.supportType
        } if (supportText === '') {
            updatedFields.supportText = support.supportText
        } if (status === '') {
            updatedFields.status = support.status
        }
        _.assignIn(support, updatedFields)

        support.save()
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

module.exports.deleteSupport = async (req, res) => {
    await ContactSupport.deleteOne({ _id: req.params.id }).then(response => {
        return res.status(200).json("Successfully deleted!")
    }).catch(err => {
        return res.status(400).send(err)
    })
}

module.exports.editIsReplied = async (req, res) => {
    let supportId = req.params.id
    await ContactSupport.updateOne({ _id: supportId }, { isReplied: req.body.isReplied, reply: req.body.reply })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `id user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })
}

