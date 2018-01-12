

// var PROVIDER_NODE = 'http://127.0.0.1:8545';
var INFURAIO_TOKEN = "access_token_from_infura";
var PROVIDER_NODE = 'https://ropsten.infura.io/' + INFURAIO_TOKEN;
var currentChainId = 3;
var CONTRACT_ABI = JSON.parse('[ { "constant": false, "inputs": [ { "name": "value", "type": "uint256" } ], "name": "splitFunds", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getFundAt", "outputs": [ { "name": "bal", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "_members", "outputs": [ { "name": "_key", "type": "address" }, { "name": "_balance", "type": "uint256" }, { "name": "_totalTodate", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "disperseFunds", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getMemberCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "addFunds", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "_owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newMember", "type": "address" } ], "name": "addMember", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getMemberAt", "outputs": [ { "name": "mem", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getFundsCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "memberAddress", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "transferFundsToMember", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "getBalance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "_receivedFunds", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "members", "type": "string" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "SplitRequest", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "message", "type": "string" }, { "indexed": false, "name": "addr", "type": "address" }, { "indexed": false, "name": "num", "type": "uint256" } ], "name": "LogMessage", "type": "event" } ]');

var CONTRACT_CODE = '0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506111b38061005e6000396000f3006060604052600436106100c5576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632f1335cf146100ca57806331dc33b1146100ed5780633cf87dfc146101245780635130ac1f14610195578063997072f7146101aa578063a26759cb146101d3578063b2bdfa7b146101dd578063ca6d56dc14610232578063e992c81714610260578063eae8670c146102c3578063f3c2b0a1146102ec578063f8b2cb4f1461032e578063fb5e3d2a1461037b575b600080fd5b34156100d557600080fd5b6100eb60048080359060200190919050506103b2565b005b34156100f857600080fd5b61010e600480803590602001909190505061068f565b6040518082815260200191505060405180910390f35b341561012f57600080fd5b61014560048080359060200190919050506106b3565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390f35b34156101a057600080fd5b6101a861070c565b005b34156101b557600080fd5b6101bd61089c565b6040518082815260200191505060405180910390f35b6101db6108a9565b005b34156101e857600080fd5b6101f0610978565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61025e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061099d565b005b341561026b57600080fd5b6102816004808035906020019091905050610ede565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156102ce57600080fd5b6102d6610f28565b6040518082815260200191505060405180910390f35b34156102f757600080fd5b61032c600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610f35565b005b341561033957600080fd5b610365600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061103d565b6040518082815260200191505060405180910390f35b341561038657600080fd5b61039c600480803590602001909190505061105e565b6040518082815260200191505060405180910390f35b6000806000806000600180549050111515610471577fc98a1e1498136851982dc0c4f2743294fecbf1887d43c44f4d30919083bf50e133600060405180806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281038252600d8152602001807f4e6f206d656d62657273202d2000000000000000000000000000000000000000815250602001935050505060405180910390a1610688565b6001805490508581151561048157fe5b06915081850393506001805490508481151561049957fe5b0492507fc98a1e1498136851982dc0c4f2743294fecbf1887d43c44f4d30919083bf50e13360018054905060405180806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281038252600f8152602001807f4d656d62657220636f756e74202d200000000000000000000000000000000000815250602001935050505060405180910390a17fc98a1e1498136851982dc0c4f2743294fecbf1887d43c44f4d30919083bf50e1338460405180806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828103825260118152602001807f56616c756520666f722065616368202d20000000000000000000000000000000815250602001935050505060405180910390a1600090505b6001805490508110156106525761064560018281548110151561060d57fe5b906000526020600020906003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684610f35565b80806001019150506105ee565b6000821115610687576106866000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683610f35565b5b5b5050505050565b60006002828154811015156106a057fe5b9060005260206000209001549050919050565b6001818154811015156106c257fe5b90600052602060002090600302016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154905083565b6000806000809250600091507fc98a1e1498136851982dc0c4f2743294fecbf1887d43c44f4d30919083bf50e13360028054905060405180806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828103825260198152602001807f646973706572736546756e64732062792c636f756e74202d2000000000000000815250602001935050505060405180910390a1600092505b600280549050831015610830576002838154811015156107e257fe5b9060005260206000209001549050600081111561082357610802816103b2565b600060028481548110151561081357fe5b9060005260206000209001819055505b82806001019350506107c6565b60028054905091505b60008214156108875760026001830381548110151561085457fe5b90600052602060002090016000905560028054809190600190036108789190611082565b50818060019003925050610839565b60006002816108969190611082565b50505050565b6000600180549050905090565b600280548060010182816108bd91906110ae565b9160005260206000209001600034909190915055507fc98a1e1498136851982dc0c4f2743294fecbf1887d43c44f4d30919083bf50e1333460405180806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828103825260128152602001807f61646446756e6473202d2062792c616d74200000000000000000000000000000815250602001935050505060405180910390a1565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000807fc98a1e1498136851982dc0c4f2743294fecbf1887d43c44f4d30919083bf50e133600060405180806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828103825260118152602001807f6164644d656d6265722073656e64657220000000000000000000000000000000815250602001935050505060405180910390a17fc98a1e1498136851982dc0c4f2743294fecbf1887d43c44f4d30919083bf50e16000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600060405180806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828103825260108152602001807f6164644d656d626572206f776e65722000000000000000000000000000000000815250602001935050505060405180910390a16000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b6657600080fd5b7fc98a1e1498136851982dc0c4f2743294fecbf1887d43c44f4d30919083bf50e16000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600060405180806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828103825260198152602001807f6164644d656d6265722073656e64206279206f776e6465722000000000000000815250602001935050505060405180910390a160009050600091505b600180549050821015610d71578273ffffffffffffffffffffffffffffffffffffffff16600183815481101515610c6857fe5b906000526020600020906003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610d6457600190507fc98a1e1498136851982dc0c4f2743294fecbf1887d43c44f4d30919083bf50e183600060405180806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828103825260168152602001807f4163636f756e7420616c72656164792065786973742000000000000000000000815250602001935050505060405180910390a1610d71565b8180600101925050610c35565b801515610ed95760018054806001018281610d8c91906110da565b916000526020600020906003020160006060604051908101604052808773ffffffffffffffffffffffffffffffffffffffff168152602001600081526020016000815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155604082015181600201555050507fc98a1e1498136851982dc0c4f2743294fecbf1887d43c44f4d30919083bf50e183600060405180806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281038252600e8152602001807f4163636f756e7420616464656420000000000000000000000000000000000000815250602001935050505060405180910390a15b505050565b6000600182815481101515610eef57fe5b906000526020600020906003020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600280549050905090565b803073ffffffffffffffffffffffffffffffffffffffff16311115611039578173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610f9457600080fd5b7fc98a1e1498136851982dc0c4f2743294fecbf1887d43c44f4d30919083bf50e1828260405180806020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281038252601b8152602001807f5472616e736665722066756e6473204163632c56616c7565202d200000000000815250602001935050505060405180910390a15b5050565b60008173ffffffffffffffffffffffffffffffffffffffff16319050919050565b60028181548110151561106d57fe5b90600052602060002090016000915090505481565b8154818355818115116110a9578183600052602060002091820191016110a8919061110c565b5b505050565b8154818355818115116110d5578183600052602060002091820191016110d4919061110c565b5b505050565b815481835581811511611107576003028160030283600052602060002091820191016111069190611131565b5b505050565b61112e91905b8082111561112a576000816000905550600101611112565b5090565b90565b61118491905b8082111561118057600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160009055600282016000905550600301611137565b5090565b905600a165627a7a72305820d5a3701be7ae18218344e4d31d184b404b721cd2af6d7fc1568bba66dc5d244b0029';

