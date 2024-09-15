export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export PEER0_ORG1_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export PEER1_ORG1_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt
export PEER2_ORG1_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt
export PEER3_ORG1_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt
export PEER4_ORG1_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt
export PEER5_ORG1_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt
export PEER6_ORG1_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer6.org1.example.com/tls/ca.crt
export PEER7_ORG1_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer7.org1.example.com/tls/ca.crt

export PEER0_ORG2_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export PEER1_ORG2_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt
export PEER2_ORG2_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt
export PEER3_ORG2_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt
export PEER4_ORG2_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt
export PEER5_ORG2_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt
export PEER6_ORG2_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer6.org2.example.com/tls/ca.crt
export PEER7_ORG2_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer7.org2.example.com/tls/ca.crt
export FABRIC_CFG_PATH=${PWD}/../../artifacts/channel/config/

export CHANNEL_NAME=mychannel

setGlobalsForPeer0Org1() {
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
    export CORE_PEER_ADDRESS=localhost:7051
}

setGlobalsForPeer1Org1() {
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER1_ORG1_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
    export CORE_PEER_ADDRESS=localhost:8051
}

setGlobalsForPeer2Org1() {
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER2_ORG1_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
    export CORE_PEER_ADDRESS=localhost:7061
}

setGlobalsForPeer3Org1() {
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER3_ORG1_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
    export CORE_PEER_ADDRESS=localhost:7071
}

setGlobalsForPeer4Org1() {
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER4_ORG1_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
    export CORE_PEER_ADDRESS=localhost:7081
}

setGlobalsForPeer5Org1() {
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER5_ORG1_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
    export CORE_PEER_ADDRESS=localhost:7091
}

setGlobalsForPeer6Org1() {
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER6_ORG1_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
    export CORE_PEER_ADDRESS=localhost:8001
}

setGlobalsForPeer7Org1() {
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER7_ORG1_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
    export CORE_PEER_ADDRESS=localhost:8011
}

presetup() {
    echo Vendoring Go dependencies ...
    pushd ./../../artifacts/src/github.com/fabcar/go
    GO111MODULE=on go mod vendor
    popd
    echo Finished vendoring Go dependencies
}
# presetup

CHANNEL_NAME="mychannel"
CC_RUNTIME_LANGUAGE="golang"
VERSION="1"
CC_SRC_PATH="./../../artifacts/src/github.com/fabcar/go"
CC_NAME="fabcar"

packageChaincode() {
    rm -rf ${CC_NAME}.tar.gz
    setGlobalsForPeer0Org1
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer0.org1 ===================== "

    setGlobalsForPeer1Org1
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer1.org1 ===================== "

    setGlobalsForPeer2Org1
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer2.org1 ===================== "

    setGlobalsForPeer3Org1
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer3.org1 ===================== "

    setGlobalsForPeer4Org1
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer4.org1 ===================== "

    setGlobalsForPeer5Org1
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer5.org1 ===================== "

    setGlobalsForPeer6Org1
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer6.org1 ===================== "

    setGlobalsForPeer7Org1
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer7.org1 ===================== "
}
# packageChaincode

installChaincode() {
    setGlobalsForPeer0Org1
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer0.org1 ===================== "

    setGlobalsForPeer1Org1
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer1.org1 ===================== "

    setGlobalsForPeer2Org1
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer2.org1 ===================== "

    setGlobalsForPeer3Org1
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer3.org1 ===================== "

    setGlobalsForPeer4Org1
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer4.org1 ===================== "

    setGlobalsForPeer5Org1
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer5.org1 ===================== "

    setGlobalsForPeer6Org1
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer6.org1 ===================== "

    setGlobalsForPeer7Org1
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer7.org1 ===================== "
}
# installChaincode

