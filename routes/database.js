let express = require('express');
let router = express.Router();
let querystring = require('querystring');
let data=[];
let senddata=[];

router.post('/', function(req, res, next) {
    // let body = "";
    // let chunk = '';
    // req.on('data', function (chunk) {
    //     body += chunk;
    //     console.log(chunk);
    // });
    // req.on('end', function () {
    //     body = querystring.parse(body);
    //     // 设置响应头部信息及编码
    //
    // })
    req.getConnection(function(err, conn) {
        if (err) {

            return next(err);
        } else {
       //     console.log('body',req.body.results)
          //  let n= (parseInt(Object.values(req.body.page))-1) * parseInt(Object.values(req.body.results))
         //   let m = parseInt(Object.values(req.body.results))
            let n= (parseInt(req.body.page)-1) * parseInt(req.body.results)
            let m = parseInt(req.body.results)
            let  querydata='';
            let total = '';
        //    console.log('m',m)
        //      console.log(req.body);

             if(typeof(req.body.filters)!='undefined'){

                 querydata= 'SELECT * FROM product.custom where name like\'%'+req.body.filters.toString() +'%\' LIMIT '+ n +','+ m;
                 total = 'select count(*) from product.custom where name like\'%'+req.body.filters.toString()+'%\'';

            }else if(typeof(req.body.all)!='undefined'){
                 querydata= 'SELECT * FROM product.product';
                 total = 'select count(*) from product.product';
             }else{
                 querydata= 'SELECT * FROM product.custom LIMIT '+ n +','+ m;
                 total = 'select count(*) from product.product';
            }
           //  const  querydata= 'SELECT * FROM product.producttable LIMIT '+ n +','+ m;
            //console.log(querydata)
            conn.query(querydata, [], function(err,result) {
                if (err) {
                    return next(err);
                } else {
  //                  res.Json(result); //可以直接把结果集转化Json返回给客户端
  //                  res.json = {data: [res, result]};
                        data=result;
                    // conn.query('select COLUMN_NAME from information_schema.COLUMNS where table_name = \'producttable\'', [], function(err,result){
                    //     if (err) {
                    //         return next(err);
                    //     } else{
                    //
                    //         data.push(result);
                    //         console.log('data1',data)
                            conn.query(total, [], function(err,result) {
                                if (err) {
                                    return next(err);
                                } else {
                                    data.push(result);
                                   // console.log('data2',data)
                                    res.send(JSON.stringify(data));
                                }
                            });
                    //     }
                    // })


                    //  res.send(JSON.stringify(result));
                }

            });

        }

    });

});



module.exports = router;
