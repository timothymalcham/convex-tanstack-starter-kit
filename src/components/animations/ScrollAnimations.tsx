/**
 * ScrollAnimations Components
 * 
 * Scroll-triggered animations using Motion's viewport detection.
 * Elements animate into view as they enter the viewport for engaging scrolling experiences.
 * 
 * @example Fade in from bottom:
 * ```jsx
 * <FadeInUp>
 *   <h2>This title fades in from bottom</h2>
 * </FadeInUp>
 * ```
 * 
 * @example Staggered list animation:
 * ```jsx
 * <StaggeredFadeIn staggerDelay={0.1}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </StaggeredFadeIn>
 * ```
 * 
 * @example Parallax effect:
 * ```jsx
 * <ParallaxElement speed={0.5}>
 *   <img src="background.jpg" alt="Background" />
 * </ParallaxElement>
 * ```
 * 
 * @example Scroll progress indicator:
 * ```jsx
 * <ScrollProgress />
 * ```
 */

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import * as React from "react";
import { scrollAnimations, transitions } from "~/utils/animations";

// === FADE IN ANIMATIONS ===

export interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
}

export function FadeInUp({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.6,
  once = true,
  margin = "0px 0px -100px 0px"
}: FadeInProps) {
  return (
    <motion.div
      initial={{ y: 32, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once, margin }}
      transition={{ 
        duration, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInDown({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.6,
  once = true,
  margin = "0px 0px -100px 0px"
}: FadeInProps) {
  return (
    <motion.div
      initial={{ y: -32, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once, margin }}
      transition={{ 
        duration, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInLeft({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.6,
  once = true,
  margin = "0px 0px -100px 0px"
}: FadeInProps) {
  return (
    <motion.div
      initial={{ x: -32, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once, margin }}
      transition={{ 
        duration, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInRight({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.6,
  once = true,
  margin = "0px 0px -100px 0px"
}: FadeInProps) {
  return (
    <motion.div
      initial={{ x: 32, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once, margin }}
      transition={{ 
        duration, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.6,
  once = true,
  margin = "0px 0px -100px 0px"
}: FadeInProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once, margin }}
      transition={{ 
        duration, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// === STAGGERED ANIMATIONS ===

export interface StaggeredFadeInProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  margin?: string;
}

export function StaggeredFadeIn({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
  margin = "0px 0px -100px 0px"
}: StaggeredFadeInProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once, margin }}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
          }}
          transition={transitions.smooth}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// === PARALLAX EFFECTS ===

export interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxElement({ 
  children, 
  speed = 0.5, 
  className 
}: ParallaxElementProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// === SCROLL PROGRESS INDICATOR ===

export interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
}

export function ScrollProgress({ 
  className = "fixed top-0 left-0 right-0 z-50",
  color = "bg-interactive-primary",
  height = 3
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`${color} origin-left ${className}`}
      style={{ 
        scaleX,
        height: `${height}px`,
      }}
    />
  );
}

// === REVEAL ON SCROLL ===

export interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export function RevealOnScroll({
  children,
  className,
  threshold = 0.1,
  triggerOnce = true,
}: RevealOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ 
        once: triggerOnce, 
        amount: threshold,
        margin: "0px 0px -100px 0px"
      }}
      transition={transitions.smooth}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// === SCROLL-TRIGGERED COUNTER ===

export interface ScrollCounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function ScrollCounter({
  from,
  to,
  duration = 2,
  className,
  suffix = "",
  prefix = "",
}: ScrollCounterProps) {
  const [count, setCount] = React.useState(from);
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => {
        const controls = motion.animate(from, to, {
          duration,
          onUpdate: (value: number) => setCount(Math.floor(value)),
        });
        return () => controls.stop();
      }}
      viewport={{ once: true }}
      className={className}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.div>
  );
}

// === TYPEWRITER EFFECT ===

export interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
}

export function Typewriter({
  text,
  delay = 0,
  speed = 50,
  className,
  showCursor = true,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, delay, speed, text]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </motion.span>
  );
}

// === MORPHING SHAPES ===

export interface MorphingShapeProps {
  shape1: string;
  shape2: string;
  className?: string;
  duration?: number;
}

export function MorphingShape({
  shape1,
  shape2,
  className,
  duration = 2,
}: MorphingShapeProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 100"
      whileInView={{
        d: [shape1, shape2, shape1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      viewport={{ once: false }}
    >
      <motion.path
        d={shape1}
        fill="currentColor"
      />
    </motion.svg>
  );
}

// === SCROLL-TRIGGERED SLIDE IN ===

export interface SlideInOnScrollProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export function SlideInOnScroll({
  children,
  direction = "up",
  distance = 50,
  duration = 0.6,
  delay = 0,
  className,
}: SlideInOnScrollProps) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const initial = { opacity: 0, ...directions[direction] };
  const animate = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// === FLOATING ELEMENTS ===

export interface FloatingElementProps {
  children: React.ReactNode;
  intensity?: number;
  speed?: number;
  className?: string;
}

export function FloatingElement({
  children,
  intensity = 10,
  speed = 4,
  className,
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-intensity, intensity, -intensity],
        x: [-intensity/2, intensity/2, -intensity/2],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}