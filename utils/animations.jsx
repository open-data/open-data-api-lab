import { stagger } from 'motion/react';

export const staggerAnimationWrapper = {
  hidden: {
    transition: {
      delayChildren: stagger(0.325, {
        from: 'last',
      }),
    },
  },
  show: {
    transition: {
      delayChildren: stagger(0.325, {
        from: 'first',
      }),
    },
  },
};

export const animationWrapper = {
  hidden: {
    transition: {
      delayChildren: stagger(0.0, {
        startDelay: 0.45,
        from: 'last',
      }),
    },
  },
  show: {
    transition: {
      delayChildren: stagger(0.0, {
        startDelay: 0.45,
        from: 'first',
      }),
    },
  },
};

export const splashTextAnimation = {
  hidden: {
    y: 60,
    opacity: 0,
    filter: 'blur(5px)',
    scale: 0.98,
  },
  show: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 28,
      mass: 0.9,
    },
  },
};

export const slideInRightAnimationWrapper = {
  hidden: {
    transition: {
      delayChildren: stagger(0.325, {
        from: 'last',
      }),
    },
  },
  show: {
    transition: {
      delayChildren: stagger(0.325, {
        from: 'first',
      }),
    },
  },
};

export const slideInRightAnimation = {
  hidden: {
    x: '100%',
    opacity: 0,
    filter: 'blur(5px)',
    scale: 0.98,
  },
  show: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 25,
      mass: 1.2,
    },
  },
};

export const slideInLeftAnimation = {
  hidden: {
    x: '-100%',
    opacity: 0,
    filter: 'blur(5px)',
    scale: 0.98,
  },
  show: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 25,
      mass: 1.2,
    },
  },
};
