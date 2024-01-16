const sharedVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
  },
};

export const generateOnScrollProps = {
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
};

export const onScrollContainerProps = {
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
};

export const onScrollChildProps = {
  variants: sharedVariants,
  viewport: { once: true },
  transition: { duration: 0.3 },
};
