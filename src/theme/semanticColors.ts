export const semanticColors = {

  // Heading colors
  heading: {
    default: 'purple.700',
    _dark:   'purple.300',
  },

  // Content text
  text: {
    emphasis:   { default: 'purple.700',     _dark: 'purple.300' },
    annotation: { default: 'gray.500',       _dark: 'white'      },
  },

  // Character / user icons
  icon: {
    character: {
      fill:   "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
      border: "transparent",
      text:   "white",
    },
    user: {
      fill:   "transparent",
      border: { default: "gray.200",       _dark: "whiteAlpha.600" },
      text:   { default: "brand.500",      _dark: "white" },
    },
  },

  // Message bubbles for AI character & user
  message: {
    character: {
      bg:   { default: "white",          _dark: "purple.800" },
      text: { default: "purple.700",     _dark: "white" },
    },
    user: {
      bg:   { default: "purple.100",     _dark: "purple.100" },
      text: { default: "purple.700",     _dark: "purple.700" },
    },
  },
}
