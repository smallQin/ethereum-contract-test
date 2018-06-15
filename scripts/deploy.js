const path = require('path');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

//1.拿到 provider
const contractPath = path.resolve(__dirname,'../compiled/ProjectList.json');
const {interface,bytecode} = require(contractPath);

//2.配置 provider
const provider = new HDWalletProvider(
	'review image pulse unusual rebuild victory absorb above orange trip weird soldier',
    'https://rinkeby.infura.io/uv2cmPYLufL76RwvsWaC'
);

//3.初始化 web3 实例
const web3 = new Web3(provider);

(async()=>{
	//4.获取钱包里面的账号
	const accounts = await web3.eth.getAccounts();
	console.log('部署合约的账号：',accounts[0]);

	//5.创建合约实例并部署
	console.time('contract-deploy');
	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({data:bytecode,arguments:['AUDI']})
		.send({from:accounts[0],gas:'1000000'});
	console.timeEnd('contract-deploy');
	console.log('合约部署成功：',result.options.address);
})();