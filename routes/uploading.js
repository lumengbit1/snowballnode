let express = require('express');
let router = express.Router();
let querystring = require('querystring');
let xlsx = require('node-xlsx');
//let XLSX= require('xlsx');
let fs = require('fs');
// let bodyParser = require('body-parser')
let arr=[];
// let urlencodedParser = bodyParser.urlencoded({ extended: false })

let chokidar = require('chokidar');
let day = new Date();
let today = day.toLocaleDateString();
let watcher = chokidar.watch('./public/upload', {
    ignored: /[\/\\]\./, persistent: true
});





let multer = require('multer');
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/upload/'+today)
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now()+'.xlsx')
//         //cb(null, file.fieldname +'.xlsx')
//     }
// })

// let createFolder = function(folder){
//     try{
//         // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
//         // 如果文件路径不存在将会抛出错误"no such file or directory"
//         fs.accessSync(folder);
//     }catch(e){
//         // 文件夹不存在，以同步的方式创建文件目录。
//         fs.mkdirSync(folder);
//     }
// };
//
// let uploadFolder = './public/upload/'+today;
// createFolder(uploadFolder);

let upload = multer();
//let upload = multer({ storage: storage });
//let fileadd=''
// let filename=''
// watcher.on('add', function(path) {
//
//   //  fileadd='add'
//
//     filename=path
//
//
// })
router.post('/',upload.single('file'), function(req, res, next) {


// if(fileadd=='add') {
  // fileadd=''
    let buff = Buffer.from(req.file.buffer);
 //   console.log('buff',buff)
    let buf = xlsx.parse(buff);
   // console.log('filename',filename)
  // let buf = xlsx.parse(filename);

    let databasedata = buf[0].data;
    console.log('data', databasedata)
    req.getConnection(function (err, conn) {
        if (err) {
            //return next(err);
            return res.status(400).json(err);
        } else {
            //  console.log('get FormData Params: ', req.file.buffer);

            //console.log(data)
            conn.query('DELETE FROM product.producttable', [], function (err, result) {
                if (err) {
                    return next(err);
                } else {
                    conn.query('ALTER TABLE product.producttable AUTO_INCREMENT=1', [], function (err, result) {
                        if (err) {
                            //return next(err);
                            return res.status(400).json(err);
                        } else {
                            console.log(databasedata)
                            let querydata = 'INSERT INTO product.producttable(`name`, `norm`, `number`, `price`, `memberprice`, `pay`, `address`, `code`, `remark`) VALUES ?';
                            let sqldata = [];
                            //console.log(data[0].length)

                            for (let i = 0; i < databasedata.length; i++) {
                                //console.log(array[i*10+1]);
                                //  querydata= 'INSERT INTO product.producttable(`name`, `norm`, `number`, `price`, `memberprice`, `pay`, `address`, `code`, `remark`) VALUES ('
                                //     +'\''+Object.values(data[i])[1]+'\''+','+Object.values(data[i])[2]+','+Object.values(data[i])[3]+','+Object.values(data[i])[4]+','+Object.values(data[i])[5]+','
                                //     +Object.values(data[i])[6]+','+Object.values(data[i])[7]+','+Object.values(data[i])[8]+','+Object.values(data[i])[9]+')'
                                (Object.values(databasedata[i].splice(0, 1)))
                                //console.log(Object.values(data[i]))

                            }
                            databasedata.shift();


      //                      console.log(Object.values(databasedata))
                            conn.query(querydata, [Object.values(databasedata)], function (err, result) {
                                if (err) {
                                    //return next(err);
                                    return res.status(400).json(err);
                                } else {
                                    //res.send(JSON.stringify(result));
                                    return res.status(200).json(result);
                                }

                            });
                        }

                    })
                }

            });
        }

    });
// }else{
//     return res.status(400).json(err);
// }
});



module.exports = router;
