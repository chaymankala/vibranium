var express = require('express');
var router = express.Router();
//var tabletojson = require('tabletojson');
var htmlToJson = require('html-to-json');

router.get('/', function (req, res, next) {
    let limit = req.query.limit || 200;
    let offset = req.query.offset || 0;
    let chart = req.query.chart || 'USpop'; 
    var url = 'http://snkhan.co.uk/stuff/iTunes.php?chart='+chart;
    console.log('Im here 1')



    var promise = htmlToJson.request(url, {
        'songs': ['img', function ($img) {
            let x = $img.attr('alt');
            let y = $img.attr('src');
            if (x) {
                x = x.replace(' artwork', '');
                if (y) {
                    return { song: x, src: y }
                }
                return { song: x, src: '' }
            }
            //return;
        }]
    }, function (err, result) {
        if (err) {
            return res.status(500).send('Sorry Bro');
        }
        let resToSend = [];
        for (let i of result.songs) {
            if (i && i.song) resToSend.push({ name: i.song.split('-')[1] || i.song, artist: i.song.split('-')[0] || 'Unknown', artwork: i.src });
        }
        resToSend = resToSend.slice(parseInt(offset), parseInt(limit) + parseInt(offset));
        res.json({ data: resToSend });
    });

    promise.done((result) => {

    })





    // tabletojson.convertUrl(url)
    //     .then(function (tablesAsJson) {
    //         let dataToSend = [];
    //         if (tablesAsJson && tablesAsJson.length) {

    //             for (let i = 0; i < tablesAsJson.length; i += 2) {
    //                 for (let j of tablesAsJson[i]) {
    //                     if (j['3']) {
    //                         let c = j['3']
    //                         try {
    //                             c = c.replace(/\n/g, "");
    //                             c = c.replace(/\t/g, "");
    //                             c = c.replace(/  /g, "_");
    //                             c = c.split('_')[0]
    //                             c = c.replace(/([A-Z])/g, ' $1').trim()
    //                             dataToSend.push({name:c});
    //                         }
    //                         catch (err) {
    //                             console.log(err)
    //                         }
    //                     }
    //                 }
    //             }
    //         }

    //         return res.json({ data: dataToSend });
    //     }).catch(err => {
    //         console.log('Im here 3');
    //         console.log(err)
    //         return res.send(err);
    //     });
})

module.exports = router;