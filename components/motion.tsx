'use client';

import Image from 'next/image';
import { motion, useInView, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Fade up on enter                                                     */
/* ------------------------------------------------------------------ */
export function FadeUp({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.7,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export const Reveal = FadeUp;

/* ------------------------------------------------------------------ */
/* Image reveal (clip-path wipe)                                        */
/* ------------------------------------------------------------------ */
export function RevealImage({
  children,
  className,
  direction = 'left',
  delay = 0,
  duration = 0.9,
}: {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up';
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const from =
    direction === 'left'
      ? 'inset(0 100% 0 0)'
      : direction === 'right'
        ? 'inset(0 0 0 100%)'
        : 'inset(0 0 100% 0)';

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: from }}
      whileInView={reduce ? undefined : { clipPath: 'inset(0 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Animated gold line                                                   */
/* ------------------------------------------------------------------ */
export function AnimatedLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={className}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      style={{ display: 'block', transformOrigin: 'left' }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Staggered container                                                  */
/* ------------------------------------------------------------------ */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Stagger({
  children,
  className,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : containerVariants}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? undefined : itemVariants}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax image (scroll driven, disabled for reduced motion)          */
/* ------------------------------------------------------------------ */
export function ParallaxImage({
  src,
  alt,
  className,
  sizes = '(max-width: 900px) 90vw, 45vw',
  speed = 60,
  priority = false,
  overlay = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  speed?: number;
  priority?: boolean;
  overlay?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div
        style={{
          position: 'absolute',
          inset: '-12%',
          ...(reduce ? {} : { y }),
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: 'cover' }}
        />
      </motion.div>
      {overlay && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(6,45,31,0) 40%, rgba(6,45,31,0.55))',
          }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Word-by-word reveal                                                  */
/* ------------------------------------------------------------------ */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) return <h2 className={className}>{text}</h2>;

  return (
    <motion.h2
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block', marginInlineEnd: '0.28em' }}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: '0%', opacity: 1, transition: { duration: 0.75, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

/* ------------------------------------------------------------------ */
/* Number counter                                                       */
/* ------------------------------------------------------------------ */
export function AnimatedCounter({
  to,
  duration = 1.8,
  prefix = '',
  suffix = '',
  className,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
