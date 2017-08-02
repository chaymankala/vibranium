var express = require('express');
var router = express.Router();

var Wallpaper = require('../models/wallpaper');
var cloudinary = require('cloudinary');


router.post('/add', function (req, res, next) {

    if (req.body == null) {
        res.status(404);
    }
    else {
        console.log(req.body);
        Wallpaper.collection.insert(req.body.walls, {}, function (err, success) {
            if (err) {
                //console.log(err);
                return res.status(500).send(err);
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

    Wallpaper.find(function (err, walls) {
        if (err) return res.status(500).json(err);

        return res.json(walls);
    })


});

router.post('/image', function (req, res, next) {

    Wallpaper.findOne({image:req.body.image},function (err, wall) {
        if (err) return res.status(500).json(err);

        return res.json(wall.cld.url)

    })
})

router.post('/catimage', function (req, res, next) {

    Wallpaper.find({cat_id:req.body.cat},function (err, walls) {
        if (err) return res.status(500).json(err);
        let k = [];
        for(let i of walls){
            if(i.cld)
            k.push(i.cld.url);
        }
        return res.json(k)
    })
})

router.get('/move', function (req, res, next) {

    Wallpaper.find(function (err, walls) {
        if (err) return res.status(500).json(err);

        cloudinary.config({
            cloud_name: 'vibranium',
            api_key: '122269859827371',
            api_secret: 'scJeSkNP2yfuVH9BnOFUqvkNCJw'
        });
       var  c = 0;
        for (let i of walls) {
            if (i.cld) {
                if (i.cld.secure_url) {
                    continue;
                }
            }
            cloudinary.uploader.upload("http://justnewdesigns.com/app/Hero/upload/" + i.image, function (result) {
                console.log("uploaded");
                Wallpaper.findOne({ id: i.id }, function (err, wall) {
                    wall.cld = result;
                    wall.save(function (err) {
                        if (err) console.log(err);
                        else {
                            console.log("inserted");
                            c++;
                            console.log(c);
                        }

                    })
                })
            });
        }
        return res.json({ "done": "bro" })

    })
})

module.exports = router;