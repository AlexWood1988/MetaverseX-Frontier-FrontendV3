import Web3 from "web3";
import * as constants from "../constants/contracts.json";
import tokenContract1Abi from "./abi/TokenContract1.json";

const TokenWeb3 = {
    init(){
        return new Promise((resolve, reject) => {
            window.ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
                window.web3 = new Web3(window.ethereum);
                const auContract = constants.auContract;
                const mxcContract = constants.mxcContract;
                // init contract
                window.auContract = new window.web3.eth.Contract(tokenContract1Abi.abi, auContract);
                window.mxcContract = new window.web3.eth.Contract(tokenContract1Abi.abi, mxcContract);
                // get default eth address
                window.defaultAccount = accounts[0];
                resolve(true);
            })
        })
    },

    approveAllAuForShipHelper(){
        return new Promise((resolve, reject) => {
            window.auContract.methods.approve(constants.shipHelperContract, "10000000000000000000000000000000000").send({from: window.defaultAccount})
            .then(result => {
                resolve(result);
            })
        })
    },

    getMxcBalance(){
        return new Promise((resolve, reject) => {
            window.mxcContract.methods.balanceOf(window.defaultAccount).call().then(re => {
                if(re.length <= 18) resolve("0");
                else resolve(re.substring(0, re.length-18));
            })
        })
    },

    getMxcAllowanceForBlindboxManager(need){
        return new Promise((resolve, reject) => {
            window.mxcContract.methods.allowance(window.defaultAccount, constants.blindboxManagerContract).call().then(re => {
                if (re.length <= 18) resolve(false);
                else if (Number(re.substring(0, re.length-18)) >= need) resolve(true)
                else resolve(false) 
            })
        })
    },

    approveAllMxcForBlindboxManager(){
        return new Promise((resolve, reject) => {
            window.mxcContract.methods.approve(constants.blindboxManagerContract, "10000000000000000000000000000000000").send({from: window.defaultAccount})
            .then(result => {
                resolve(result);
            })
        })
    },
}

export default TokenWeb3;