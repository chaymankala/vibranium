var express = require('express');
var router = express.Router();
var tabletojson = require('tabletojson');

router.get('/', function (req, res, next) {

    var url = 'http://snkhan.co.uk/stuff/iTunes.php?chart=USpop';
    console.log('Im here 1')
    tabletojson.convertUrl(url)
        .then(function (tablesAsJson) {
            let dataToSend = [];
            if (tablesAsJson && tablesAsJson.length) {

                for (let i = 0; i < tablesAsJson.length; i += 2) {
                    for (let j of tablesAsJson[i]) {
                        if (j['3']) {
                            let c = j['3']
                            try {
                                c = c.replace(/\n/g, "");
                                c = c.replace(/\t/g, "");
                                c = c.replace(/  /g, "_");
                                c = c.split('_')[0]
                                c = c.replace(/([A-Z])/g, ' $1').trim()
                                dataToSend.push(c);
                            }
                            catch (err) {
                                console.log(err)
                            }
                        }
                    }
                }
            }

            return res.json({ data: dataToSend });
        }).catch(err => {
            console.log('Im here 3');
            console.log(err)
            return res.send(err);
        });
})

module.exports = router;