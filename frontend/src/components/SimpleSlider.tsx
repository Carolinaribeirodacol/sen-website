"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider({ children, className }: any) {

  const settings = {
    className,
    fade: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 14000,
    cssEase: "linear",
    adaptiveHeight: true,
    arrows: false
  };

  return (
    <div className="slider-container">
      <Slider
        {...settings}
      >
        {children}
      </Slider>
    </div>
  );
}