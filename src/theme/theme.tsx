import { extendTheme, HTMLChakraProps, ThemingProps } from '@chakra-ui/react';
import { CardComponent } from './additions/card/card';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { inputStyles } from './components/input';
import { progressStyles } from './components/progress';
import { skeletonStyles } from './components/skeleton';
import { textareaStyles } from './components/textarea';
import { switchStyles } from './components/switch';
import { linkStyles } from './components/link';
import { globalStyles } from './styles';
import { semanticColors } from './semanticColors';

export default extendTheme(

  // Theme-specific global styling
  globalStyles,

  // Theme-specific styling for component types
  badgeStyles,
  buttonStyles,
  linkStyles,
  progressStyles,
  skeletonStyles,
  inputStyles,
  textareaStyles,
  switchStyles,
  CardComponent,

  // Theme-specific semantic color tokens
  {
    semanticTokens: {
      colors: semanticColors,
    },
  },
);

export interface CustomCardProps extends HTMLChakraProps<'div'>, ThemingProps {}
