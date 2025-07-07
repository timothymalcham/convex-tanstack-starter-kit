/**
 * GestureHandling Components
 * 
 * Touch and mouse gesture interactions using Motion for mobile-friendly experiences.
 * Includes swipe, drag, pinch, and other gesture patterns.
 * 
 * @example Swipe to dismiss:
 * ```jsx
 * <SwipeToDismiss onDismiss={() => console.log('dismissed')}>
 *   <Card>Swipe me away</Card>
 * </SwipeToDismiss>
 * ```
 * 
 * @example Draggable card:
 * ```jsx
 * <DraggableCard>
 *   <div>Drag me around</div>
 * </DraggableCard>
 * ```
 * 
 * @example Pull to refresh:
 * ```jsx
 * <PullToRefresh onRefresh={handleRefresh}>
 *   <div>Pull down to refresh</div>
 * </PullToRefresh>
 * ```
 */

import { motion, PanInfo, useMotionValue, useTransform } from "motion/react";
import * as React from "react";
import { transitions } from "~/utils/animations";

// === SWIPE TO DISMISS ===

export interface SwipeToDismissProps {
  children: React.ReactNode;
  onDismiss?: () => void;
  threshold?: number;
  direction?: "left" | "right" | "both";
  className?: string;
  disabled?: boolean;
}

export function SwipeToDismiss({
  children,
  onDismiss,
  threshold = 100,
  direction = "both",
  className,
  disabled = false,
}: SwipeToDismissProps) {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-threshold, 0, threshold], [0.5, 1, 0.5]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const shouldDismiss = 
      (direction === "left" && info.offset.x < -threshold) ||
      (direction === "right" && info.offset.x > threshold) ||
      (direction === "both" && Math.abs(info.offset.x) > threshold);

    if (shouldDismiss && onDismiss) {
      onDismiss();
    }
  };

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ x, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 0.95 }}
      transition={transitions.smooth}
    >
      {children}
    </motion.div>
  );
}

// === DRAGGABLE CARD ===

export interface DraggableCardProps {
  children: React.ReactNode;
  className?: string;
  constrainToParent?: boolean;
  onDragStart?: () => void;
  onDragEnd?: (info: PanInfo) => void;
  snapBack?: boolean;
}

export function DraggableCard({
  children,
  className,
  constrainToParent = true,
  onDragStart,
  onDragEnd,
  snapBack = true,
}: DraggableCardProps) {
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <motion.div
      className={className}
      drag
      dragConstraints={constrainToParent ? { left: 0, right: 0, top: 0, bottom: 0 } : undefined}
      dragElastic={0.1}
      whileDrag={{ 
        scale: 0.95, 
        zIndex: 999,
        cursor: "grabbing"
      }}
      onDragStart={() => {
        setIsDragging(true);
        onDragStart?.();
      }}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        onDragEnd?.(info);
      }}
      animate={snapBack && !isDragging ? { x: 0, y: 0 } : undefined}
      transition={transitions.smooth}
      style={{ cursor: "grab" }}
    >
      {children}
    </motion.div>
  );
}

// === PULL TO REFRESH ===

export interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh?: () => void;
  threshold?: number;
  className?: string;
  refreshIndicator?: React.ReactNode;
}

