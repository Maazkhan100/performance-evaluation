const { exec } = require('child_process');
const { performance } = require('perf_hooks');
const puppeteer = require('puppeteer');
const path = require('path');

const opt = {
    cwd: '/home/test-network/Netowrk/setup1/Organization1',
};

function measureLatency(functionName, ...otherArgs) {

    return new Promise(async (resolve, reject) => {

        var command = '';
        if (functionName.toLowerCase() === "queryuser") {
            command = `peer chaincode query -C mychannel -n fabcar -c '{"Args":["${functionName}",${otherArgs.map(arg => `"${arg}"`).join(",")}]}'`;
        }
        else {
            const PWD = "/home/test-network/Netowrk/setup1/Organization1"
            // Two peers:
            // command = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"${functionName}","Args":[${otherArgs.map(arg => `"${arg}"`).join(",")}]}'`;

            // 4 peers:
            // command = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" -c '{"function":"${functionName}","Args":[${otherArgs.map(arg => `"${arg}"`).join(",")}]}'`;

            // 8 peers:
            // command = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" -c '{"function":"${functionName}","Args":[${otherArgs.map(arg => `"${arg}"`).join(",")}]}'`;

            // 12 peers:
            // command = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" -c '{"function":"${functionName}","Args":[${otherArgs.map(arg => `"${arg}"`).join(",")}]}'`;

            //16 peers:
            command = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer6.org1.example.com/tls/ca.crt" --peerAddresses localhost:8011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer7.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" --peerAddresses localhost:10001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer6.org2.example.com/tls/ca.crt" --peerAddresses localhost:10011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer7.org2.example.com/tls/ca.crt" -c '{"function":"${functionName}","Args":[${otherArgs.map(arg => `"${arg}"`).join(",")}]}'`;
        }

        const startTime = performance.now();
        exec(command, opt, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject (error);
            }
            // else if (stderr) {
            //     console.error(`stderr: ${stderr}`);
            //     resolve(stderr);
            // }
            else {
                const endTime = performance.now();
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                // Check the content of stderr and resolve or reject based on the content
                if (stderr.includes("result: status:200") || stdout) {
                    const latency = (endTime - startTime)/1000;
                    resolve(latency);
                }
                else {
                    reject(new Error(stderr)); // Reject with the stderr content as an error
                }
            }
        });
    });
}

// Second version:
async function measureThroughput(transactions, command, functionName) {

    const numTransactions = transactions;
    let count = 0;

    return new Promise(async (resolve, reject) => {

        promises = [];
        // const Time = performance.now();
        // console.log(`For Starting Time: ${Time / 1000}`);
        for (let i = 0; i < numTransactions; i++) {
            promises.push(new Promise(async (resolve, reject) => {
                exec(command, opt, (error, stdout, stderr) => {
                    if (error) {
                        count++;
                        // sleep(4000);
                        // refreshCouchDBPage();
                        console.log("1", i);
                        console.log(error);
                        resolve(error);
                    }
                    else {
                        if (stderr.includes("result: status:200") || stdout) {
                            // console.log("2");
                            // console.log("Stdout", stdout);
                            console.log("Stderr", stderr);
                            resolve({stdout, stderr});
                        }
                        else {
                            console.log("3");
                            resolve(new Error(stderr));
                        }
                    }
                });
            }));
        }
        //const time = performance.now();
        // console.log(`For Ending Time: ${time / 1000}`);
        // console.log(`For Time: ${(time - Time) / 1000}`);
        const startTime = performance.now();
        // console.log(`Throughput start time: ${startTime/1000}`);
        Promise.all(promises)
        .then((result) => {
            const endTime = performance.now();
            // console.log(`Throughput end time: ${endTime/1000}`);
            const duration = ((endTime - startTime) / 1000);
            const throughput = numTransactions / duration;
            // console.log(`Time throughput: ${(endTime - startTime) / 1000}`);
            console.log("Count", count);
            console.log(`Transactions Per Second (TPS) for ${functionName}: ${throughput}`);
            resolve(throughput);
        })
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function refreshCouchDBPage() {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const fauxtonUrl = 'http://localhost:5984/_utils/#database/mychannel_fabcar/_all_docs';

  try {
    // Navigate to the CouchDB Fauxton page
    await page.goto(fauxtonUrl, { waitUntil: 'domcontentloaded' });

    // Reload or refresh the page
    await page.reload({ waitUntil: 'domcontentloaded' });

    console.log('CouchDB page refreshed successfully.');
  } catch (error) {
    console.error('Error refreshing CouchDB page:', error.message);
  } finally {
    // Close the browser
    await browser.close();
  }
}

// First version:
/*async function measureThroughput(transactions, command) {

    const numTransactions = transactions;
    return new Promise(async (resolve, reject) => {
        promises = [];
        for (let i = 0; i < numTransactions; i++) {
            promises.push(new Promise(async (resolve, reject) => {
                exec(command, opt, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error for: ${error.message}`);
                        reject (error);
                    }
                    // else if (stderr) {
                    //     console.error(`stderr: ${stderr}`);
                    //     reject(stderr);
                    // }
                    else {
                        // console.log(`stdout: ${stdout}`);
                        // console.error(`stderr: ${stderr}`);
                        // Check the content of stderr and resolve or reject based on the content
                        if (stderr.includes("result: status:200") || stdout) {
                            resolve({stdout, stderr});
                        }
                        else {
                            reject(new Error(stderr)); // Reject with the stderr content as an error
                        }
                    }
                });
            }));
        }
        const startTime = performance.now();
        Promise.all(promises)
        .then((result) => {
            const endTime = performance.now();
            const duration = ((endTime - startTime) / 1000);
            const throughput = numTransactions / duration;
            console.log(`Time: ${(endTime - startTime) / 1000}`);
            console.log(`Transactions Per Second (TPS): ${throughput}`);
            // console.log('Output after executing command', result);
            resolve(throughput);
        })
        .catch((error) => {
            console.error('Error catch:', error);
            reject(error);
        });
    });
}*/

