import { isVisualRegressionTest } from "src/utils/env";

export const createMotionProps = <Obj>(props: Obj) => {
  return isVisualRegressionTest() ? ({} as Obj) : props;
};

const sharedVariants = createMotionProps({
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
  },
});

export const generateOnScrollProps = createMotionProps({
  variants: {
    ...sharedVariants,
    show: {
      ...sharedVariants.show,
      transition: {
        delay: 0.2,
        duration: 0.3,
      },
    },
  },
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true },
});

export const onScrollContainerProps = createMotionProps({
  variants: {
    ...sharedVariants,
    show: {
      ...sharedVariants.show,
      transition: {
        delay: 0.2,
        staggerChildren: 0.3,
        when: "beforeChildren",
        duration: 0.3,
      },
    },
  },
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true },
});

export const onScrollChildProps = createMotionProps({
  variants: sharedVariants,
  viewport: { once: true },
  transition: { duration: 0.3 },
});
