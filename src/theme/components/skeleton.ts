import { defineStyle, defineStyleConfig, cssVar } from '@chakra-ui/react'


// CSS vars for start and end color
const $startColor = cssVar('skeleton-start-color')
const $endColor   = cssVar('skeleton-end-color')


// Variant: NU Purple
const purple = defineStyle({
  _light: {
    [$startColor.variable]: 'colors.purple.400',
    [$endColor.variable]:   'colors.gray.200',
  },
  _dark: {
    [$startColor.variable]: 'colors.purple.800',
    [$endColor.variable]:   'colors.purple.600',
  },
})


// Export the theme
export const skeletonStyles = {
  components: {
    Skeleton: defineStyleConfig({
      variants: { purple },
      defaultProps: {
        variant: 'purple',
      },
    }),
  },
}