var CONTRACT_ADDRESS = "0x5b7ab83309d7f7c621d9d7505c520a1fde6ae606";

var CONTRACT_OWNER = "<address of the contrcat owner>"; //This account should have an Ether balance
var MEMBER_ADDRESS = "<address of an additional account>";
var SOURCE_ADDRESS = "<address of an additional account>";
var TEMP_TXN_HASH = '0xc57dca878e31e974a03133a41e04190630aaa9ec3f141e172b3376368f80e973';
var LIST_INDEX = '0';
var PVT_KEY = "private key of CONTRACT_OWNER";

var GAS_LIMIT = 4500000;


//Initialise the app instance
var _web3jsraw = require('web3js-raw');

var W3JSR = new _web3jsraw();
W3JSR.setProvider(PROVIDER_NODE);

var privateKey = new Buffer(PVT_KEY, 'hex');

// Initialize values
document.getElementById('contractAddress').value = CONTRACT_ADDRESS;
document.getElementById('contractOwner').value = CONTRACT_OWNER;
document.getElementById('memberAddress').value = MEMBER_ADDRESS;

document.getElementById('sourceAddress').value = SOURCE_ADDRESS;
document.getElementById('etherAmount').value = "0.00005";
document.getElementById('txnHash').value = TEMP_TXN_HASH;
document.getElementById('memberListIndex').value = LIST_INDEX;
document.getElementById('fundListIndex').value = LIST_INDEX;

