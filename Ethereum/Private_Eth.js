const { exec } = require('child_process');
const path = require('path');
const { Web3 } = require('web3');
const { performance } = require('perf_hooks');
const fs = require('fs');
const { abi, ContractAddress } = require('./constant')
require('dotenv').config();
// const { config } = require('../constants');
const { stderr } = require('process');

// Default Ethereum node URL
const defaultProviderUrl = 'http://127.0.0.1:6001';
const defaultNumTransactions = 10;
const defaultMetric = 'Latency';
const defaultFunction = 'default';

// Check if the user provided a custom provider URL through command line arguments
const args = process.argv.slice(2); // Extract command line arguments, excluding 'node' and the script name
const options = {}; // Store user-specified options as key-value pairs

for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
        // If the argument starts with '--', treat it as a key-value pair
        const [key, value] = arg.slice(2).split('=');
        options[key] = value;
    }
}

const address1 = '0x5719D02a5ebe5cA3AE722c703c24Ae5C845d0538';
const web3 = new Web3(defaultProviderUrl);
web3.eth.transactionBlockTimeout = 1000;

// Determine the number of transactions
const numTransactions = options['transactions']
    ? parseInt(options['transactions'])
    : defaultNumTransactions;
// Determine the performance metric
const metric = options['metric'] || defaultMetric;
// Determine the selected function
const selectedFunction = options['function'] || defaultFunction;

const benchmark_contract = new web3.eth.Contract(abi, ContractAddress)
benchmark_contract.handleRevert == true

const transactionObject = {
    from: address1,
    gas: 50000,
    gasPrice: '1000000000000'
}

// Specify the path to the working directory
const workingDirectory = '/home/lighthouse/scripts/local_testnet';

// Options for the child_process.exec() function
const o = {
    cwd: workingDirectory, // Set the working directory
};

async function startScript() {
    return new Promise(async (resolve, reject) => {
        // Command to execute the script
        const scriptPath = '/home/lighthouse/scripts/local_testnet/start_local_testnet.sh';
        const command = `./${path.basename(scriptPath)} genesis.json`;
        exec(command, o, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                // return;
                reject(error);
            }
            // if (stderr) {
            //     console.error(`stderr: ${stderr}`);
            //     return;
            // }
            // console.log(`stdout: ${stdout}`);
            resolve(stdout);
        });
    });
}

function stopScript() {
    const scriptPath = '/home/lighthouse/scripts/local_testnet/stop_local_testnet.sh';
    const command = `./${path.basename(scriptPath)}`;
    exec(command, o, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        // if (stderr) {
        //     console.error(`stderr: ${stderr}`);
        //     return;
        // }
        console.log(`stdout: ${stdout}`);
    });
}

function checkBeaconStatus() {
    const command = 'curl -X GET "http://localhost:8001/lighthouse/syncing" -H "accept: application/json" | jq';
    exec(command, o, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        // if (stderr) {
        //     console.error(`stderr: ${stderr}`);
        //     return;
        // }
        console.log(`stdout: ${stdout}`);
    });
}

function checkGethStatus() {
    const command = 'curl -X GET "http://localhost:8001/lighthouse/eth1/syncing" -H  "accept: application/json" | jq';
    exec(command, o, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        // if (stderr) {
        //     console.error(`stderr: ${stderr}`);
        //     return;
        // }
        console.log(`stdout: ${stdout}`);
        // return stdout;
    });
}

function deployContract() {
    return new Promise(async (resolve, reject) => {
        const command = 'node deploy.js';
        const opt = {
            cwd: '/home/fahd/Perf_Analysis_Tool', // Set the working directory
        };
        exec(command, opt, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                // deployContract();
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                reject(error);
            }
            console.log(`stdout: ${stdout}`);
            resolve(stdout);
            // return stdout;
        });
    });
}

function modifyNodeCount(nodes) {
    const filePath = '/home/lighthouse/scripts/local_testnet/vars.env';
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContents.split('\n');
    console.log('Previous BN_COUNT value: ', lines[27]);
    lines[27] = `BN_COUNT=${nodes}`;
    const updatedContents = lines.join('\n');
    fs.writeFileSync(filePath, updatedContents, 'utf-8');
    console.log(`BN_COUNT has been updated to: ${nodes}`);
}

