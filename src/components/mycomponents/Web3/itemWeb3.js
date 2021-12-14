import Web3 from "web3";
import * as constants from "../constants/contracts.json";
import ERC721PresetMinterPauserAutoIdAbi from "./abi/ERC721PresetMinterPauserAutoId.json";
import TokenConvertibleNftAbi from "./abi/TokenConvertibleNft.json";

const ItemWeb3 = {
    init(){
        return new Promise((resolve, reject) => {
            window.ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
                window.web3 = new Web3(window.ethereum);
                const nft01Contract = constants.nft01Contract;
                const nft02Contract = constants.nft02Contract;
                const nft03Contract = constants.nft03Contract;
                // init contract
                window.nftContract = [];
                // 200 AU
                window.nftContract[0] = new window.web3.eth.Contract(TokenConvertibleNftAbi.abi, nft01Contract);
                // decoder a
                window.nftContract[1] = new window.web3.eth.Contract(ERC721PresetMinterPauserAutoIdAbi.abi, nft02Contract);
                // 1 MXC
                window.nftContract[2] = new window.web3.eth.Contract(TokenConvertibleNftAbi.abi, nft03Contract);
                // get default eth address
                window.defaultAccount = accounts[0];
                resolve(true);
            })
        })
    },

    nftCount(contractId) {
        return new Promise((resolve, reject) => {
            window.nftContract[contractId].methods.balanceOf(window.defaultAccount).call().then(result => {
                resolve(result);
            })
        })
    },

    //返回当前地址所有Nft的Token ID
    allNfts(contractId){
        return new Promise((resolve, reject) => {
            this.nftCount(contractId).then(_nftCount => {
                var nfts = [];
                var allPromise = [];
                for(var i = 0; i<_nftCount; i++) {
                    allPromise.push(window.nftContract[contractId].methods.tokenOfOwnerByIndex(window.defaultAccount, i).call().then(id => {
                        nfts.push(id);
                    }))
                }
                Promise.all(allPromise).then(()=>resolve(nfts));
            })
        })
    },

    redeemNft(contractId,tokenId){
        return new Promise((resolve, reject) => {
            window.nftContract[contractId].methods.redeem(tokenId).send({from:window.defaultAccount}).then(re =>{
                resolve(re);
            })
        })
    }
}

export default ItemWeb3;