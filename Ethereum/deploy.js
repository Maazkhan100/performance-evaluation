require('dotenv').config();
const { Web3 } = require('web3');

// 1. Add the Web3 provider logic here:
const web3 = new Web3('http://127.0.0.1:6001');

// 2. Create address variables
const accountFrom = {
    privateKey: process.env.PRIVATE_KEY,
    address: '0x5719D02a5ebe5cA3AE722c703c24Ae5C845d0538',
};

// 3. Get the bytecode and API
const { bytecode, abi } = require('./constant');

// 4. Create deploy function
const deploy = async () => {
    console.log(`Attempting to deploy from account ${accountFrom.address}`);

    // 5. Create contract instance
    const contract = new web3.eth.Contract(abi);

    // 6. Create constructor tx
    const contractTx = contract.deploy({
        data: bytecode,
        // arguments: [5],
    });

    // 7. Sign transacation and send
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            data: contractTx.encodeABI(),
            gas: await contractTx.estimateGas(),
            gasPrice: await web3.eth.getGasPrice(),
            nonce: await web3.eth.getTransactionCount(accountFrom.address),
        },
        accountFrom.privateKey
    );

    // 8. Send tx and wait for receipt
    const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
    );
    console.log(`Contract deployed at address: ${createReceipt.contractAddress}`);
};

// 9. Call deploy function
deploy();
