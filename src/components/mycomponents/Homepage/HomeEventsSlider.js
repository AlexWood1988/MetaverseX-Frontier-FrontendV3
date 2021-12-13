import React, { memo } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselCollection } from "../../components/constants";
import CustomSlide from "../../components/CustomSlide";
import HomeEvents from "../constants/homeEvents.json";

const HomeEventSlider = () => {
    const hotCollections = HomeEvents.events;

  return (
      <div className='nft'>
        <Slider {...carouselCollection}>
          { hotCollections.map((item, index) => (
            <CustomSlide
              key={index}
              index={index + 1}
              avatar={item.avatar}
              banner={item.banner}
              username={item.username}
              uniqueId={item.unique_id}
            />
          ))}
        </Slider>
      </div>
  );
}

export default memo(HomeEventSlider);
