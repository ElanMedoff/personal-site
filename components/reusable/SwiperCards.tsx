import { twMerge as tm } from "tailwind-merge";
import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/effect-cards";

export function SwiperCards({
  slides,
  className,
  autoplay,
  rounded,
}: {
  slides: ReactNode[];
  className?: string;
  autoplay?: boolean;
  rounded?: boolean;
}) {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[Autoplay, EffectCards]}
      autoplay={
        autoplay
          ? {
              delay: 1500,
              disableOnInteraction: true,
            }
          : undefined
      }
      className={tm("ml-2 w-full mr-2", className)}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className={rounded ? "rounded-2xl" : ""}>
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
