const { Schema, model } = require('mongoose')

const contactSupportSchema = Schema({
    id: {
        type: Number
    },
    userID: {
        type: Number
    },
    fromEmail: {
        type: String
    },
    supportType:{
        type: String,
        enum: ['SignUp', 'Login','ForgetPassword','Account']
    },
    supportText: {
        type: String
    },
    status: {
        type: String
    },
    reply: {
        type: String
    },
    isReplied:{
        type:Boolean,
        default:false
    },
    UserInfo:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })


module.exports.ContactSupport = model('ContactSupport', contactSupportSchema);
