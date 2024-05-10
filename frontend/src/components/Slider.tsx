"use client";

import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderComponent({
  children,
  className,
  arrows = true,
  dots = false,
  slidesToShow,
  slidesToScroll,
  autoplay,
  adaptiveHeight = false,
  fade,
}: any) {
  const settings = {
    className,
    fade: fade,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    arrows,
    dots,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    autoplay: autoplay,
    autoplaySpeed: 14000,
    speed: 500,
    adaptiveHeight,
    waitForAnimate: false,
    appendDots: (dots: any) => (
      <div
        style={{
          bottom: "-10px",
        }}
      >
        <ul className="m-0">{dots}</ul>
      </div>
    ),
    customPaging: (i: any) => (
      <div
        style={{
          padding: '0.1rem',
          borderRadius: "9999px",
          backgroundColor: "#FFF",
          color: "rgb(88 28 135)",
          fontWeight: "bold",
          fontSize: "0.75rem",
          lineHeight: "1rem",
        }}
      >
        {i + 1}
      </div>
    ),
  };

  return (
    <div className="simple-slider">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
