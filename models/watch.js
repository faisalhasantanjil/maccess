const mongoose= require('mongoose')

const watchSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    material: String,
    brand: String,
    description: String,
    measurement: String,
    category: {
        type: String,
        default: "watch"
    },
    image: String,
    date:{
        type: Date,
        default: Date.now
    },

})

module.exports= mongoose.model('watch', watchSchema);
