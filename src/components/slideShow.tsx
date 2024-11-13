import React from "react";
import { Slide } from "react-slideshow-image";

const properties = {
  duration: 1000000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
};

const Slideshow = ({ slideImages }: any) => {
  return (
    <div className="SlideShow">
      <Slide {...properties}>
        {slideImages.map((slide: any) => (
          <div key={slide.caption} className="each-slide">
            <h3>{slide.caption}</h3>
            <div style={{ backgroundImage: `url(${slide.image})` }}></div>
            <p>{slide.description}</p>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
