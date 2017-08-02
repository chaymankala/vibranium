var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wallpaperSchema = new Schema({
    cid: {required:true,type:String},
    category_name: String,
    category_image: String,
    id: {required:true,type:String},
    cat_id:String,
    image_date: String,
    image: {required:true,type:String},
    cld:Object
});

var wallpaper = mongoose.model('wallpaper', wallpaperSchema);

module.exports = wallpaper;
