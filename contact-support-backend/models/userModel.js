const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken');

const userSchema = Schema({
    id: {
        type: Number
    },
    userName: {
        type: String
    },
    fullName: {
        type: String
    },
    password: {
        type: String
    },
    totalSupport:{
        type:Number,
        default:0
    }
}, { timestamps: true })

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        id:this.id,
        userName: this.userName,
        fullName: this.fullName,
        totalSupport:this.totalSupport
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
    return token;
}

module.exports.User = model('User', userSchema);
