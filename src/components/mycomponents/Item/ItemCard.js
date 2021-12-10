import React, { memo } from 'react';
import 'tachyons';

const ItemCard = ({ nft, className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4', openDetailNft }) => {
    return (
        <div className={className}>
            <div className="nft__item m-0">
                <img src={nft.img} className="lazy nft__item_preview pb2" alt=""/>
                <div className="nft__item_info">
                    <span onClick={()=> openDetailNft(nft)}>
                        <h4>{nft.name}</h4>
                    </span>
                    <div className="nft__item_price">
                        TokenId: {nft.tokenId}
                    </div>
                    <div className="nft__item_action pb2">
                        <span onClick={()=> openDetailNft(nft)}> {'Details' }</span>
                    </div>                
                </div> 
            </div>
        </div>             
    );
};

export default memo(ItemCard);