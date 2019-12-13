//express_demo.js 文件
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urllib = require('url');
var path = require('path');

var Configuration = require('./api/common/configuration').Configuration;
Configuration.setConfig("./api/conf/adminConfig.json","Admin");
var Web3jService = require('./api').Web3jService;
supplyChain = new Web3jService();
var utils = require('./api/common/web3lib/utils');


contractAddress = '0xa5f216dc6c0ca315262e72644a5a76e863ba02c2'





var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


app.post('/adduser',urlencodedParser, function (req, res) {
	acc0 = web3.eth.accounts[0]
	//acc1 = web3.eth.accounts[1]
	//var param = urllib.parse(req.url,true);
	var params = req.body;
	var name = params.name;
	var address = params.address;
	var status = parseInt(params.status);
	var pw = params.pw;
	console.log(name);
	console.log(address);
	console.log(status);
	console.log(pw);
	supplyChain.sendRawTransaction(contractAddress,"cpInit(string,address,uint,string)",[name,address,status,pw]).then(ress=>{
		if(ress.status!="0x0"){
			res.send("err");
		} else {
			res.send("success");
		}
	});
})

app.post('/addirr',urlencodedParser, function (req, res) {
	acc0 = web3.eth.accounts[0]
	//acc1 = web3.eth.accounts[1]
	//var param = urllib.parse(req.url,true);
	var params = req.body;
	var rece = params.rece;
	var payer = params.payer;
	var amount = parseInt(params.amount);
	var time = params.time;
	var info = params.info;
	console.log(rece);
	console.log(payer);
	console.log(amount);
	console.log(time);
	console.log(info);
	supplyChain.sendRawTransaction(contractAddress,"instructIrr(string,string,uint,string,string)",[rece,payer,amount,time,info]).then(ress=>{
		if(ress.status!="0x0"){
			res.send("err");
		} else {
			res.send("success");
		}
	})
})

app.post('/finance',urlencodedParser, function (req, res) {
	acc0 = web3.eth.accounts[0]
	//acc1 = web3.eth.accounts[1]
	//var param = urllib.parse(req.url,true);
	var params = req.body;
	var rece = params.rece;
	var financer = params.financer;
	var payer = params.payer;
	var amount = parseInt(params.amount);
	var time = params.time;
	var info = params.info;
	console.log(rece);
	console.log(financer);
	console.log(payer);
	console.log(amount);
	console.log(time);
	console.log(info);
	supplyChain.sendRawTransaction(contractAddress,"financeByIrr(string,string,string,string,uint,string)",[rece,financer,payer,time,amount,info]).then(ress=>{
		if(ress.status!="0x0"){
			res.send("err");
		} else {
			res.send("success");
		}
	})
})

app.post('/payback',urlencodedParser, function (req, res) {
	acc0 = web3.eth.accounts[0]
	//acc1 = web3.eth.accounts[1]
	//var param = urllib.parse(req.url,true);
	var params = req.body;
	var rece = params.rece;
	var payer = params.payer;
	var amount = parseInt(params.amount);
	var info = params.info;
	console.log(rece);
	console.log(payer);
	console.log(amount);
	console.log(info);
	supplyChain.sendRawTransaction(contractAddress,"Repayment(string,string,uint,string)",[payer,rece,amount,info]).then(ress=>{
		if(ress.status!="0x0"){
			res.send("err");
		} else {
			res.send("success");
		}
	})
})

app.post('/shiftirr',urlencodedParser, function (req, res) {
	acc0 = web3.eth.accounts[0]
	//acc1 = web3.eth.accounts[1]
	//var param = urllib.parse(req.url,true);
	var params = req.body;
	var uper = params.uper;
	var downer = params.downer;
	var payer = params.payer;
	var amount = parseInt(params.amount);
	var info = params.info;
	console.log(uper);
	console.log(downer);
	console.log(payer);
	console.log(amount);
	console.log(info);
	supplyChain.sendRawTransaction(contractAddress,"transIrr(string,string,string,uint,string)",[uper,downer,payer,amount,info]).then(ress=>{
		if(ress.status!="0x0"){
			res.send("err");
		} else {
			res.send("success");
		}
	})
})


app.post('/queryamount',urlencodedParser, function (req, res) {
	acc0 = web3.eth.accounts[0]
	//acc1 = web3.eth.accounts[1]
	//var param = urllib.parse(req.url,true);
	var params = req.body;
	var rece = params.rece;
	var payer = params.payer;
	console.log(rece);
	console.log(payer);
 	supplyChain.call(contractAddress,"getAmountOfIrr(string,string)",[rece,payer]).then(ress=>{
 		if(ress.status!="0x0"){
 			res.send("err");
 		} else {
 			result = utils.decodeParams(['uint'],ress.output).toString();
 			res.send(result);
 		}
 	})
})

app.post('/querystate',urlencodedParser, function (req, res) {
	acc0 = web3.eth.accounts[0]
	//acc1 = web3.eth.accounts[1]
	//var param = urllib.parse(req.url,true);
	var params = req.body;
	var rece = params.rece;
	var payer = params.payer;
	console.log(rece);
	console.log(payer);

 	supplyChain.call(contractAddress,"getStateOfIrr(string,string)",[rece,payer]).then(ress=>{
 		if(ress.status!="0x0"){
 			res.send("err");
 		} else {
 			result = utils.decodeParams(['string'],ress.output);
 			res.send(result);
 		}
 	})
})

app.post('/getpw',urlencodedParser, function(req,res) {
  var name = req.body.pname;
  console.log(name);
  supplyChain.call(contractAddress,"getPW(string)",[name]).then(ress=>{
  	if(ress.status!="0x0"){
  		res.send("err");
  	} else{
  		result = utils.decodeParams(['string'],ress.output);
  		res.send(result);
  	}
  })
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
  console.log(web3.isConnected())
 
})