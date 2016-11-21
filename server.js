/**
 * Created by Administrator on 2016/7/30.
 */
// var http = require('http');
// var url = require('url');
// function  start() {
//     http.createServer(function (request, response) {
//         var pathname = url.parse(request.url).pathname;
//         console.log('Request ' + pathname + ' has been received!');
//         response.writeHead(200, {'Content-Type': 'text/plain'});
//         response.write('Hi,the world is running!!');
//         setTimeout(function(){
//             response.write('The world is stoped')
//             response.end();
//         }, 10000)
//     }).listen(8888);
//     console.log('Server has started on 8888!');
// };
//
// exports.start = start;
var http = require('http');
var url = require('url');

function start() {
    http.createServer( function(req, res){
        var pathname = url.parse(req.url).pathname;
        console.log('Request ' + pathname + ' has been received!');
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.write('Hi,I am vedio demo!');
        setTimeout(function () {
            res.write('The word is stoped 10 second!')
            res.end();
        }, 100000);
    }).listen(8888);
  console.log('Server has started on 8888!') ;
};

exports.start = start;