queryInstalled() {
    setGlobalsForPeer0Org1
    peer lifecycle chaincode queryinstalled >&log.txt
    cat log.txt
    PACKAGE_ID=$(sed -n "/${CC_NAME}_${VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
    echo PackageID is ${PACKAGE_ID}
    echo "===================== Query installed successful on peer0.org1 on channel ===================== "

    setGlobalsForPeer1Org1
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer1.org1 on channel ===================== "

    setGlobalsForPeer2Org1
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer2.org1 on channel ===================== "

    setGlobalsForPeer3Org1
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer3.org1 on channel ===================== "

    setGlobalsForPeer4Org1
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer4.org1 on channel ===================== "

    setGlobalsForPeer5Org1
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer5.org1 on channel ===================== "

    setGlobalsForPeer6Org1
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer6.org1 on channel ===================== "
    
    setGlobalsForPeer7Org1
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer7.org1 on channel ===================== "
}
# queryInstalled

approveForMyOrg1() {
    setGlobalsForPeer0Org1
    # set -x
    # Replace localhost with your orderer's vm IP address
    peer lifecycle chaincode approveformyorg -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com --tls \
        --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${VERSION} \
        --init-required --package-id ${PACKAGE_ID} \
        --sequence ${VERSION}
    # set +x

    echo "===================== chaincode approved from org 1 ===================== "
}
# queryInstalled
# approveForMyOrg1

checkCommitReadyness() {
    setGlobalsForPeer0Org1
    peer lifecycle chaincode checkcommitreadiness \
        --channelID $CHANNEL_NAME --name ${CC_NAME} --version ${VERSION} \
        --sequence ${VERSION} --output json --init-required
    echo "===================== checking commit readyness from org 1 ===================== "
}
# checkCommitReadyness

commitChaincodeDefination() {
    setGlobalsForPeer0Org1
    peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        --channelID $CHANNEL_NAME --name ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:8051 --tlsRootCertFiles $PEER1_ORG1_CA \
        --peerAddresses localhost:7061 --tlsRootCertFiles $PEER2_ORG1_CA \
        --peerAddresses localhost:7071 --tlsRootCertFiles $PEER3_ORG1_CA \
        --peerAddresses localhost:7081 --tlsRootCertFiles $PEER4_ORG1_CA \
        --peerAddresses localhost:7091 --tlsRootCertFiles $PEER5_ORG1_CA \
        --peerAddresses localhost:8001 --tlsRootCertFiles $PEER6_ORG1_CA \
        --peerAddresses localhost:8011 --tlsRootCertFiles $PEER7_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA \
        --peerAddresses localhost:10051 --tlsRootCertFiles $PEER1_ORG2_CA \
        --peerAddresses localhost:9061 --tlsRootCertFiles $PEER2_ORG2_CA \
        --peerAddresses localhost:9071 --tlsRootCertFiles $PEER3_ORG2_CA \
        --peerAddresses localhost:9081 --tlsRootCertFiles $PEER4_ORG2_CA \
        --peerAddresses localhost:9091 --tlsRootCertFiles $PEER5_ORG2_CA \
        --peerAddresses localhost:10001 --tlsRootCertFiles $PEER6_ORG2_CA \
        --peerAddresses localhost:10011 --tlsRootCertFiles $PEER7_ORG2_CA \
        --version ${VERSION} --sequence ${VERSION} --init-required
}
# commitChaincodeDefination

queryCommitted() {
    setGlobalsForPeer0Org1
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer1Org1
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer2Org1
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer3Org1
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer4Org1
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer5Org1
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer6Org1
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer7Org1
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}
}
# queryCommitted

# chaincodeInvokeInit() {
#     setGlobalsForPeer0Org1
#     peer chaincode invoke -o localhost:7050 \
#         --ordererTLSHostnameOverride orderer.example.com \
#         --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
#         -C $CHANNEL_NAME -n ${CC_NAME} \
#         --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
#         --isInit -c '{"function":"Init","Args":[]}'
# }
# --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA
# chaincodeInvokeInit

chaincodeInvoke() {
    setGlobalsForPeer0Org1

    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        --isInit -c '{"function": "CreateUser","Args":["Maaz","Swat"]}'
}
# chaincodeInvoke

# --isInit
# CreateUser
# Maaz Swat
# Taimur Pindi
# Fahd Islamabad
# IssueMoney: 1, 15000

