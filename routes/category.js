var express = require('express');
var router = express.Router();

var Category = require('../models/category');

router.post('/add', function (req, res, next) {

    if (req.body == null) {
        res.status(404);
    }
    else {

        Category.collection.insert(req.body.cats, {}, function (err, success) {
            if (err) {
                res.status(404).json({ "fuck": "off" });
            }
            else {
                console.log(success);
                res.json({ "yolo": 'bro' })
            }
        })
    }


});




//get all categories
router.get('/', function (req, res, next) {

    if (req.body == null) {
        res.status(404);
    }
    else {
        Category.find(function (err, cats) {
            if (err) return res.status(500).json(err);

            return res.json(cats);
        })
    }


});

module.exports = router;