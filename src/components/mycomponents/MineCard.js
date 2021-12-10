import React, { memo } from 'react';
import styled from "styled-components";
import 'tachyons';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;


const MineCard = ({ mine, className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4', openDetailMine }) => {
    return (
        <div className={className}>
            <div className="nft__item m-0">
                <div className="nft__item_wrap" >
                <Outer>
                    <span>
                        <img src={mine.planet.img} className="lazy nft__item_preview" alt=""/>
                    </span>
                </Outer>
                </div>
                <div className="nft__item_info">
                    <span onClick={()=> openDetailMine(mine)}>
                        <h4>No.{mine.id} Mine in {mine.planet.name}</h4>
                    </span>
                    <div className="nft__item_price">
                        Profit Now: {(mine.profitLastTime).substring(0, mine.profitLastTime.length - 18)} AU
                    </div>
                    <div className="nft__item_action pb2">
                        <span onClick={()=> openDetailMine(mine)}> {'Details' }</span>
                    </div>
                    <div className="nft__item_like">
                        {mine.shipCount} Ship(s)
                    </div>                
                </div> 
            </div>
        </div>             
    );
};

export default memo(MineCard);