var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    cid: { type: Number, required: true, unique: true },
    category_name: { type: String, required: true },
    category_image: { type: String, required: true }
});

var category = mongoose.model('category', categorySchema);

module.exports = category;