async function setupPrivateEth() {
    console.log(await startScript());
    await new Promise(resolve => setTimeout(resolve, 120000));
    checkBeaconStatus();
    checkGethStatus();
    await deployContract();
}

async function measureThroughput(function_name) {
    return new Promise(async (resolve, reject) => {
        const nonce = await web3.eth.getTransactionCount(address1);
        switch (function_name) {
            case 'createUser':
                console.log('At create user');
                const promises = [];
                const data = benchmark_contract.methods.createUser("John Doe", 10000000).encodeABI();
                console.log(nonce);
                for (let i = 0; i < numTransactions; i++) {
                    // console.log('Inside For');
                    const signedTx = await web3.eth.accounts.signTransaction({
                        to: ContractAddress,
                        data: data,
                        gas: 130000,
                        gasPrice: String(70000000000),
                        from: address1,
                        nonce: Number(nonce) + i
                    }, process.env.PRIVATE_KEY)
                    promises.push(new Promise(async (resolve, reject) => {
                        try {
                            // console.log('Inside Promise');
                            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                            // console.log(receipt);
                            resolve(receipt);
                        } catch (error) {
                            reject(error);
                        }
                    }));

                }
                const startTime = performance.now();
                Promise.all(promises)
                    .then((receipts) => {
                        const endTime = performance.now();
                        const duration = ((endTime - startTime) / 1000);
                        const throughput = numTransactions / duration;
                        // console.log(`Transactions Per Second (TPS): ${throughput}`);
                        // console.log(receipts);
                        resolve({ throughput, receipts });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        reject(error);
                    });
                break;
            case 'issueMoney':
                const promises_issueMoney = [];
                const data_issueMoney = benchmark_contract.methods.issueMoney(100, 1).encodeABI();
                console.log(nonce);
                for (let i = 0; i < numTransactions; i++) {
                    const signedTx = await web3.eth.accounts.signTransaction({
                        to: ContractAddress,
                        data: data_issueMoney,
                        gas: 50000,
                        gasPrice: '70000000000',
                        from: address1,
                        nonce: Number(nonce) + i
                    }, process.env.PRIVATE_KEY)
                    promises_issueMoney.push(new Promise(async (resolve, reject) => {
                        try {
                            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                            // console.log(receipt);
                            resolve(receipt);
                        } catch (error) {
                            reject(error);
                        }
                    }));

                }
                const startTime_issueMoney = performance.now();
                Promise.all(promises_issueMoney)
                    .then((receipts) => {
                        const endTime = performance.now();
                        const duration = ((endTime - startTime_issueMoney) / 1000);
                        const throughput = numTransactions / duration;
                        // console.log(`Transactions Per Second (TPS): ${throughput}`);
                        resolve({ throughput, receipts });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        reject(error);
                    });
                break;
            case 'transferMoney':
                const promises_transferMoney = [];
                const data_transferMoney = benchmark_contract.methods.transferMoney(1, 1, 2).encodeABI();
                console.log(nonce);
                for (let i = 0; i < numTransactions; i++) {
                    const signedTx = await web3.eth.accounts.signTransaction({
                        to: ContractAddress,
                        data: data_transferMoney,
                        gas: 50000,
                        gasPrice: '70000000000',
                        from: address1,
                        nonce: Number(nonce) + i
                    }, process.env.PRIVATE_KEY)
                    promises_transferMoney.push(new Promise(async (resolve, reject) => {
                        try {
                            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                            // console.log(receipt);
                            resolve(receipt);
                        } catch (error) {
                            reject(error);
                        }
                    }));
                }
                const startTime_transferMoney = performance.now();
                Promise.all(promises_transferMoney)
                    .then((receipts) => {
                        const endTime = performance.now();
                        const duration = ((endTime - startTime_transferMoney) / 1000);
                        const throughput = numTransactions / duration;
                        // console.log(`Transactions Per Second (TPS): ${throughput}`);
                        resolve({ throughput, receipts });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        reject(error);
                    });
                break;
            default:
                const promises_default = [];
                for (let i = 0; i < numTransactions; i++) {
                    promises_default.push(new Promise(async (resolve, reject) => {
                        try {
                            const user = await benchmark_contract.methods.getUser(1).call(transactionObject);
                            resolve(user);
                        } catch (error) {
                            reject(error);
                        }
                    }));
                }
                const startTime_default = performance.now();
                Promise.all(promises_default)
                    .then((receipts) => {
                        const endTime = performance.now();
                        const duration = ((endTime - startTime_default) / 1000);
                        const throughput = numTransactions / duration;
                        // console.log(`Transactions Per Second (TPS): ${throughput}`);
                        // console.log(receipts);
                        resolve(throughput);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        reject(error);
                    });
        }
    });
}

