pragma solidity ^0.4.25;

contract supplyChain {
    
    //账款信息
    struct Irrigation{
        uint id;            //id
        string reciever;    //收款方
        string payer;       //付款方
        string info;        //账单信息
        uint amount;        //金额
        string expiretime;  //到期时间
        uint state;         //0-无第三方认证  1-有第三方认证  2-抵押中  3-销毁 
    }
    
    //节点信息
    struct Company{
        string cpName;
        address addr;
        uint cpInfo;    //0-bank认证   1-公司  
        mapping(string => Irrigation) revIrr;  //作为收款方
        mapping(string => Irrigation) payIrr;  //作为付款方
    }
    
    Company public authRole;   //银行作为认证方
    Irrigation[] public irr;   //应收账款列表
    mapping(string => Company) cplist;  //所有参与者列表
    mapping(string => string) password;

    //加入新的参与者
    function cpInit(string tname,address taddr,uint cprole, string pw) public returns(string){
        cplist[tname] = Company({
            cpName:tname,
            addr:taddr,
            cpInfo:cprole
        });
        password[tname] = pw;
        if (cprole == 0) {
            authRole = cplist[tname];
        } 
        string memory output = "Add a new company successfully!";
        return output;
    }
    function getPW(string name) public returns(string){
        return password[name];
    }
    //已知收付方查询应收票据   
    function getAmountOfIrr(string reciver,string payer)public returns(uint){
        //Company memory recivecp = cplist[reciver];
        //Irrigation memory targetbill = recivecp.revIrr[payer];
        return cplist[reciver].revIrr[payer].amount;
        //return targetbill.amount;
    }
    function test() public view returns(uint){
        return 99999;
    }
    
    //查询应收账款的状态
    function getStateOfIrr(string reciver,string payer)public returns(string){
        //Company memory recivecp = cplist[reciver];
        Irrigation memory targetbill = cplist[reciver].revIrr[payer];
        string memory output;
        if (targetbill.state == 0) {
            output = "The irrigation isn't guaranteed and not used to financing";
        }
        else if (targetbill.state == 1) {
            output = "The irrigation is guaranteed and not used to financing";
        }
        else if (targetbill.state == 2) {
            output = "The irrigation is used to financing";
        }
        else {
            output = "The irrigation is invalid";
        }
        return output;
    }
    
    //初始订单
    function instructIrr(string trecv,string tpayer,uint tamount,string texpiretime,string tinfo) public returns(string){
        uint len = irr.length;
        uint tstate = 0;
        if (msg.sender == authRole.addr) {
            tstate = 1;
        }
        Irrigation memory curIrr = Irrigation({
            id:len,         //id
            reciever:trecv,  //收款方
            payer:tpayer,     //付款方
            info:tinfo,       //账单信息
            amount:tamount,        //金额
            expiretime:texpiretime,       //操作时间
            state:tstate
        });
        
        irr.push(curIrr);
        
        //receiver's irrigation list
        Company storage cprecv = cplist[trecv];
        cprecv.revIrr[tpayer] = curIrr;
        
        //payer's irrigation list
        Company storage cppay = cplist[tpayer];
        cppay.payIrr[trecv] = curIrr;   
        
        string memory output = "Instruct a new initial irrigation successfully!";
        return output;       
    }
    
    //应收账款转让
    function transIrr(string uper,string downer,string payer,uint amount,string info) public returns(string){
        Company storage cpuper = cplist[uper];

        Irrigation storage targetbill = cpuper.revIrr[payer];
        
        //Wrong Situation
        if (targetbill.amount < amount) {
            return "Wrong:The amount is larger than the irrigation";
        }
        if (targetbill.state == 2 || targetbill.state == 3){
            return "Wrong:The irrigation has been used to financing or invalid";
        }
        
        //Success Situation
        targetbill.amount -= amount;
        if (targetbill.amount == 0) {  //全部转让 
            targetbill.state = 3;
        }
        targetbill.info = info;
        
        //change the amount of the bill
        Company storage cppayer = cplist[payer];
        Irrigation storage payerbill = cppayer.payIrr[uper];
        payerbill.amount -= amount;
        targetbill.info = info;
        
        string memory output = instructIrr(downer,payer,amount,targetbill.expiretime,info);
        Irrigation storage out = cppayer.payIrr[downer];
        out.state = targetbill.state;
        output = "Transfer the irrigation successfully!";
        return output;
    }
    
    //融资
    function financeByIrr(string reciver,string financer,string payer,string texpiretime,uint amount,string info) public returns(string){
        Company storage cprecv = cplist[reciver];
        Irrigation storage bill = cprecv.revIrr[payer];
        
        //Wrong Situation
        if (bill.amount < amount) {
            return "Wrong:The amount is larger than the irrigation";
        }
        if (bill.state != 1) {
            return getStateOfIrr(reciver,payer);
        }
        
        //Success Situation
        bill.state = 2;
        bill.info = info;
        instructIrr(financer,reciver,amount,texpiretime,info);
        string memory output = "The financer lend money to the company successfully!";
        return output;
    }
    
    //还款
    function Repayment(string payer,string reciver,uint amount,string info)public returns(string){
        Company storage cprecv = cplist[reciver];
        Company storage cppayer = cplist[payer];  
        Irrigation storage billrecv = cprecv.revIrr[payer];
        
        //Wrong Situation
        if (billrecv.amount != amount) {
            return "Wrong:The money isn't enough to repay the irrigation";
        }
        if (billrecv.state == 3){
            return "Wrong:The irrigation is invalid";
        }
        
        //Success Situation
        billrecv.amount = 0;
        billrecv.state = 3;
        billrecv.info = info;
        
        Irrigation storage billpay = cppayer.payIrr[reciver];
        billpay.amount = 0;
        billpay.state = 3;
        billpay.info = info;
        
        string memory output = "The irrigation is repaid successfully!";
        return output;
    }
}