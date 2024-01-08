const mongoose= require('mongoose')

const walletSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    material: String,
    brand: String,
    description: String,
    measurement: String,
    category: {
        type: String,
        default: "wallet"
    },
    image: String,
    date:{
        type: Date,
        default: Date.now
    },

})

module.exports= mongoose.model('wallet', walletSchema);