async function measureLatency(function_name) {
    // const gasPrice = await web3.eth.getGasPrice();
    return new Promise(async (resolve, reject) => {
        switch (function_name) {
            case 'createUser':
                // await benchmark_contract.methods.createUser("John Doe", 100).send(transactionObject);
                const data = benchmark_contract.methods.createUser("John Doe", 100).encodeABI();
                web3.eth.accounts.signTransaction({
                    to: ContractAddress,
                    data: data,
                    gas: 1500000,
                    gasPrice: '70000000000',
                    nonce: await web3.eth.getTransactionCount(address1),
                }, process.env.PRIVATE_KEY)
                    .then((signedTx) => {
                        const startTime = performance.now();
                        web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                            .on('receipt', (receipt) => {
                                const endTime = performance.now();
                                const latency = (endTime - startTime) / 1000;
                                // console.log(`Latency (in seconds): ${latency}`)
                                // console.log('Transaction receipt:', receipt);
                                const transactionFee = web3.utils.fromWei(receipt.effectiveGasPrice * receipt.gasUsed, "ether");
                                // console.log(transactionFee);
                                resolve({ latency, transactionFee });
                            })
                            .on('error', (error) => {
                                console.error('Transaction error:', error);
                                resolve(error);
                            });
                    })
                    .catch((error) => {
                        console.error('Error signing the transaction:', error);
                        resolve(error);
                    });
                break;
            case 'issueMoney':
                // await benchmark_contract.methods.issueMoney(100, 1).send(transactionObject);
                const data_issueMoney = benchmark_contract.methods.issueMoney(100, 1).encodeABI();
                web3.eth.accounts.signTransaction({
                    to: ContractAddress,
                    data: data_issueMoney,
                    gas: 1500000,
                    gasPrice: '70000000000',
                    nonce: await web3.eth.getTransactionCount(address1),
                }, process.env.PRIVATE_KEY)
                    .then((signedTx) => {
                        const startTime = performance.now();
                        web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                            .on('receipt', (receipt) => {
                                const endTime = performance.now();
                                const latency = (endTime - startTime) / 1000;
                                // console.log(`Latency (in seconds): ${latency}`)
                                // console.log('Transaction receipt:', receipt);
                                const transactionFee = web3.utils.fromWei(receipt.effectiveGasPrice * receipt.gasUsed, "ether");
                                resolve({ latency, transactionFee });
                            })
                            .on('error', (error) => {
                                console.error('Transaction error:', error);
                                reject(error);
                            });
                    })
                    .catch((error) => {
                        console.error('Error signing the transaction:', error);
                        reject(error);
                    });
                break;
            case 'transferMoney':
                // await benchmark_contract.methods.transferMoney(1, 1, 2).send(transactionObject);
                const data_transferMoney = benchmark_contract.methods.transferMoney(1, 1, 2).encodeABI();
                web3.eth.accounts.signTransaction({
                    to: ContractAddress,
                    data: data_transferMoney,
                    gas: 1500000,
                    gasPrice: '70000000000',
                    // nonce: await web3.eth.getTransactionCount(address1),
                    from: address1
                }, process.env.PRIVATE_KEY)
                    .then((signedTx) => {
                        const startTime = performance.now();
                        web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                            .on('receipt', (receipt) => {
                                const endTime = performance.now();
                                const latency = (endTime - startTime) / 1000;
                                // console.log(`Latency (in seconds): ${latency}`)
                                // console.log('Transaction receipt:', receipt);
                                const transactionFee = web3.utils.fromWei(receipt.effectiveGasPrice * receipt.gasUsed, "ether");
                                resolve({ latency, transactionFee });
                            })
                            .on('error', (error) => {
                                console.error('Transaction error:', error);
                                reject(error);
                            });
                    })
                    .catch((error) => {
                        console.error('Error signing the transaction:', error);
                        reject(error);
                    });
                break;
            default:
                const startTime = performance.now();
                const user = await benchmark_contract.methods.getUser(1).call(transactionObject);
                const endTime = performance.now();
                const latency = (endTime - startTime) / 1000;
                // console.log(`Latency (in seconds): ${latency}`)
                const transactionFee = 0;
                resolve({ latency, transactionFee });
            // console.log(user);
        }
    });
}