chaincodeQuery() {
    setGlobalsForPeer0Org1
    peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"Args":["QueryUser","1"]}'
}
# chaincodeQuery

# Run this function if you add any new dependency in chaincode
# presetup

# packageChaincode
# installChaincode
# queryInstalled
# approveForMyOrg1
# checkCommitReadyness

# commitChaincodeDefination
# queryCommitted
# chaincodeInvokeInit
# sleep 5
# chaincodeInvoke
# sleep 3
# chaincodeQuery

chaincodeInvokeInit() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA \
        --isInit -c '{"function":"Init","Args":[]}'
}
# chaincodeInvokeInit

chaincodeInvokeCreateBatch() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA \
        -c '{"function":"CreateBatch","Args":["b1"]}'
}

chaincodeInvokeCreateFarmer() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        -c '{"function":"CreateFarmer","Args":["f1","Maaz","Swat"]}'
}

chaincodeInvokeFarmerData1() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        -c '{"function": "CreateFarmerSeedBefore","Args":["b1", "Maaz", "Best", "Swat", "10 marla", "10", "Medium", "10 Feb"]}'
}

chaincodeInvokeFarmerData2() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        -c '{"function": "CreateFarmerSeedDataAfter","Args":["f1", "b1", "Carbon", "10 kg", "Nitrogen", "10 kg", "15", "15", "15", "Machine", "March"]}'
}

chaincodeInvokeCreateInspector() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA \
        --isInit -c '{"function": "CreateInspector","Args":["i1", "Umair", "Swat"]}'
}

chaincodeInvokeUpdateInspector() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA \
        --isInit -c '{"function": "UpdateInspectorSeedData","Args":["Umair", "i1", "b1", "true", "true", "true", "false", "false", "true", "March end"]}'
}

chaincodeInvokeCreateTransporter() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA \
        --isInit -c '{"function": "CreateTransporter","Args":["t1", "Shahid", "Barikot"]}'
}

chaincodeInvokeUpdateTransporterSeedData() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA \
        --isInit -c '{"function": "UpdateTransporterSeedData","Args":["t1", "b1", "Shahid", "Islamabad", "Coach", "ICT 100", "10", "April"]}'
}

chaincodeInvokeCreateExporter() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA \
        --isInit -c '{"function": "CreateExporter","Args":["e1", "Usama", "Pindi"]}'
}

chaincodeInvokeUpdateExporterSeedData() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA \
        --isInit -c '{"function": "UpdateExporterSeedData","Args":["e1", "b1", "Usama", "Halls", "April mid", "Turkey", "Ship", "SH 123", "April End"]}'
}

chaincodeInvokeCreateImporter() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA \
        --isInit -c '{"function": "CreateImporter","Args":["imp1", "Abdullah", "Turkey"]}'
}

chaincodeInvokeUpdateImporterSeedData() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA \
        --isInit -c '{"function": "UpdateImporterSeedData","Args":["imp1", "b1", "Abdullah", "home", "May"]}'
}

chaincodeInvokeCreateRetailor() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA \
        --isInit -c '{"function": "CreateRetailor","Args":["r1", "Uzair", "Turkey"]}'
}

chaincodeInvokeUpdateRetailorSeedData() {
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA   \
        --peerAddresses localhost:11051 --tlsRootCertFiles $PEER0_ORG3_CA \
        --isInit -c '{"function": "UpdateRetailorSeedData","Args":["r1", "b1", "Uzair", "Shop", "April Mid"]}'
}

# chaincodeInvokeCreateBatch

# chaincodeInvokeCreateFarmer
# chaincodeInvokeFarmerData1
chaincodeInvokeFarmerData2

# chaincodeInvokeCreateInspector
# chaincodeInvokeUpdateInspector

# chaincodeInvokeCreateTransporter
# chaincodeInvokeUpdateTransporterSeedData

# chaincodeInvokeCreateExporter
# chaincodeInvokeUpdateExporterSeedData

# chaincodeInvokeCreateImporter
# chaincodeInvokeUpdateImporterSeedData

# chaincodeInvokeCreateRetailor
# chaincodeInvokeUpdateRetailorSeedData
