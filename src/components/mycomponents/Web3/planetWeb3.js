import Web3 from "web3";
import * as constants from "../constants/contracts.json";
import PlanetFactoryAbi from "./abi/PlanetFactory.json";
import MineFactoryAbi from "./abi/MineFactory.json";
import shipInfo from "../constants/shipInfo.json";

const PlanetWeb3 = {
    init(){
        return new Promise((resolve, reject) => {
            window.ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
                window.web3 = new Web3(window.ethereum);
                const planetFactoryContract = constants.planetFactoryContract;
                const mineFactoryContract = constants.mineFactoryContract;
                // init contract
                window.planetFactoryContract = new window.web3.eth.Contract(PlanetFactoryAbi.abi, planetFactoryContract);
                window.mineFactoryContract = new window.web3.eth.Contract(MineFactoryAbi.abi,  mineFactoryContract);
                // get default eth address
                window.defaultAccount = accounts[0];
                resolve(true);
            })
        })
    },

    planetCount() {
        return new Promise((resolve, reject) => {
            window.planetFactoryContract.methods.balanceOf(window.defaultAccount).call().then(result => {
                resolve(result);
            })
        })
    },

    //返回当前地址所有Planet的Token ID
    allPlanets(){
        return new Promise((resolve, reject) => {
            this.planetCount().then(_planetCount => {
                var planets = [];
                var allPromise = [];
                for(var i = 0; i<_planetCount; i++) {
                    allPromise.push(window.planetFactoryContract.methods.tokenOfOwnerByIndex(window.defaultAccount, i).call().then(id => {
                        planets.push(id);
                    }))
                }
                Promise.all(allPromise).then(()=>resolve(planets));
            })
        })
    },

    //返回ID的planet对象
    getPlanet(id){
        return new Promise((resolve, reject) => {
            window.planetFactoryContract.methods.Planets(id).call().then(_planet => {
                let _dplanet = Object.assign({},_planet);
                _dplanet['img'] = `./img/planets/${_planet.rarity}.jpg`
                _dplanet['id'] = id;
                _dplanet.rarity = shipInfo.rarity[_planet.rarity];
                resolve(_dplanet);
            });
        })
    },

    
    //获取Planet的PlanetMultiplier
    getPlanetMultiplier(id){
        return new Promise((resolve, reject) => {
            window.planetFactoryContract.methods.getPlanetMultiplier(id).call().then(result => {
                resolve(result);
            })
        })
    },

    mineCount() {
        return new Promise((resolve, reject) => {
            window.mineFactoryContract.methods.balanceOf(window.defaultAccount).call().then(result => {
                resolve(result);
            })
        })
    },

    //返回当前地址所有Mine的Token ID
    allMines(){
        return new Promise((resolve, reject) => {
            this.mineCount().then(_mineCount => {
                var mines = [];
                var allPromise = [];
                for(var i = 0; i<_mineCount; i++) {
                    allPromise.push(window.mineFactoryContract.methods.tokenOfOwnerByIndex(window.defaultAccount, i).call().then(id => {
                        mines.push(id);
                    }))
                }
                Promise.all(allPromise).then(()=>resolve(mines));
            })
        })
    },

    //获得Mine的每日挖矿收益，单位为AU
    getMineRateByDay(id){
        return new Promise((resolve, reject) => {
            window.mineFactoryContract.methods.getRateByDay(id).call().then(rate => {
                resolve(rate);
            })
        })
    },

    //获得ID的mine对象的ships
    getMineShips(id, shipCount){
        return new Promise((resolve, reject) => {
            let ships = [];
            for(let i = 0, p = Promise.resolve(); i<shipCount; i++){
                p = p.then(() => window.mineFactoryContract.methods.mineToShips(id,i).call())
                    .then((ship) => {
                        ships.push(ship);
                    });
            }
            resolve(ships);
        })
    },

    //返回ID的mine对象
    getMine(id){
        return new Promise((resolve, reject) => {
            window.mineFactoryContract.methods.Mines(id).call().then(_mine => {
                let _dmine = Object.assign({},_mine);
                _dmine.id = id;
                this.getPlanet(_dmine.planetId).then(planet => {
                    _dmine.planet = planet;
                    this.getMineRateByDay(id).then(rate => {
                        _dmine.rateByDay = rate;
                        this.getMineShips(id, _dmine.shipCount).then(ships => {
                            _dmine.ships = ships;
                            resolve(_dmine);
                        })
                    })
                })
            });
        })
    },

    createMine(planetId){
        return new Promise((resolve, reject) => {
            window.mineFactoryContract.methods.createMine(planetId).send({from:window.defaultAccount})
            .then(result => {
                resolve(result);
            })
        })
    },

    //移除某个Mine的Ship
    removeShipOfMine(mineId, shipId, shipIndex){
        return new Promise((resolve, reject) => {
            window.mineFactoryContract.methods.removeShip(mineId, shipId, shipIndex).send({from:window.defaultAccount})
            .then(result => {
                resolve(result);
            })
        })
    },

    //向某个Mine添加Ship
    addShipOfMine(mineId, shipId){
        return new Promise((resolve, reject) => {
            window.mineFactoryContract.methods.addShip(mineId, shipId).send({from:window.defaultAccount})
            .then(result => {
                resolve(result);
            })
        })
    },

    getProfit(mineId){
        return new Promise((resolve, reject) => {
            window.mineFactoryContract.methods.getReward(mineId).send({from:window.defaultAccount})
            .then(result => {
                resolve(result);
            })
        })
    },

    getIsApprovedForAll(owner, operator){
        return new Promise((resolve, reject) => {
            window.planetFactoryContract.methods.isApprovedForAll(owner, operator).call().then(result => {
                resolve(result);
            })
        })
    },

    setApprovalForAll(operator, bool){
        return new Promise((resolve,reject) => {
            window.planetFactoryContract.methods.setApprovalForAll(operator, bool).send({from:window.defaultAccount})
            .then(result => {
                resolve(result);
            })
        })
    }
}

export default PlanetWeb3;