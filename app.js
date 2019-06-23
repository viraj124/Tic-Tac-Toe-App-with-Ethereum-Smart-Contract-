const Web3 = require("web3");

//Stored my private keys in this file
var key = require('./key.js');

//Used for creating, signing and deploying transactions
var Tx = require("ethereumjs-tx").Transaction;

//Web3 Provider
const web3 = new Web3("https://ropsten.infura.io/v3/efe05d2bdd9c4e008a7ad1df4c1c7193");

// private key's and address of player 1 and player 2 accounts
const address1 = '0x56A2E4deBa76F41e65b50BBB217E08BBb3c7560F';
const address2 = '0x1471Fa84941EEc46842e2A89952EFBad7D6a7fFa';

//get the addresses of both the contracts after deploying it below
const firstContractAddress = '0x692a70d2e424a56d2c6c27aa97d1a86395877b3a';
const secondContractAddress = '0xbbf289d846208c16edc8474705c748aff07732db';

const firstContractABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "standard",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_initialSupply",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
]

const firstContract = web3.eth.Contract(firstContractABI, firstContractAddress);

//Deploying token contract which enables you to transfer tokens from the loser to the winner and defines the initial supply of tokens
web3.eth.getTransactionCount(address1, (err,txCount) => {
console.log(err)
console.log(txCount)
const data = '0x60806040526040805190810160405280601181526020017f5469632054616320546f6520546f6b656e0000000000000000000000000000008152506000908051906020019061004f929190610176565b506040805190810160405280600381526020017f54545400000000000000000000000000000000000000000000000000000000008152506001908051906020019061009b929190610176565b506040805190810160405280601681526020017f5469632054616320546f6520546f6b656e2076312e3000000000000000000000815250600290805190602001906100e7929190610176565b503480156100f457600080fd5b5060405160208061090b8339810180604052602081101561011457600080fd5b81019080805190602001909291905050508060038190555080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505061021b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101b757805160ff19168380011785556101e5565b828001600101855582156101e5579182015b828111156101e45782518255916020019190600101906101c9565b5b5090506101f291906101f6565b5090565b61021891905b808211156102145760008160009055506001016101fc565b5090565b90565b6106e18061022a6000396000f3fe608060405260043610610072576000357c01000000000000000000000000000000000000000000000000000000009004806306fdde031461007757806318160ddd146101075780635a3b7e421461013257806370a08231146101c257806395d89b4114610227578063a9059cbb146102b7575b600080fd5b34801561008357600080fd5b5061008c61032a565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100cc5780820151818401526020810190506100b1565b50505050905090810190601f1680156100f95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561011357600080fd5b5061011c6103c8565b6040518082815260200191505060405180910390f35b34801561013e57600080fd5b506101476103ce565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561018757808201518184015260208101905061016c565b50505050905090810190601f1680156101b45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101ce57600080fd5b50610211600480360360208110156101e557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061046c565b6040518082815260200191505060405180910390f35b34801561023357600080fd5b5061023c610484565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561027c578082015181840152602081019050610261565b50505050905090810190601f1680156102a95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156102c357600080fd5b50610310600480360360408110156102da57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610522565b604051808215151515815260200191505060405180910390f35b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b505050505081565b60035481565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104645780601f1061043957610100808354040283529160200191610464565b820191906000526020600020905b81548152906001019060200180831161044757829003601f168201915b505050505081565b60046020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561051a5780601f106104ef5761010080835404028352916020019161051a565b820191906000526020600020905b8154815290600101906020018083116104fd57829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561057257600080fd5b81600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055507fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef338484604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a1600190509291505056fea165627a7a723058206321647e8fbfde0cc78118a889a33e717c5676db710f950e9a677d9744dcd9e00029'
var txObject = {
//previous transaction count for this account  to prevent double spend
nonce : web3.utils.toHex(txCount),
//gas consumed by the transaction
gasLimit : web3.utils.toHex(21000),
//gas price per unit we propose
gasPrice : web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
//byte code of the smart contract we want to deploy
data : data
}
//signing the transaction by the private key's of both parties
var tx = new Tx(txObject)
tx.sign(key.PRIVATE_KEY_1);
//converting the transaction to raw transaction so that we can broadcast it
const serializedTransaction = tx.serialize();
const raw = '0x' + serializedTransaction.toString('hex')
//Sending the transaction which is deploying the contract in this case on to ethereum blockchain test network
web3.eth.sendSignedTransaction(raw , (err, tx) => {
console.log(err)
console.log(tx);
})
})

