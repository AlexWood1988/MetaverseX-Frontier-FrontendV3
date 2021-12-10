import Web3 from "web3";
import * as constants from "../constants/contracts.json";
import blindboxManagerContractAbi from "./abi/BlindboxManager.json";
import BlindboxInfo from "../constants/BlindboxInfo.json";

const BlindboxWeb3 = {
    init(){
        return new Promise((resolve, reject) => {
            window.ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
                window.web3 = new Web3(window.ethereum);
                const blindboxManagerContract = constants.blindboxManagerContract;
                // init contract
                window.blindboxManagerContract = new window.web3.eth.Contract(blindboxManagerContractAbi.abi, blindboxManagerContract);

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
    }

}

export default BlindboxWeb3;