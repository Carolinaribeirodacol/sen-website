"use client";

import React from "react";
import SliderComponent from "./Slider";
import Link from "next/link";

export default function CarouselComponent({ categories, className }: any) {
  return (
    <SliderComponent
      slidesToShow={3}
      slidesToScroll={3}
      fade={false}
      autoplay={true}
    >
      {categories.map((category: any) => (
        <div key={category.id} className="p-2 md:p-5 lg:p-5 xl:p-5">
          <div className="bg-white/70 rounded-lg p-2 md:p-5 lg:p-5 text-center">
            <h3 className="font-bold text-lg text-purple-950 line-clamp-1">{category.attributes.name}</h3>

            <SliderComponent
              slidesToShow={1}
              slidesToScroll={1}
              fade={true}
              autoplay={false}
              adaptiveHeight={true}
              arrows={false}
              dots={true}
            >
              {category.attributes.phrases.data.map((phrase: any) => (
                <div key={phrase.id} className="h-40 my-2 md:my-4 lg:my-4 xl:my-4">
                  <p  className="text-md line-clamp-4">
                    {phrase.attributes.content}
                  </p>

                  {phrase.attributes && phrase.attributes.author && (
                    <p className="text-sm">
                      - {phrase.attributes.author}
                    </p>
                  )}

                  {phrase.attributes.link ? (
                    <Link 
                      className="m-auto py-2 block rounded-full text-sm text-purple-900 hover:bg-gray-100/60" 
                      href={phrase.attributes.link}
                    >
                      Leia mais
                    </Link>
                  ) : null}
                </div>
              ))}
            </SliderComponent>
          </div>
        </div>
      ))}
    </SliderComponent>
  );
}