async function measureMetrics(peformance_metric) {
    switch (peformance_metric) {
        case 'Throughput':
            const throughput = await measureThroughput(selectedFunction);
            // console.log('At throughput: ', throughput);
            return throughput;
        case 'Latency':
            const latency = await measureLatency(selectedFunction);
            // console.log('At latency', latency);
            return latency;

        default:
            // Throughput
            const throughput_default = await measureLatency(selectedFunction);
            console.log('At default (tps): ', throughput_default);
            const latency_default = await measureThroughput(selectedFunction);
            console.log('At default (latency)', latency_default);
    }
}

async function measureScalability(node_count1, node_count2) {
    // For node_count1
    modifyNodeCount(node_count1);
    await setupPrivateEth();
    const latency = await measureMetrics('Latency');
    const throughput = await measureMetrics('Throughput');

    //For node_count2
    modifyNodeCount(node_count2);
    await setupPrivateEth();
    const latency2 = await measureMetrics('Latency');
    const throughput2 = await measureMetrics('Throughput');

    console.log(`Latency (in seconds) when the number of nodes are ${node_count1}: ${latency}`);
    console.log(`Throughput (transactions per second) when the number of nodes are ${node_count1}: ${throughput}`);
    console.log(`Latency (in seconds) when the number of nodes are ${node_count2}: ${latency2}`);
    console.log(`Throughput (transactions per second) when the number of nodes are ${node_count2}: ${throughput2}`);

}

function killNode() {
    const command = "ps aux | grep geth | awk '{print $2}' | sed -n '2p'";
    const opt = {
        cwd: '/home/user/Documents/Kachra/Benchmark', // Set the working directory
    };

    exec(command, opt, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        exec('kill ' + stdout, opt, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
        });

    });

    exec("ps aux | grep beacon | awk '{print $2}' | sed -n '2p'", opt, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        // stdout.split(' ');
        console.log(`stdout: ${stdout}`);
        exec('kill ' + stdout, opt, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
        });
    });
}

async function measureFaultTolerance() {
    await setupPrivateEth();
    // Before failure
    const latency = await measureMetrics('Latency');
    const throughput = await measureMetrics('Throughput');

    // After failure
    killNode();
    const latency2 = await measureMetrics('Latency');
    const throughput2 = await measureMetrics('Throughput');

    console.log(`Latency (in seconds) before node failure: ${latency}`);
    console.log(`Throughput (transactions per second) before node failure: ${throughput}`);
    console.log(`Latency (in seconds) after node failure: ${latency2}`);
    console.log(`Throughput (transactions per second) after node failure: ${throughput2}`);

}

