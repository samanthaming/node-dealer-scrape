var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VerizonSchema = new Schema({
    // result: [{
    //     standard_size: Boolean,
    //     more_size: String,
    //     data_letter: String,
    //     data_size: String,
    //     data_amount: Number,
    //     data_type: String,
    //     data_type_name: String,
    //     data_price: Number,
    //     data_promo: String,
    //     data_sku: String,
    //     data_head: String,
    //     data_text_msg: String
    // }] 
    data_plans: []
}, {timestamps: true});  
  
var Verizon = mongoose.model('Verizon', VerizonSchema);

module.exports = Verizon;