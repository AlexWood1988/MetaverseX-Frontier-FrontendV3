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


const PlanetCard = ({ planet, className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4', openDetailPlanet }) => {
    return (
        <div className={className}>
            <div className="nft__item m-0">
                <div className="nft__item_wrap" >
                <Outer>
                    <span>
                        <img src={planet.img} className="lazy nft__item_preview" alt=""/>
                    </span>
                </Outer>
                </div>
                <div className="nft__item_info">
                    <span onClick={()=> openDetailPlanet(planet)}>
                        <h4>{planet.name}</h4>
                    </span>
                    <div className="nft__item_price">
                        DNA: {planet.dna}
                    </div>
                    <div className="nft__item_action pb2">
                        <span onClick={()=> openDetailPlanet(planet)}> {'Details' }</span>
                    </div>
                    <div className="nft__item_like">
                        {planet.rarity}
                    </div>                
                </div> 
            </div>
        </div>             
    );
};

export default memo(PlanetCard);