
const mongoose = require("mongoose");

const centerSchema = mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    capacity: { type: Number, required: true },
    costPerDay: { type: Number, required: true },
}, {
    versionKey: false,
    timestamps: true
})

const Center = mongoose.model("Center", centerSchema);


module.exports=Center;