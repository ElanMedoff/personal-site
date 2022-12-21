const sharedVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
  },
};

export const generateOnScrollProps = (delay?: number) => {
  return {
    variants: {
      ...sharedVariants,
      show: {
        ...sharedVariants.show,
        transition: {
          delay: delay ?? 0.2,
        },
      },
    },
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true },
  };
};

export const onScrollContainerProps = {
  variants: {
    ...sharedVariants,
    show: {
      ...sharedVariants.show,
      transition: {
        delay: 0.2,
        staggerChildren: 0.4,
        when: "beforeChildren",
      },
    },
  },
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true },
};

export const onScrollChildProps = {
  variants: sharedVariants,
  viewport: { once: true },
};