export function PullToRefresh({
  children,
  onRefresh,
  threshold = 80,
  className,
  refreshIndicator,
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const y = useMotionValue(0);
  const pullProgress = useTransform(y, [0, threshold], [0, 1]);

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > threshold && onRefresh) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
  };

  return (
    <motion.div className={className}>
      {/* Refresh Indicator */}
      <motion.div
        className="flex justify-center items-center h-16"
        style={{ 
          opacity: pullProgress,
          scale: pullProgress,
        }}
      >
        {refreshIndicator || (
          <motion.div
            animate={isRefreshing ? { rotate: 360 } : {}}
            transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
            className="w-6 h-6 border-2 border-interactive-primary border-t-transparent rounded-full"
          />
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        whileDrag={{ cursor: "grabbing" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// === LONG PRESS ===

export interface LongPressProps {
  children: React.ReactNode;
  onLongPress?: () => void;
  duration?: number;
  className?: string;
}

export function LongPress({
  children,
  onLongPress,
  duration = 500,
  className,
}: LongPressProps) {
  const [isPressed, setIsPressed] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleTapStart = () => {
    setIsPressed(true);
    timeoutRef.current = setTimeout(() => {
      onLongPress?.();
    }, duration);
  };

  const handleTapEnd = () => {
    setIsPressed(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <motion.div
      className={className}
      onTapStart={handleTapStart}
      onTap={handleTapEnd}
      onTapCancel={handleTapEnd}
      whileTap={{ scale: 0.95 }}
      animate={isPressed ? { scale: 0.98 } : { scale: 1 }}
      transition={transitions.fast}
    >
      {children}
    </motion.div>
  );
}

// === SWIPE NAVIGATION ===

export interface SwipeNavigationProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  className?: string;
}

export function SwipeNavigation({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  className,
}: SwipeNavigationProps) {
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -threshold && onSwipeLeft) {
      onSwipeLeft();
    } else if (info.offset.x > threshold && onSwipeRight) {
      onSwipeRight();
    }
  };

  return (
    <motion.div
      className={className}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 0.98 }}
      transition={transitions.smooth}
    >
      {children}
    </motion.div>
  );
}

// === PINCH TO ZOOM ===

export interface PinchToZoomProps {
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  className?: string;
}

export function PinchToZoom({
  children,
  minScale = 0.5,
  maxScale = 3,
  className,
}: PinchToZoomProps) {
  const [scale, setScale] = React.useState(1);

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    const delta = event.deltaY * -0.001;
    const newScale = Math.min(maxScale, Math.max(minScale, scale + delta));
    setScale(newScale);
  };

  return (
    <motion.div
      className={className}
      style={{ scale }}
      onWheel={handleWheel}
      animate={{ scale }}
      transition={transitions.fast}
    >
      {children}
    </motion.div>
  );
}

// === SHAKE GESTURE ===

export interface ShakeGestureProps {
  children: React.ReactNode;
  onShake?: () => void;
  intensity?: number;
  className?: string;
}

export function ShakeGesture({
  children,
  onShake,
  intensity = 10,
  className,
}: ShakeGestureProps) {
  const [isShaking, setIsShaking] = React.useState(false);

  const triggerShake = () => {
    setIsShaking(true);
    onShake?.();
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <motion.div
      className={className}
      animate={isShaking ? {
        x: [-intensity, intensity, -intensity, intensity, 0],
        transition: { duration: 0.5 }
      } : {}}
      onDoubleClick={triggerShake}
    >
      {children}
    </motion.div>
  );
}

// === FLIP CARD ===

export interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  trigger?: "click" | "hover";
}

export function FlipCard({
  front,
  back,
  className,
  trigger = "click",
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleFlip = () => {
    if (trigger === "click") {
      setIsFlipped(!isFlipped);
    }
  };

  const handleHover = () => {
    if (trigger === "hover") {
      setIsFlipped(true);
    }
  };

  const handleHoverEnd = () => {
    if (trigger === "hover") {
      setIsFlipped(false);
    }
  };

  return (
    <motion.div
      className={`relative ${className}`}
      onClick={handleFlip}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={transitions.smooth}
    >
      {/* Front */}
      <motion.div
        className="absolute inset-0"
        style={{ backfaceVisibility: "hidden" }}
      >
        {front}
      </motion.div>

      {/* Back */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          backfaceVisibility: "hidden", 
          transform: "rotateY(180deg)" 
        }}
      >
        {back}
      </motion.div>
    </motion.div>
  );
}

// === MAGNETIC BUTTON ===

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setMousePosition({
      x: (event.clientX - centerX) * strength,
      y: (event.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={transitions.smooth}
    >
      {children}
    </motion.div>
  );
}