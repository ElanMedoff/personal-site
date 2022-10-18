export const sharedVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
  },
};

const sharedVariantsWithDelay = {
  ...sharedVariants,
  show: {
    ...sharedVariants.show,
    transition: {
      delay: 0.7,
    },
  },
};

export const onScrollProps = {
  variants: sharedVariantsWithDelay,
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true },
};

const containerVariants = {
  ...sharedVariants,
  show: {
    ...sharedVariants.show,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

export const onScrollContainerProps = {
  variants: containerVariants,
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true },
};

export const onScrollChildProps = {
  variants: sharedVariants,
  viewport: { once: true },
};
