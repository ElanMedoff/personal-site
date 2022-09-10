import { twMerge as tm } from "tailwind-merge";
import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";

export default function Cards({
  slides,
  maxWidth,
}: {
  slides: ReactNode[];
  maxWidth: number;
}) {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className={tm("ml-2 w-full", `max-w-[${maxWidth}px]`)}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="rounded-2xl">
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
