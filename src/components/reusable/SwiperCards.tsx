import "swiper/css";
import "swiper/css/effect-cards";
import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import { useHasRendered } from "src/hooks/useHasRendered";
import { VisuallyHidden } from "./VisuallyHidden";
import { cn } from "src/utils/style";

export function SwiperCards({
  slides,
  className,
  rounded,
}: {
  slides: ReactNode[];
  className?: string;
  autoplay?: boolean;
  rounded?: boolean;
}) {
  const hasRendered = useHasRendered();
  if (!hasRendered) return <div className="h-[700px]" />;

  const children = (
    <Swiper
      effect="cards"
      grabCursor={true}
      modules={[EffectCards]}
      className={cn("ml-2 w-full mr-2", className)}
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          key={index}
          className={cn(rounded ? "rounded-2xl" : "", "overflow-hidden")}
        >
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );

  // issues rendering the EffectCards module on the server
  // render as visually hidden on the server so it's still discoverable by bots, but won't mess up the first render
  if (hasRendered) return <>{children}</>;
  return <VisuallyHidden>{children}</VisuallyHidden>;
}
