var mongoose = require("mongoose");

let expenseSchema = new mongoose.Schema({
    title:          { type: String, required: true },
    amount:         { type: Number, required: true },
    interval:       { type: Number, required: true, default: 1},
    notes:          { type: String, required: false },
    date:           { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('Expenses', expenseSchema);