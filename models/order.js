const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    product_name: String,
    product_id : String,
    category: String,
    quantity: Number,
    unit_price: Number,
    status:{
        type: String,
        default:"Pending",
    },
    email: String,
    address: String,
    date:{
        type: Date,
        default: Date.now
    },
    message: String,
    delivery_date: Date,
})

orderSchema.virtual('price').get(function(){
    return (this.unit_price * this.quantity)
});

module.exports = mongoose.model('order',orderSchema)