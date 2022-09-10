import cx from "classnames";
import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";

export default function Cards({ slides }: { slides: ReactNode[] }) {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="ml-2 max-w-[500px] w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="rounded-2xl">
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
