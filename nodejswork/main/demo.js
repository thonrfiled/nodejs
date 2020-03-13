//本来想学习使用用模板引擎的  但是git上之后  好像就没了
let http = require('http')
let fs = require('fs')
//创建  Server
let server = http.createServer()

//监听  Server 的 reque
let Dir = 'D:/nodejswork/www'    //转出本机后会出现 地址不正确的情况
server.on('request',function(req,res){
	let url = req.url
	let filePath = 'index.html'
	if(url !='/'){
		filePath = url
	}
	fs.readFile(Dir+'/index.html',function(err,data){
		if(err){
			return res.end('404 Not Found.')
		}
		fs.readdir(Dir,function(err,files){
			if(err){
				return res.end("can not find")
			}
			let content = ''
			files.forEach( function(item) {
				//再es6中可以使用${}来引用变量
				content +=`
				<tr>
					<td data-value="main/">
						<a class="icon dir" href="/D:/www/main/">${item}/</a>
					</td>
					<td class="detailsColumn" data-value="0"></td><td class="detailsColumn" data-value="1584106508">2020/3/13 下午9:35:08</td>
				</tr>
			`
			})
			//替换特殊字符
			data = data.toString()
			data = data.replace('@_@',content)
			//发送响应数据
			res.end(data)
		})
	})
	
})


//绑定端口号，启动服务
server.listen(8080,function(){
	console.log('server  running...')
})