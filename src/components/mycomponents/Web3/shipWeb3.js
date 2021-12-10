import Web3 from "web3";
import * as constants from "../constants/contracts.json";
import shipFactoryContractAbi from "./abi/ShipFactory.json";
import shipHelperContractAbi from "./abi/ShipHelper.json";
import auContractAbi from "./abi/AuContract.json";
import shipInfo from "../constants/shipInfo.json";

const ShipWeb3 = {
    init(){
        return new Promise((resolve, reject) => {
            window.ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
                window.web3 = new Web3(window.ethereum);
                const shipFactoryContract = constants.shipFactoryContract;
                const shipHelperContract = constants.shipHelperContract;
                const auContract = constants.auContract;
                // init contract
                window.shipFactoryContract = new window.web3.eth.Contract(shipFactoryContractAbi.abi, shipFactoryContract);
                //console.log("shipFactoryContract",window.shipFactoryContract);
                window.shipHelperContract = new window.web3.eth.Contract(shipHelperContractAbi.abi, shipHelperContract);
                //console.log("shipHelperContract",window.shipHelperContract);
                window.auContract = new window.web3.eth.Contract(auContractAbi.abi, auContract);
                //console.log("auContract",window.auContract);
                // get default eth address
                window.defaultAccount = accounts[0];
                resolve(true);
            })
        })
    },

    shipCount() {
        return new Promise((resolve, reject) => {
            window.shipFactoryContract.methods.balanceOf(window.defaultAccount).call().then(shipCount => {
                resolve(shipCount);
            })
        })
    },

    //返回当前地址所有Ship的Token ID
    allShips(){
        return new Promise((resolve, reject) => {
            this.shipCount().then(_shipCount => {
                var ships = [];
                for(let i = 0, p = Promise.resolve(); i<_shipCount; i++){
                    p = p.then(() => window.shipFactoryContract.methods.tokenOfOwnerByIndex(window.defaultAccount, i).call())
                    .then(id => {
                        ships.push(id);
                        if (i === _shipCount-1) resolve(ships);
                    })
                }
            })
        })
    },

    //返回ID的ship对象，不包含属性值
    getShip(id){
        return new Promise((resolve, reject) => {
            window.shipFactoryContract.methods.Ships(id).call().then(_ship => {
                const _dship = Object.assign({},_ship);
                _dship.rarity = shipInfo.rarity[_ship.rarity];
                _dship.category = shipInfo.category[_ship.category];
                _dship.modelCode = `${_ship.category}${_ship.rarity}`;
                _dship.model = shipInfo.model[_dship.modelCode];
                _dship.img = `./img/ships/${_dship.modelCode}.jpg`;
                _dship.previewImg = `./img/ships/preview/${_dship.modelCode}.png`;
                _dship.attribute = [];
                resolve(Object.assign({},_dship,{id:id}));
            });
        })
    },

    //返回ID的ship的第attid项属性
    getShipAttribute(id,attid){
        return new Promise((resolve, reject) => {
            window.shipFactoryContract.methods.getAttribute(id, attid).call().then(result => {
                resolve(result);
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

    //付费升级
    payToLevelUp(shipId){
        return new Promise((resolve, reject) => {
            window.shipHelperContract.methods.levelUpByFee(shipId).send({from: window.defaultAccount})
            .then(result => {
                resolve(result);
            })
        })
    },

    //授权所有Ship，以便于Mine的AddShip操作
    approveAllShipForMine(){
        return new Promise((resolve, reject) => {
            window.shipFactoryContract.methods.setApprovalForAll(constants.mineFactoryContract, true)
            .send({from: window.defaultAccount}).then(result => resolve(result));
        })
    }
}

export default ShipWeb3;