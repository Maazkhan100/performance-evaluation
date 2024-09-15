export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
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

setGlobalsForPeer0Org2() {
    export CORE_PEER_LOCALMSPID="Org2MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG2_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
    export CORE_PEER_ADDRESS=localhost:9051
}

setGlobalsForPeer1Org2() {
    export CORE_PEER_LOCALMSPID="Org2MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER1_ORG2_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
    export CORE_PEER_ADDRESS=localhost:10051
}

setGlobalsForPeer2Org2() {
    export CORE_PEER_LOCALMSPID="Org2MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER2_ORG2_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
    export CORE_PEER_ADDRESS=localhost:9061
}

setGlobalsForPeer3Org2() {
    export CORE_PEER_LOCALMSPID="Org2MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER3_ORG2_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
    export CORE_PEER_ADDRESS=localhost:9071
}

setGlobalsForPeer4Org2() {
    export CORE_PEER_LOCALMSPID="Org2MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER4_ORG2_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
    export CORE_PEER_ADDRESS=localhost:9081
}

setGlobalsForPeer5Org2() {
    export CORE_PEER_LOCALMSPID="Org2MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER5_ORG2_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
    export CORE_PEER_ADDRESS=localhost:9091
}

setGlobalsForPeer6Org2() {
    export CORE_PEER_LOCALMSPID="Org2MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER6_ORG2_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
    export CORE_PEER_ADDRESS=localhost:10001
}

setGlobalsForPeer7Org2() {
    export CORE_PEER_LOCALMSPID="Org2MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER7_ORG2_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
    export CORE_PEER_ADDRESS=localhost:10011
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
    setGlobalsForPeer0Org2
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer0.org2 ===================== "

    setGlobalsForPeer1Org2
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer1.org2 ===================== "

    setGlobalsForPeer2Org2
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer2.org2 ===================== "

    setGlobalsForPeer3Org2
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer3.org2 ===================== "

    setGlobalsForPeer4Org2
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer4.org2 ===================== "

    setGlobalsForPeer5Org2
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer5.org2 ===================== "

    setGlobalsForPeer6Org2
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer6.org2 ===================== "

    setGlobalsForPeer7Org2
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer7.org2 ===================== "
}
# packageChaincode

installChaincode() {
    setGlobalsForPeer0Org2
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer0.org2 ===================== "

    setGlobalsForPeer1Org2
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer1.org2 ===================== "

    setGlobalsForPeer2Org2
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer2.org2 ===================== "

    setGlobalsForPeer3Org2
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer3.org2 ===================== "

    setGlobalsForPeer4Org2
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer4.org2 ===================== "

    setGlobalsForPeer5Org2
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer5.org2 ===================== "

    setGlobalsForPeer6Org2
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer6.org2 ===================== "

    setGlobalsForPeer7Org2
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer7.org2 ===================== "
}
# installChaincode

queryInstalled() {
    setGlobalsForPeer0Org2
    peer lifecycle chaincode queryinstalled >&log.txt

    cat log.txt
    PACKAGE_ID=$(sed -n "/${CC_NAME}_${VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
    echo PackageID is ${PACKAGE_ID}
    echo "===================== Query installed successful on peer0.org2 on channel ===================== "

    setGlobalsForPeer1Org2
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer1.org2 on channel ===================== "

    setGlobalsForPeer2Org2
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer2.org2 on channel ===================== "

    setGlobalsForPeer3Org2
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer3.org2 on channel ===================== "

    setGlobalsForPeer4Org2
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer4.org2 on channel ===================== "

    setGlobalsForPeer5Org2
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer5.org2 on channel ===================== "

    setGlobalsForPeer6Org2
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer6.org2 on channel ===================== "

    setGlobalsForPeer7Org2
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer7.org2 on channel ===================== "
}
# queryInstalled

approveForMyOrg2() {
    setGlobalsForPeer0Org2

    # Replace localhost with your orderer's vm IP address
    peer lifecycle chaincode approveformyorg -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED \
        --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} \
        --version ${VERSION} --init-required --package-id ${PACKAGE_ID} \
        --sequence ${VERSION}

    echo "===================== chaincode approved from org 2 ===================== "
}
# queryInstalled
# approveForMyOrg2

checkCommitReadyness() {

    setGlobalsForPeer0Org2
    peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME \
        --peerAddresses localhost:9051 --tlsRootCertFiles $PEER0_ORG2_CA \
        --name ${CC_NAME} --version ${VERSION} --sequence ${VERSION} --output json --init-required
    echo "===================== checking commit readyness from org 2 ===================== "
}
# checkCommitReadyness

queryCommitted() {
    setGlobalsForPeer0Org2
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer1Org2
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer2Org2
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer3Org2
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer4Org2
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer5Org2
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer6Org2
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer7Org2
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}
}

# presetup not required here as deployed on same machine
presetup
packageChaincode
installChaincode
queryInstalled
approveForMyOrg2
checkCommitReadyness

# queryCommitted
