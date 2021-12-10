import React, { memo } from 'react';
import styled from "styled-components";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const ShipCard = ({ ship, className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4', openDetailShip }) => {
    return (
        <div className={className}>
            <div className="nft__item m-0">
                <div className="nft__item_wrap" >
                <Outer>
                    <span>
                        <img src={ship.img} className="lazy nft__item_preview" alt=""/>
                    </span>
                </Outer>
                </div>
                <div className="nft__item_info">
                    <span onClick={()=> openDetailShip(ship)}>
                        <h4>{ship.name}</h4>
                    </span>
                    <div className="nft__item_price">
                        Status: Idle
                    </div>
                    <div className="nft__item_action">
                        <span onClick={()=> openDetailShip(ship)}> {'Details' }</span>
                    </div>
                    <div className="nft__item_like">
                        Level: <span className='f7'>{ship.level}</span>
                    </div>                     
                </div> 
            </div>
        </div>             
    );
};

export default memo(ShipCard);