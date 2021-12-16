import React from "react";
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import 'tachyons';
import ItemWeb3 from "../../mycomponents/Web3/itemWeb3";
import * as constants from "../../mycomponents/constants/contracts.json";
import ItemCard from "../../mycomponents/Item/ItemCard";
import BlindboxCard from "../../mycomponents/Item/BlindboxCard";
import ItemDetail from "./itemDetail";
import BlindboxDetail from "./blindboxDetail";
import itemInfo from "../../mycomponents/Item/itemInfo.json";
import BlindboxWeb3 from "../../mycomponents/Web3/blindboxWeb3";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

class MyItem extends React.Component {
    constructor(){
        super();
        this.state = {
            nftTotalCount:0,
            nftCount:[],
            nfts: [],
            countready: false,
            isDetail: false,
            detailNft: {},
            blindboxContracts:[]
        }
    }

    componentDidMount(){
        let that = this;
        ItemWeb3.init().then(re=>{
            that.getNfts();
        });
        BlindboxWeb3.init().then(re=>{
            that.getBlindboxContracts();
        })
    }

    getNfts(){
        let that = this;
        const contractNum = constants.nftContractNum;
        for(let i = 0, p = Promise.resolve(); i<contractNum; i++){
            p = p.then(() => ItemWeb3.allNfts(i))
                 .then((result) => {
                     let _nfts = that.state.nfts;
                     _nfts.push(result);
                     that.setState({nfts:_nfts});
                 })
        }
    }

    getBlindboxContracts=()=>{
        BlindboxWeb3.getBlindboxContracts().then(contracts => {
            this.setState({blindboxContracts: contracts});
            console.log(contracts);
        })
    }

    openDetailNft = (nft) => {
        this.setState({isDetail: true, detailNft: nft});
    }

    openBlindbox = (index,name) => {
        BlindboxWeb3.openBlindbox(index,name).then(re=>{});
    }

    useItem = (nft) => {
        ItemWeb3.redeemNft(nft.contractId, nft.tokenId).then(re=>{});
    }

    render(){
        if (this.state.isDetail){
            return(
                <div> 
                {
                    this.state.detailNft.category === 'blindbox' ? 
                    <BlindboxDetail blindbox={this.state.detailNft} useItem={this.openBlindbox}/> :
                    <ItemDetail nft={this.state.detailNft} useItem={this.useItem}/>
                }
            </div>);
        } else {
            return(<div>
                <GlobalStyles/>
                <section className='container d_coll no-bottom'>
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="d_profile">
                                <div className="profile_name">
                                    <h4 className='tl'>
                                        Item                                        
                                        <div className="clearfix"></div>
                                        <span id="wallet" className='f6'>Blind boxes, Awards</span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='container no-top'>
                    <div className='row'>
                        {
                            this.state.nfts.map((nftArray, i) => {
                                return nftArray.map((nft, k) => {
                                    const _nft = {
                                        tokenId:nft,
                                        contractId:i,
                                        contract:`${constants.nftContracts[i]}`,
                                        category:itemInfo.nftCategory[`${i}`],
                                        img:`./img/nfts/0${i}.jpg`,
                                        name: itemInfo.nftName[`${i}`],
                                        reward: itemInfo.nftReward[`${i}`]
                                    }
                                    return <ItemCard className='col-md-2 pa2' nft={_nft} key={k} openDetailNft={this.openDetailNft}/>;
                                })
                            })
                        }
                        {
                            this.state.blindboxContracts.map((contract, i) => {
                                if (Number(contract.balance) > 0) return <BlindboxCard className='col-md-2 pa2' blindbox={Object.assign({},contract,{category:'blindbox'})} key={i} openDetailNft={this.openDetailNft}/>;
                                else return <div className={`nouse-nouse${i}`}>  </div>
                            })
                        }
                    </div>
                </section>

                <Footer />
            </div>)
        }
    }
}
export default MyItem;