import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Container Component
 * 
 * Responsive container that constrains content width and provides consistent padding.
 * Adapts to different screen sizes with proper breakpoints.
 * 
 * @example Basic usage:
 * ```jsx
 * <Container>
 *   <h1>Page Title</h1>
 *   <p>Page content goes here...</p>
 * </Container>
 * ```
 * 
 * @example Different sizes:
 * ```jsx
 * // Small container (max 640px)
 * <Container size="sm">
 *   <article>...</article>
 * </Container>
 * 
 * // Full width container
 * <Container size="full">
 *   <div>...</div>
 * </Container>
 * ```
 * 
 * @example With custom padding:
 * ```jsx
 * <Container padding="none">
 *   <img src="..." className="w-full" />
 * </Container>
 * ```
 */

export interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  size = 'xl',
  padding = 'md',
  className,
  as: Component = 'div',
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
  };

  return (
    <Component
      className={twMerge(
        "mx-auto w-full",
        sizeClasses[size],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Stack Component
 * 
 * Vertical or horizontal stack layout with consistent spacing.
 * 
 * @example Vertical stack:
 * ```jsx
 * <Stack spacing="lg">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Stack>
 * ```
 * 
 * @example Horizontal stack:
 * ```jsx
 * <Stack direction="horizontal" spacing="md" align="center">
 *   <Avatar />
 *   <div>
 *     <h3>User Name</h3>
 *     <p>user@example.com</p>
 *   </div>
 * </Stack>
 * ```
 */

export interface StackProps {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  className?: string;
  as?: React.ElementType;
}

export function Stack({
  children,
  direction = 'vertical',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  as: Component = 'div',
}: StackProps) {
  const directionClasses = {
    vertical: 'flex-col',
    horizontal: 'flex-row',
  };

  const spacingClasses = {
    none: '',
    xs: direction === 'vertical' ? 'space-y-1' : 'space-x-1',
    sm: direction === 'vertical' ? 'space-y-2' : 'space-x-2',
    md: direction === 'vertical' ? 'space-y-4' : 'space-x-4',
    lg: direction === 'vertical' ? 'space-y-6' : 'space-x-6',
    xl: direction === 'vertical' ? 'space-y-8' : 'space-x-8',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  return (
    <Component
      className={twMerge(
        "flex",
        directionClasses[direction],
        spacingClasses[spacing],
        alignClasses[align],
        justifyClasses[justify],
        wrap && 'flex-wrap',
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Grid Component
 * 
 * Responsive grid layout with automatic columns and gaps.
 * 
 * @example Basic grid:
 * ```jsx
 * <Grid cols={3} gap="md">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 * ```
 * 
 * @example Responsive grid:
 * ```jsx
 * <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="lg">
 *   {items.map(item => (
 *     <Card key={item.id}>{item.name}</Card>
 *   ))}
 * </Grid>
 * ```
 */

export interface GridProps {
  children: React.ReactNode;
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  as?: React.ElementType;
}

export function Grid({
  children,
  cols = 1,
  gap = 'md',
  className,
  as: Component = 'div',
}: GridProps) {
  const gapClasses = {
    none: '',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  let colClasses = '';
  
  if (typeof cols === 'number') {
    colClasses = `grid-cols-${cols}`;
  } else {
    const responsiveCols = [];
    if (cols.sm) responsiveCols.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) responsiveCols.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) responsiveCols.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) responsiveCols.push(`xl:grid-cols-${cols.xl}`);
    colClasses = responsiveCols.join(' ');
  }

  return (
    <Component
      className={twMerge(
        "grid",
        colClasses,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Section Component
 * 
 * Page section with consistent spacing and optional background.
 * 
 * @example Basic section:
 * ```jsx
 * <Section>
 *   <h2>Section Title</h2>
 *   <p>Section content...</p>
 * </Section>
 * ```
 * 
 * @example With background:
 * ```jsx
 * <Section background="muted" size="lg">
 *   <Container>
 *     <h2>Featured Content</h2>
 *     <Grid cols={3}>...</Grid>
 *   </Container>
 * </Section>
 * ```
 */

export interface SectionProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'muted' | 'accent';
  className?: string;
  as?: React.ElementType;
}

export function Section({
  children,
  size = 'md',
  background = 'default',
  className,
  as: Component = 'section',
}: SectionProps) {
  const sizeClasses = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-20',
    xl: 'py-20 sm:py-24',
  };

  const backgroundClasses = {
    default: '',
    muted: 'bg-surface-secondary',
    accent: 'bg-surface-accent',
  };

  return (
    <Component
      className={twMerge(
        sizeClasses[size],
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Columns Component
 * 
 * Multi-column layout with responsive behavior.
 * 
 * @example Two columns:
 * ```jsx
 * <Columns cols={2} gap="lg">
 *   <div>Left column content</div>
 *   <div>Right column content</div>
 * </Columns>
 * ```
 * 
 * @example Responsive columns:
 * ```jsx
 * <Columns cols={{ sm: 1, lg: 2 }} gap="xl">
 *   <div>Main content</div>
 *   <div>Sidebar content</div>
 * </Columns>
 * ```
 */

export interface ColumnsProps {
  children: React.ReactNode;
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Columns({
  children,
  cols = 2,
  gap = 'md',
  className,
}: ColumnsProps) {
  const gapClasses = {
    none: '',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  let colClasses = '';
  
  if (typeof cols === 'number') {
    colClasses = `columns-${cols}`;
  } else {
    const responsiveCols = [];
    if (cols.sm) responsiveCols.push(`sm:columns-${cols.sm}`);
    if (cols.md) responsiveCols.push(`md:columns-${cols.md}`);
    if (cols.lg) responsiveCols.push(`lg:columns-${cols.lg}`);
    if (cols.xl) responsiveCols.push(`xl:columns-${cols.xl}`);
    colClasses = responsiveCols.join(' ');
  }

  return (
    <div
      className={twMerge(
        colClasses,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Center Component
 * 
 * Centers content both horizontally and vertically.
 * 
 * @example
 * ```jsx
 * <Center minHeight="screen">
 *   <Card>
 *     <h1>Welcome</h1>
 *     <p>This content is perfectly centered</p>
 *   </Card>
 * </Center>
 * ```
 */

export interface CenterProps {
  children: React.ReactNode;
  minHeight?: string | 'screen' | 'full';
  className?: string;
}

export function Center({
  children,
  minHeight,
  className,
}: CenterProps) {
  const minHeightClass = minHeight === 'screen' 
    ? 'min-h-screen' 
    : minHeight === 'full'
    ? 'min-h-full'
    : '';

  return (
    <div
      className={twMerge(
        "flex items-center justify-center",
        minHeightClass,
        className
      )}
      style={minHeight && minHeight !== 'screen' && minHeight !== 'full' ? { minHeight } : undefined}
    >
      {children}
    </div>
  );
}