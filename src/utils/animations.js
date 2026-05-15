import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Hook for scroll-triggered animations
export function useScrollAnimation() {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls };
}

// Counter animation component
export function CountUp({ end, duration = 2, suffix = '' }) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({
        count: end,
        transition: { duration, ease: 'easeOut' },
      });
    }
  }, [isInView, end, duration, controls]);

  return (
    <span ref={ref}>
      <motion.span
        initial={{ count: 0 }}
        animate={controls}
        onUpdate={(latest) => {
          if (ref.current) {
            ref.current.textContent = latest.count?.toFixed(2) + suffix;
          }
        }}
      >
        0{suffix}
      </motion.span>
    </span>
  );
}
