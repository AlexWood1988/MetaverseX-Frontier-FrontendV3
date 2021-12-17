import Web3 from "web3";
import testFaucetAbi from "./testfaucet.json";

const testweb3 = {
    init(){
        return new Promise((resolve, reject) => {
            window.ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
                window.web3 = new Web3(window.ethereum);
                const testfaucetContract = "0xBCB007684aff9d0ea899ca71E8848c72d32035f9";
                // init contract
                window.testfaucetContract = new window.web3.eth.Contract(testFaucetAbi.abi, testfaucetContract);
                // get default eth address
                window.defaultAccount = accounts[0];
                resolve(true);
            })
        })
    },

    getmxc(){
        return new Promise((resolve, reject) => {
            window.testfaucetContract.methods.getmxc().send({from:window.defaultAccount}).then(re => {
                resolve(re);
            })
        })
    },

    getau(){
        return new Promise((resolve, reject) => {
            window.testfaucetContract.methods.getau().send({from:window.defaultAccount}).then(re => {
                resolve(re);
            })
        })
    }
}

export default testweb3;