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
           if(typeof(req.body.delete)!='undefined'){
                //console.log('delete',req.body.data)
                querydata= 'DELETE FROM product.producttable WHERE id='+ req.body.data;
                conn.query(querydata, [], function(err,result) {
                    if (err) {
                        return next(err);
                    }else{
                        res.send(JSON.stringify(result));
                    }
                })
            }else if(typeof(req.body.edit)!='undefined'){
               //console.log('edit',Object.values(req.body)[2])
                querydata= 'UPDATE product.producttable SET name=\''+ Object.values(req.body)[2]+'\',norm='+Object.values(req.body)[3]+',number='+Object.values(req.body)[4]
                +',price='+Object.values(req.body)[5]+',memberprice='+Object.values(req.body)[6]+',pay='+Object.values(req.body)[7]+',address='+Object.values(req.body)[8]
                +',code='+Object.values(req.body)[9]+',remark='+Object.values(req.body)[10]+' WHERE id='+Object.values(req.body)[1];
               //console.log('edit',querydata)
               conn.query(querydata, [], function(err,result) {
                   if (err) {
                       return next(err);
                   }else{
                       res.send(JSON.stringify(result));
                   }
               })
           }

         }

    });

});



module.exports = router;
