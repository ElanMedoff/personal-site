export const sharedVariants = {
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
          delay: delay ?? 0.6,
        },
      },
    },
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true },
  };
};

const containerVariants = {
  ...sharedVariants,
  show: {
    ...sharedVariants.show,
    transition: {
      delay: 0.6,
      staggerChildren: 0.4,
      when: "beforeChildren",
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
