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
                querydata= 'DELETE FROM product.custom WHERE id='+ req.body.data;
                queryproduct = 'DELETE FROM product.product WHERE customname=(SELECT `name` FROM product.custom where id='+req.body.data+')'
                //console.log('querydata',querydata)
               //console.log('queryproduct',queryproduct)
               conn.query(queryproduct, [], function(err,result) {
                   if (err) {
                       return next(err);
                       console.log('failed')
                   }else{
                       console.log('success')
                       conn.query(querydata, [], function(err,result) {
                           if (err) {
                               return next(err);
                           }else{
                               res.send(JSON.stringify(result));
                           }
                       })
                   }
               })

            }else if(typeof(req.body.edit)!='undefined'){
               console.log('edit',Object.values(req.body))
                querydata= 'UPDATE product.custom SET name=\''+ Object.values(req.body)[1]+'\',member='+Object.values(req.body)[2]+',address='+Object.values(req.body)[3]
                +',ordernum='+Object.values(req.body)[4]+',remark='+Object.values(req.body)[5]+' WHERE id='+Object.values(req.body)[6];

               conn.query(querydata, [], function(err,result) {
                   if (err) {
                       return next(err);
                   }else{
                       res.send(JSON.stringify(result));
                   }
               })
           }else if(typeof(req.body.subedit)!='undefined'){
               querydata= 'UPDATE product.product SET name=\''+ Object.values(req.body)[1]+'\',number='+Object.values(req.body)[2]+',price='+Object.values(req.body)[3]
                   +',sum='+Object.values(req.body)[4]+',weight='+Object.values(req.body)[5]+',company='+Object.values(req.body)[6]+',finish='+Object.values(req.body)[7]
                   +',remark='+Object.values(req.body)[8]+' WHERE id='+Object.values(req.body)[9];
               console.log('subedit',querydata)
               conn.query(querydata, [], function(err,result) {
                   if (err) {
                       return next(err);
                   }else{
                       console.log('subeditsuccess')
                       res.send(JSON.stringify(result));
                   }
               })
           }else if(typeof(req.body.subdelete)!='undefined'){
               querydata= 'DELETE FROM product.product WHERE id='+ req.body.data;
               //console.log('querydata',querydata)
               //console.log('queryproduct',queryproduct)

               console.log('success')
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
