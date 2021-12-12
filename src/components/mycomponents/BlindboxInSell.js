import React, { memo } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselNew } from '../components/constants';
import BlindboxInfo from "../mycomponents/constants/BlindboxInfo.json";
import 'tachyons';
import BlindboxWeb3 from "./Web3/blindboxWeb3";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 260px;
  overflow: hidden;
  border-radius: 8px;
`;

const nfts = BlindboxInfo.blindboxes;

class BlindboxInSell extends React.Component {
    componentDidMount(){
        BlindboxWeb3.init();
    }

    buyBlindbox(index){
        BlindboxWeb3.buyBlindbox(index).then(re=>{});
    }

    render(){
        return (
            <div className='nft'>
            <Slider {...carouselNew}>
            {nfts && nfts.map( (nft, index) => (
                <div className='itm' index={index + 1} key={index}>
                <div className="d-item">
                    <div className="nft__item">
                        <div className="author_list_pp">
                            <span>                                    
                                <img className="lazy" src={nft.iconImg} alt=""/>
                                <i className="fa fa-check"></i>
                            </span>
                        </div>
                        <div className="nft__item_wrap">
                        <Outer>
                            <span>
                                <img src={nft.previewImg} className="lazy nft__item_preview" alt=""/>
                            </span>
                        </Outer>
                        </div>
                        <div className="nft__item_info">
                            <span>
                                <h4>{nft.name}</h4>
                            </span>
                            <div className="nft__item_price f5">
                                {nft.tier}
                            </div>
                            <div className="nft__item_price">
                                <p className='f6'>{nft.price}</p>
                            </div>
                            <div className="nft__item_action">
                                <span onClick={()=> this.buyBlindbox(nft.index)}>Buy Now</span>
                            </div>
                            <div className="nft__item_like">
                                <i className="fa fa-heart"></i><span>{nft.likes}</span>
                            </div>                                                        
                        </div> 
                    </div>
                </div>
                </div>
            ))}
            </Slider>
            </div>
        );
    }
}

export default memo(BlindboxInSell);