//Event bindings

document.getElementById('createNewAccountButton').addEventListener('click',onCreateNewAccountButtonClick);

// document.getElementById('openContractFile').addEventListener('change',openContractInfoFile);
document.getElementById('deployNewContractButton').addEventListener('click',onDeployNewContractButtonClick);
document.getElementById('createContractInstanceButton').addEventListener('click',onCreateContractInstanceButtonClick);

document.getElementById('memberCountButton').addEventListener('click',onMemberCountButtonClick);
document.getElementById('getMemberAtButton').addEventListener('click',onGetMemberAtButtonClick);
document.getElementById('addMemberButton').addEventListener('click',onAddMemberButtonClick);

document.getElementById('getFundsCountButton').addEventListener('click',onGetFundsCountButtonClick);
document.getElementById('getFundAtButton').addEventListener('click',onGetFundAtButtonClick);
document.getElementById('addFundsButton').addEventListener('click',onAddFundsButtonClick);

document.getElementById('disperseFundsButton').addEventListener('click',onDisperseFundsButtonClick);
document.getElementById('getTxnReceiptButton').addEventListener('click',onTxnReceiptButtonClick);

W3JSR.createContractInstance(CONTRACT_ABI,CONTRACT_ADDRESS);

//Event listener funtions

function onCreateNewAccountButtonClick(){
    W3JSR.createNewAccount();
}

function openContractInfoFile(event){
    var input = event.target;
    var reader = new FileReader();

    reader.onloadend = function() {
        W3JSR.updateContractCode(reader.result);
    };
    reader.readAsText(input.files[0],'UTF-8');
}

function onDeployNewContractButtonClick(){
    deployNewContractEx();
}

function onCreateContractInstanceButtonClick(){
    var contractAddress = document.getElementById('contractAddress').value;
    W3JSR.createContractInstance(CONTRACT_ABI,contractAddress);
}

function onMemberCountButtonClick(){
    invokeGetMemberCount();
}

function onGetMemberAtButtonClick(){
    invokeGetMemberAt();
}

function onAddMemberButtonClick(){
    invokeAddMember();
}

function onGetFundsCountButtonClick(){
    invokeGetFundsCount();
}

function onGetFundAtButtonClick(){
    invokeGetFundAt();
}

function onAddFundsButtonClick(){
    invokeAddFunds();
}

function onDisperseFundsButtonClick(){
    invokeDisperseFunds();
}

function onTxnReceiptButtonClick(){
    invokeGetTxnReceipt();
}

// Contract Management

function deployNewContractEx(){
    var contractOwner = document.getElementById('contractOwner').value;
    var txnRawData = W3JSR.getDefaultTxnAttributes('',contractOwner,'','0',CONTRACT_CODE,'',10000000000);

    var args = [];
    var bytes = W3JSR.encodeConstructorParams(CONTRACT_ABI, args);
    txnRawData.data += bytes;

    var serializedTx = W3JSR.getSignedTransaction(txnRawData, privateKey);

    W3JSR.invokeSendRawTransaction("DeployContract",serializedTx,web3jsrCallaback );
}

//Member Management
function invokeGetMemberCount(){
    W3JSR.ContractInstance.getMemberCount(function(error, result){
        if(!error){
            console.log("getMemberCount", result);
            var val = result;
            var str= "getMemberCount - ".concat(result);
            addRowToConsole(str);
        }
        else
            console.error(error);
    });
}

function invokeGetMemberAt(){
    var index = document.getElementById('memberListIndex').value;

    W3JSR.ContractInstance.getMemberAt(index,function(error, result){
        if(!error){
            console.log("getMemberAt - ", result);
            var str= "MemberAt - ".concat(result);
            addRowToConsole(str);
        }
        else
            console.error(error);
    });
}

