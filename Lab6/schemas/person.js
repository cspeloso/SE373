var mongoose = require("mongoose");

let personSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: String,
    startDate: Date,
    jobTitle: String,
    salary: Number
})

module.exports = mongoose.model('Person', personSchema);