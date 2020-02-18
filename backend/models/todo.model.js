const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    task:{
        type: String,
        required: true
    },
    status: {
        type: String,
        lowercase: true
    },

},{
    timestamps: true
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;