function invokeAddMember(){
    var contractOwner = document.getElementById('contractOwner').value;
    var newAddress = document.getElementById('memberAddress').value;

    var functionName = 'addMember';
    var types = ['address'];
    var args = [newAddress];

    var txnData = W3JSR.encodeFunctionParams(functionName, types, args);

    var txnRawData = W3JSR.getDefaultTxnAttributes('',contractOwner,CONTRACT_ADDRESS,'0',txnData,'','')
    var serializedTx = W3JSR.getSignedTransaction(txnRawData, privateKey);

    W3JSR.invokeSendRawTransaction(functionName,serializedTx,web3jsrCallaback);
}

//Funds Management
function invokeGetFundsCount(){
    W3JSR.ContractInstance.getFundsCount(function(error, result){
        if(!error){
            console.log("getFundsCount", result);
            var val = result;
            var str= "getFundsCount - ".concat(result);
            addRowToConsole(str);
        }
        else
            console.error(error);
    });
}

function invokeGetFundAt(){
    var index = document.getElementById('fundListIndex').value;

    W3JSR.ContractInstance.getFundAt(index,function(error, result){
        if(!error){
            console.log("getFundAt - ", result);
            var str= "FundAt - ".concat(result);
            addRowToConsole(str);
        }
        else
            console.error(error);
    });
}

function invokeAddFunds(){
    var sourceAddress = document.getElementById('sourceAddress').value;
    var etherAmount = document.getElementById('etherAmount').value;

    var functionName = 'addFunds';
    var types = [];
    var args = [];

    var txnData = W3JSR.encodeFunctionParams(functionName, types, args);

    var txnRawData = W3JSR.getDefaultTxnAttributes('',sourceAddress,CONTRACT_ADDRESS,etherAmount,txnData,'','')
    var serializedTx = W3JSR.getSignedTransaction(txnRawData, privateKey);

    W3JSR.invokeSendRawTransaction(functionName,serializedTx,web3jsrCallaback);
}

function invokeDisperseFunds(){
    var contractOwner = document.getElementById('contractOwner').value;

    var functionName = 'disperseFunds';
    var types = [];
    var args = [];

    var txnData = W3JSR.encodeFunctionParams(functionName, types, args);
    var txnRawData = W3JSR.getDefaultTxnAttributes('',CONTRACT_OWNER,CONTRACT_ADDRESS,'0',txnData,'','');

    var serializedTx = W3JSR.getSignedTransaction(txnRawData, privateKey);

    W3JSR.invokeSendRawTransaction(functionName,serializedTx,web3jsrCallaback);
}

function addRowToConsole(rowContent){

    var temp = document.createElement("div");
    temp.innerHTML = getHTMLBlock(rowContent);

    var parent = document.getElementById('txnConsole');
    parent.insertBefore(temp,parent.firstChild);

}

function getHTMLBlock(content){
    var html;
    html = '<div class="txnrow">' + content + '</div>';
    return html;
}


function setTxnHash(callerName, txnHash){
    document.getElementById('txnHash').value = txnHash;
    var url = "https://ropsten.etherscan.io/tx/" + txnHash;
    var link = '<a href="' + url + '" target="_blank">'+txnHash+'<img border="0" alt="W3Schools" src="https://ropsten.etherscan.io/images/favicon2.ico" width="15" height="15"></a>';

    addRowToConsole("   Txn Hash for " + callerName + " - " + link );
}

var web3jsrCallaback = function (data){
    console.log("web3jsrCallaback - ", data);
    setTxnHash(data.functionName,data.message);
}

this.updateContractCode = function (content){
    var obj1 = JSON.parse(content);
    var contracts = obj1["contracts"];

    // Smart contract EVM bytecode as hex
    var code = '0x' + obj1["contracts"]["FundSplitter.sol:FundSplitter"]["bin"];
    console.log('contract code - ',  code);
    CONTRACT_CODE = code;
}

function invokeGetTxnReceipt(){
    tx_hash = document.getElementById('txnHash').value;
    W3JSR.invokeGetTxnReceipt(tx_hash,function(data){
        var e = data.message;
        var str = "   tx hash         : " + e.hash + "\n"
          + "   nonce           : " + e.nonce + "\n"
          + "   blockHash       : " + e.blockHash + "\n"
          + "   blockNumber     : " + e.blockNumber + "\n"
          + "   transactionIndex: " + e.transactionIndex + "\n"
          + "   from            : " + e.from + "\n"
          + "   to              : " + e.to + "\n"
          + "   value           : " + e.value + "\n"
          + "   gasPrice        : " + e.gasPrice + "\n"
          + "   gas             : " + e.gas + "\n"
          + "   input           : " + e.input;
        addRowToConsole(str);
    })
}
