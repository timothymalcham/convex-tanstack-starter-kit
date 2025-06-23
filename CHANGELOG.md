# CHANGELOG

## [Unreleased]

### Added
- Added Separator component to UI components library
  - Supports horizontal and vertical orientations
  - Uses @base-ui-components/react as base
  - Customizable with Tailwind CSS classes
- Added Slider component to UI components library
  - Built with @base-ui-components/react/slider
  - Includes default styling with Tailwind CSS
  - Exports sub-components for advanced customization
  - Supports custom class names for all parts (track, indicator, thumb, control)
- Added Switch component to UI components library
  - Built with @base-ui-components/react/switch
  - Features gradient background with smooth transitions
  - Supports dark mode styling
  - Customizable root and thumb class names
  - Exports sub-components for advanced usage
- Added Tabs component to UI components library
  - Built with @base-ui-components/react/tabs
  - Includes animated indicator with smooth transitions
  - Compound component pattern for easy usage
  - Accessible with proper focus management
  - Customizable class names for all sub-components
- Added Toast component using Sonner
  - Positioned at bottom-right by default
  - Multiple variants: default, success, info, warning, error, action
  - Supports descriptions and action buttons
  - Simple API with toast.success(), toast.error(), etc.
  - Includes utility functions for dismiss, loading, and promises
  - Integrated Toaster component into app root (replaced react-hot-toast)
  - Added useToast hook for React-friendly toast access (located in src/hooks/)