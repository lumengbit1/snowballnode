let express = require('express');
let router = express.Router();
let querystring = require('querystring');
let data=[];
let senddata=[];

router.post('/', function(req, res, next) {

    req.getConnection(function(err, conn) {
        if (err) {
            return next(err);
        } else {
            console.log('index',req.body.indexname)
            let  querydata='';
            let total = '';
            //    console.log('m',m)


                querydata= 'SELECT * FROM product.product where customname=\''+req.body.indexname+'\'';



            //  const  querydata= 'SELECT * FROM product.producttable LIMIT '+ n +','+ m;
            //console.log(querydata)
            conn.query(querydata, [], function(err,result) {
                if (err) {
                    return next(err);
                } else {
                    res.send(JSON.stringify(result));

                }

            });

        }

    });

});



module.exports = router;
