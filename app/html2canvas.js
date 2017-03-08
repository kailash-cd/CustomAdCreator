module.exports = function () {

    return {
        // htmlToImage:function(req,res){
        //     try{
        //         var htmlData = req.body.htmlData,
        //             size = req.body.size,
        //             startTime = new Date().valueOf();
        //         if (!htmlData) {
        //             res.json({'status': 'failure', 'message': 'HTML Data not found.'});
        //             return;
        //         }
        //         if (typeof(htmlData) != "string") {
        //             res.json({'status': 'failure', 'message': 'HTML Data should be a String.'});
        //             return;
        //         }
        //         if (!size) {
        //             res.json({'status': 'failure', 'message': 'Size not found.'});
        //             return;
        //         }
        //         if (typeof(size) != "string") {
        //             res.json({'status': 'failure', 'message': 'Size should be a String.'});
        //             return;
        //         }
        //         size = size.toLowerCase().split('x');
        //         if (!(size.length == 2 && !isVoid(size[0]) && !isVoid(size[1]))) {
        //             res.json({'status': 'failure', 'message': 'Invalid size found.'});
        //             return;
        //         }
        //         htmlData = (new Buffer(htmlData, 'base64')).toString();
        //         var uniqueId = "htmlToImg" + Math.floor((Math.random() * 10000) * 0x10000).toString(36);
        //         var fs = require('fs'),
        //             path = require('path');
        //         if (!fs.existsSync('public/htmlToImageApi')) {
        //             fs.mkdirSync('public/htmlToImageApi');
        //         }
        //         if (!fs.existsSync('public/htmlToImageApi/' + uniqueId)) {
        //             fs.mkdirSync('public/htmlToImageApi/' + uniqueId);
        //         }
        //         var filePath = path.join('public', 'htmlToImageApi', uniqueId, uniqueId);
        //         fs.writeFile(filePath + '.html', '<html><style>root,html,body{margin:0px;padding:0px;</style><body>' + htmlData + '</body></html>', function (err) {
        //             if (err) {
        //                 console.log(err);
        //                 res.json({'status': 'failure', 'message': 'HTML File Writing Failed.'});
        //                 //deleteAdImages('public/ioRequest/',metaData.uniqueId);
        //                 return;
        //             } else {
        //                 var jsData = 'var page=require("webpage").create();page.viewportSize={width:' + size[0] + ',height:' + size[1] + '},page.clipRect={top:0,left:0,width:' + size[0] + ',height:' + size[1] + '},page.open("file:///' + path.join(process.cwd(), filePath).replace(/\\/g, '\/') + '.html' + '",function(){page.render("' + filePath.replace(/\\/g, '\\\\') + '.png"),phantom.exit()});';
        //                 fs.writeFile(filePath + '.js', jsData, function (err) {
        //                     if (err) {
        //                         console.log(err);
        //                         res.json({'status': 'failure', 'message': 'HTMLAdJs File Writing Failed.'});
        //                         //deleteAdImages('public/ioRequest/',metaData.uniqueId);
        //                         return;
        //                     } else {
        //                         var pdfCmd = path.join('.', 'node_modules', 'phantomjs', 'bin', 'phantomjs') + ' ' + filePath + '.js';
        //                         var exec = require('child_process').exec, child;
        //                         child = exec(pdfCmd,
        //                             function (error, stdout, stderr) {
        //                                 if (stderr !== '') {
        //                                     console.log(stderr);
        //                                     res.json({'status': 'failure', 'message': 'HTML to PNG conversion error.'});
        //                                     //deleteAdImages('public/ioRequest/',metaData.uniqueId);
        //                                     return;
        //                                 } else if (error !== null) {
        //                                     console.log(error);
        //                                     res.json({'status': 'failure', 'message': 'HTML to PNG conversion failed.'});
        //                                     //deleteAdImages('public/ioRequest/',metaData.uniqueId);
        //                                     return;
        //                                 } else if (stdout == '') {
        //                                     console.log('HTML successfully converted into Image in ',((new Date().valueOf())-startTime),'ms.');
        //                                     res.json({
        //                                         "contentSize": size[0] + 'x' + size[1],
        //                                         "contentFormat": "png",
        //                                         "base64Content": fs.readFileSync(filePath + '.png').toString('base64')
        //                                     });
        //                                     //deleteAdImages('public/ioRequest/',metaData.uniqueId);
        //                                     return;
        //                                 }
        //                             });
        //                     }
        //                 });
        //             }
        //         });
        //     }
        //     catch(e){
        //         console.trace(e);
        //         res.json({"status": "failure","message":"Exception Occured."});
        //     }
        // },
    }
};



