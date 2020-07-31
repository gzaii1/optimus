const  mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    id:{type: Schema.Types.ObjectId},
    name:{unique:true, type:String},
    password:String,
})

const model = {
    Users: mongoose.model("Users", userSchema)
}

module.exports = model