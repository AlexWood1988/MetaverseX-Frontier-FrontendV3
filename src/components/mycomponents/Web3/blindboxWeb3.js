import Web3 from "web3";
import * as constants from "../constants/contracts.json";
import blindboxManagerContractAbi from "./abi/BlindboxManager.json";
import blindboxAbi from "./abi/BlindboxV1.json";
import BlindboxInfo from "../constants/BlindboxInfo.json";

const BlindboxWeb3 = {
    init(){
        return new Promise((resolve, reject) => {
            window.ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
                window.web3 = new Web3(window.ethereum);
                const blindboxManagerContract = constants.blindboxManagerContract;
                // init contract
                window.blindboxManagerContract = new window.web3.eth.Contract(blindboxManagerContractAbi.abi, blindboxManagerContract);
                window.blindboxContracts = [];
                window.blindboxContracts[0] = new window.web3.eth.Contract(blindboxAbi.abi, constants.blindboxesContract[0]);
                window.blindboxContracts[1] = new window.web3.eth.Contract(blindboxAbi.abi, constants.blindboxesContract[1]);
                window.defaultAccount = accounts[0];
                resolve(true);
            })
        })
    },

    buyBlindbox(index){
        return new Promise((resolve, reject) => {
            window.blindboxManagerContract.methods.buyBlindbox(index).send({from:window.defaultAccount}).then(result => {
                resolve(result);
            })
        })
    },

    openBlindbox(index, name){
        return new Promise((resolve, reject) => {
            window.blindboxManagerContract.methods.openBlindbox(index, name).send({from:window.defaultAccount}).then(result => {
                resolve(result);
            })
        })
    },

    getBlindboxContractCount(){
        return new Promise((resolve, reject) => {
            window.blindboxManagerContract.methods.countOfBlindbox().call().then(result => {
                resolve(result);
            })
        })
    },

    getBlindboxContracts(){
        return new Promise((resolve, reject) => {
            this.getBlindboxContractCount().then(count => {
                let contracts = [];
                for(let i = 0, p = Promise.resolve(); i<count; i++){
                    p = p.then(()=>window.blindboxManagerContract.methods.balanceOfBlindbox(window.defaultAccount,i).call())
                         .then(balance => {
                             let contract = {};
                             contract['balance'] = balance;
                             Object.assign(contract, BlindboxInfo.blindboxes[i]);
                             contracts.push(contract);
                             if (i === count - 1) resolve(contracts);
                         })
                }
            })
        })
    },

    getApprovedToBlindboxManager(index){
        return new Promise((resolve, reject) => {
            window.blindboxContracts[index].methods.isApprovedForAll(window.defaultAccount, 
                constants.blindboxManagerContract).call().then(re => {
                    resolve(re);
                })
        })
    },

    setApprovalToBlindboxManager(index){
        return new Promise((resolve, reject) => {
            window.blindboxContracts[index].methods.setApprovalForAll(constants.blindboxManagerContract,
                true).send({from:window.defaultAccount}).then(re => {
                    resolve(re);
                })
        })
    }

}

export default BlindboxWeb3;