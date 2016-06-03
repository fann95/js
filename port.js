var http = require("http");
var url = require("url");
var qs = require("querystring");
var Tstamp='repeat';
var Orders='';
var MasterBalance='';
var creator="Dray Stanislav https://www.mql5.com/ru/users/fan9"


function onRequest(request, response) {
	var pathname = url.parse(request.url).pathname;
	var params = qs.parse(pathname);
	
	if (params.side==='master') {                       //мастер
		if(params.cmd==='update'){
			Tstamp=params.Tstamp;
			Orders=params.Orders;
			MasterBalance=params.MasterBalance;
			response.write('Accepted');
			response.end();
		}else if(params.cmd==='ping'){
			if(Tstamp==='repeat'){
				response.write('repeat');
				response.end();
			}else{
				response.write('isLive');
				response.end();
			}
		}
	}else if(params.side==='slave'){                    //клиент
		if(params.Tstamp!==Tstamp && Orders!=''){
			response.write(Orders+'*'+MasterBalance+'*'+Tstamp);
			response.end();
		}else{
			response.write('isLive');
			response.end();
		} 
	}else{
		//response.writeHead(404, {"Content-Type": "text/html"});
		response.write("Technology by "+creator);
		response.end();
		
	}

}

http.createServer(onRequest).listen(27035);