function writeToFile(_perfMetric, _fee) {
    var filePath = '';
    var headers_latency = [];
    var csvData = [];
    const date = new Date();
    switch (metric) {
        case 'Latency':
            filePath = "/home/fahd/Perf_Analysis_Tool/latency.csv";
            headers_latency = ['Sr No.', 'Date', 'Time', 'Blockchain', 'Function', 'Latency', 'Transaction Fee'];
            csvData = ['1', date.toLocaleDateString(), date.toTimeString(), 'Private Ethereum', selectedFunction, _perfMetric, _fee, '\n'];
            break;
        case 'Throughput':
            filePath = "/home/fahd/Perf_Analysis_Tool/throughput.csv";
            headers_latency = ['Sr No.', 'Date', 'Time', 'Blockchain', 'Function', 'Number of Transactions', 'Throughput', 'Transaction Fee'];
            csvData = ['1', date.toLocaleDateString(), date.toTimeString(), 'Private Ethereum', selectedFunction, numTransactions, _perfMetric, _fee, '\n'];
            break;
    }
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`File at path '${filePath}' does not exist.`);
            const csvHeaderData = [headers_latency, csvData].map(row => row.join(','));
            const csvString = csvHeaderData.join('\n');
            fs.writeFile(filePath, csvString, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log('CSV data has been written to', filePath);
                }
            });
        } else {
            console.log(`File at path '${filePath}' exists.`);
            fs.readFile(filePath, 'utf-8', (readErr, data) => {
                if (readErr) {
                    console.error('Error reading the file', readErr);
                } else {
                    const lines = data.trim().split('\n');
                    const lastLine = lines[lines.length - 1];
                    const fields = lastLine.split(',');
                    const index = Number(fields[0]) + 1;
                    const date = new Date();
                    if (selectedFunction == 'default') {
                        _fee = 0;
                    }
                    // const appendData = [index, date.toLocaleDateString(), date.toTimeString(), 'Private Ethereum', selectedFunction, numTransactions, _perfMetric, _fee, "\n"];
                    csvData[0] = index;
                    const csvString = csvData.join(',');
                    // const csvString = appendData.join(',');
                    // const csvString = appendData.join('\n');
                    console.log(csvString);
                    fs.appendFile(filePath, csvString, 'utf8', (err) => {
                        if (err) {
                            console.error('Error writing to file:', err);
                        } else {
                            console.log('CSV data has been written to', filePath);
                        }
                    });

                }
            });
        }
    });
}


async function main() {
    // Execute the command

    // modifyNodeCount(16);
    stopScript();
    // await setupPrivateEth();
    // await measureThroughput(selectedFunction);
    // console.log(await measureMetrics('Latency'));
    // console.log(await measureMetrics('Latency'));

    // const { latency, transactionFee } = (await measureMetrics(metric));
    // // console.log(latency, transactionFee);
    // writeToFile(latency, transactionFee);

    // if (selectedFunction == "default") {
    //     const throughput = (await measureMetrics('Throughput'));
    //     writeToFile(throughput, 0);
    // }
    // else {
    //     const { throughput, receipts } = (await measureMetrics('Throughput'));
    //     var transactionFee = 0
    //     for (let i = 0; i < numTransactions; i++) {
    //         transactionFee += Number(receipts[i].effectiveGasPrice) * Number(receipts[i].gasUsed);
    //     }
    //     transactionFee = web3.utils.fromWei(transactionFee / numTransactions, "ether");
    //     console.log(`Transactions Per Second (TPS): ${throughput}`);
    //     console.log(`Average transaction feee (ether): ${transactionFee}`);
    //     writeToFile(throughput, transactionFee);
    // }

    // console.log(numTransactions);
    // fs.readFile('latency.csv', function (err, data) {
    //     if (err) {
    //         console.log('KKK')
    //         console.log('Error writing to file', err);
    //     } else {
    //         console.log("Here")
    //         data = data.toString();
    //         var lines = data.trim().split('\n');
    //         var lastLine = lines.slice(-1)[0];

    //         var fields = lastLine.split(',');
    //         var audioFile = fields.slice(0)[0];

    //         console.log(audioFile);
    //     }
    // });

    // measureScalability(4, 6); 
    // startScript();
    // stopScript();
    // deployContract();
    // killNode();
    // modifyNodeCount(3);
    // measureFaultTolerance();


}

// Call the main function and handle any errors that occur
main().catch(err => console.log(err));