async function main () {
    // try {
    //     const latencyQuery = await  measureLatency("QueryUser", "1");
    //     const latencyCreate = await  measureLatency("CreateUser", "fahd", "Islamabad");
    //     const latencyTransfer = await  measureLatency("TransferMoney", "1", "2", "1");
    //     const latencyIssue = await  measureLatency("IssueMoney", "1", "1");
    //     console.log("latency Query", latencyQuery);
    //     console.log("latency Create", latencyCreate);
    //     console.log("latency Transfer", latencyTransfer);
    //     console.log("latency Issue", latencyIssue);
    // } catch (error) {
    //     console.error('An error occurred:', error.message);
    // }

    // refreshCouchDBPage();

    const transactions = 1;
    const PWD = "/home/test-network/Netowrk/setup1/Organization1";

    // const commandQuery2 = `peer chaincode query -C mychannel -n fabcar -c '{"Args":["QueryUser","1"]}'`;

    // For 2 peers:
    const commandQuery2 = `peer chaincode query -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"Args":["QueryUser","1"]}'`;
    const commandCreate2 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"CreateUser","Args":["Fahd","Islamabad"]}'`;
    const commandTransfer2 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"TransferMoney","Args":["1","2","1"]}'`;
    const commandIssue2 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"IssueMoney","Args":["3","1"]}'`;

    // For 4 peers:
    // const commandQuery4 = `peer chaincode query -C mychannel -n fabcar -c '{"Args":["QueryUser","1"]}'`;
    const commandCreate4 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" -c '{"function":"CreateUser","Args":["Fahd","Islamabad"]}'`;
    const commandTransfer4 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" -c '{"function":"TransferMoney","Args":["1","2","1"]}'`;
    const commandIssue4 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" -c '{"function":"IssueMoney","Args":["3","1"]}'`;

    // For 8 peers
    // const commandQuery8 = `peer chaincode query -C mychannel -n fabcar -c '{"Args":["QueryUser","1"]}'`;
    const commandCreate8 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" -c '{"function":"CreateUser","Args":["Fahd","Islamabad"]}'`;
    const commandTransfer8 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" -c '{"function":"TransferMoney","Args":["1","2","1"]}'`;
    const commandIssue8 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" -c '{"function":"IssueMoney","Args":["3","1"]}'`;

    // For 12 peers:
    // const commandQuery12 = `peer chaincode query -C mychannel -n fabcar -c '{"Args":["QueryUser","1"]}'`;
    const commandCreate12 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" -c '{"function":"CreateUser","Args":["Fahd","Islamabad"]}'`;
    const commandTransfer12 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" -c '{"function":"TransferMoney","Args":["1","2","1"]}'`;
    const commandIssue12 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" -c '{"function":"IssueMoney","Args":["3","1"]}'`;

    // For 16 peers:
    // const commandQuery16 = `peer chaincode query -C mychannel -n fabcar -c '{"Args":["QueryUser","1"]}'`;
    const commandCreate16 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer6.org1.example.com/tls/ca.crt" --peerAddresses localhost:8011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer7.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" --peerAddresses localhost:10001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer6.org2.example.com/tls/ca.crt" --peerAddresses localhost:10011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer7.org2.example.com/tls/ca.crt" -c '{"function":"CreateUser","Args":["Fahd","Islamabad"]}'`;
    const commandTransfer16 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer6.org1.example.com/tls/ca.crt" --peerAddresses localhost:8011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer7.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" --peerAddresses localhost:10001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer6.org2.example.com/tls/ca.crt" --peerAddresses localhost:10011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer7.org2.example.com/tls/ca.crt" -c '{"function":"TransferMoney","Args":["1","2","1"]}'`;
    const commandIssue16 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer6.org1.example.com/tls/ca.crt" --peerAddresses localhost:8011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer7.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" --peerAddresses localhost:10001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer6.org2.example.com/tls/ca.crt" --peerAddresses localhost:10011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer7.org2.example.com/tls/ca.crt" -c '{"function":"IssueMoney","Args":["3","1"]}'`;

    // const Time = performance.now();
    // console.log(`Main starting Time: ${Time/1000}`);
    console.log(`Number of transaction(s): ${transactions}`);

    const tpsQuery2 = await measureThroughput(transactions, commandQuery2, "Query2");
    // await sleep(1500);
    // const tpsCreate2 = await measureThroughput(transactions, commandCreate2, "Create2");
    // await sleep(1500);
    // const tpsTransfer2 = await measureThroughput(transactions, commandTransfer2, "Transfer2");
    // await sleep(1500);
    // const tpsIssue2 = await measureThroughput(transactions, commandIssue2, "Issue2");

    // const tpsQuery4 = await measureThroughput(transactions, commandQuery4, "Query4");
    // await sleep(1500);
    // const tpsCreate4 = await measureThroughput(transactions, commandCreate4, "Create4");
    // await sleep(1500);
    // const tpsTransfer4 = await measureThroughput(transactions, commandTransfer4, "Transfer4");
    // await sleep(1500);
    // const tpsIssue4 = await measureThroughput(transactions, commandIssue4, "Issue4");

    // await sleep(1500);
    // const tpsCreate8 = await measureThroughput(transactions, commandCreate8, "Create8");
    // await sleep(1500);
    // const tpsTransfer8 = await measureThroughput(transactions, commandTransfer8, "Transfer8");
    // await sleep(1500);
    // const tpsIssue8 = await measureThroughput(transactions, commandIssue8, "Issue8");

    // await sleep(1500);
    // const tpsCreate12 = await measureThroughput(transactions, commandCreate12, "Create12");
    // await sleep(1500);
    // const tpsTransfer12 = await measureThroughput(transactions, commandTransfer12, "Transfer12");
    // await sleep(1500);
    // const tpsIssue12 = await measureThroughput(transactions, commandIssue12, "Issue12");

    // await sleep(1500);
    // const tpsCreate16 = await measureThroughput(transactions, commandCreate16, "Create16");
    // await sleep(1500);
    // const tpsTransfer16 = await measureThroughput(transactions, commandTransfer16, "Transfer16");
    // await sleep(1500);
    // const tpsIssue16 = await measureThroughput(transactions, commandIssue16, "Issue16");

    // const time = performance.now();
    // console.log(`Main ending time time: ${time/1000}`);
    // console.log(`Main Time: ${(time - Time)/1000}`);
}

// Frist version:
/*main().catch((error) => {
    console.error('Unhandled promise rejection:', error.message);
});*/

// Second version:
main()
  .catch((error) => {
    console.error('Unhandled promise rejection:', error);
});
