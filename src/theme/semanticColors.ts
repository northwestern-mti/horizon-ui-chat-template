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

  // Route links in the sidebar
  sidebarLink: {
    active:   { default: "purple.500",     _dark: "white" },
    focused:  { default: "purple.400",     _dark: "purple.200" },
    inactive: { default: "gray.500",       _dark: "gray.500" },
    disabled: { default: "gray.500",       _dark: "gray.500" },
  },

  // Menu buttons in the sidebar
  menuIcon: {
    border:   { default: 'gray.200',       _dark: 'whiteAlpha.300' },
    icon:     { default: 'purple.700',     _dark: 'white' },
  },
}