//Deploying the selling token contract which will transfer some tokens initially to both players in exchange for ether
web3.eth.getTransactionCount(address2, (err,txCount) => {
    console.log(err)
    console.log(txCount)
    const data = '0x608060405234801561001057600080fd5b506040516040806105808339810180604052604081101561003057600080fd5b810190808051906020019092919080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600181905550505061045b806101256000396000f3fe60806040526004361061005c576000357c010000000000000000000000000000000000000000000000000000000090048063216481d6146100615780633610724e146100b85780635ed9ebfc146100e65780637ff9b59614610111575b600080fd5b34801561006d57600080fd5b5061007661013c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100e4600480360360208110156100ce57600080fd5b8101908080359060200190929190505050610162565b005b3480156100f257600080fd5b506100fb610423565b6040518082815260200191505060405180910390f35b34801561011d57600080fd5b50610126610429565b6040518082815260200191505060405180910390f35b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481023414151561017457600080fd5b80600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561025257600080fd5b505afa158015610266573d6000803e3d6000fd5b505050506040513d602081101561027c57600080fd5b81019080805190602001909291905050501015151561029a57600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561035f57600080fd5b505af1158015610373573d6000803e3d6000fd5b505050506040513d602081101561038957600080fd5b810190808051906020019092919050505015156103a557600080fd5b806002600082825401925050819055507f5e5e995ce3133561afceaa51a9a154d5db228cd7525d34df5185582c18d3df093382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a150565b60025481565b6001548156fea165627a7a72305820d277de4ff97795e6c81e9344e5daeacc07075c2bbc7e5b6b552b1e3aed3d04270029', 
    var txObject = {
    //previous transaction count for this account  to prevent double spend
    nonce : web3.utils.toHex(txCount),
    //gas consumed by the transaction
    gasLimit : web3.utils.toHex(21000),
    //gas price per unit we propose
    gasPrice : web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    //byte code of the smart contract we want to deploy
    data : data
    }
    //signing the transaction by the private key's of both parties
    var tx = new Tx(txObject)
    tx.sign(key.PRIVATE_KEY_2);
    //converting the transaction to raw transaction so that we can broadcast it
    const serializedTransaction = tx.serialize();
    const raw = '0x' + serializedTransaction.toString('hex')
    //Sending the transaction which is deploying the contract in this case on to ethereum blockchain test network
    web3.eth.sendSignedTransaction(raw , (err, tx) => {
    console.log(err)
    console.log(tx);
    })
})
// NOTE -> While deploying both contract i faced this issue -> Error: Node error: {"code":-32000,"message":"invalid sender"} i googled it a lot tried some suggestions there but was unable to make it work so i deployed both contracts through remix and the contract address's defined above are those addreess

/*
GAME_LOGIC_GOES_HERE
*/

//make a transaction by sending the tokens from loser's wallet to the winner's
web3.eth.getTransactionCount(address1, (err,txCount) => {
    console.log(err)
    console.log(txCount)
    var txObject = {
    //previous transaction count for this account  to prevent double spend
    nonce : web3.utils.toHex(txCount),
    //gas consumed by the transaction
    gasLimit : web3.utils.toHex(210000),
    //gas price per unit we propose
    gasPrice : web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    //byte code of the smart contract we want to deploy
    data : firstContract.methods.transfer(secondContractAddress,100).encodeABI() //Assuming Player 1 Lost and the bet was 100 tokens
    }
    //signing the transaction by the private key's of both parties
    var tx = new Tx(txObject)
    tx.sign(key.PRIVATE_KEY_1);
    tx.sign(key.PRIVATE_KEY_2);
    //converting the transaction to raw transaction so that we can broadcast it
    const serializedTransaction = tx.serialize();
    const raw = '0x' + serializedTransaction.toString('hex')
    //Sending the transaction which is deploying the contract in this case on to ethereum blockchain test network
    web3.eth.sendSignedTransaction(raw , (err, tx) => {
    console.log(err)
    console.log(tx);
    })
})

    