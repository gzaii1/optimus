const  mongoose = require('mongoose')

const Schema = mongoose.Schema

const fileSchema = new Schema({
    id:{type: Schema.Types.ObjectId},
    project_name:String,
    cee_version:String,
    run_time:String,
    task_status:String
})

const model = {
    Files: mongoose.model("Files", fileSchema)
}

module.exports = model