//引入依赖
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const getMime = require('./util/getMime.js');


//创建服务器
const www = http.createServer((request,response)=>{

	//获取请求路径
	var pathname=url.parse(request.url).pathname;

	//过滤无效请求
	if(pathname=='/favicon.ico')return response.end();

	//首页指向index
	if(pathname=='/')pathname='/index.html';

	//默认文件扩展名为html
	var extname=path.extname(pathname);
	if(extname=='')pathname=pathname+'.html';

	//获取文件扩展名
	extname=path.extname(pathname).split('.')[1].toString();
	console.log(extname);
	console.log(getMime(extname));

	//根据文件扩展名读取相应文件
	fs.readFile('./statics/'+extname+pathname,(err,file)=>{
		if(err){
			fs.readFile('./statics/html/404.html',(err,file)=>{
				response.writeHead(404,{"Content-Type":"text/html;charset=utf-8"});
				response.write(file);
				response.end();
			})
		}else{
			console.log(file.toString());
			response.writeHead(200,{"Content-Type":getMime(extname)+";charset=utf-8"});
			response.write(file);
			response.end();
		}
	})

	

});


//监听端口
www.listen(2018,err=>{
	console.log("The server is listenning at port 2018");
});