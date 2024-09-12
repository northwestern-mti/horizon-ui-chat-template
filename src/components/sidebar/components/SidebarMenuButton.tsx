'use client';

// Chakra imports
import {
  Button,
  ButtonProps,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';

// React imports
import { IconType } from 'react-icons';



/* Type Interface */

interface SidebarMenuButton extends ButtonProps {
  icon:      IconType;
  diameter?: string;
  iconSize?: string;
}


/* Primary Component */

function SidebarMenuButton(props: SidebarMenuButton) {

  /* Props */

  const { children, icon } = props;

  const diameter = props?.diameter || "34px";
  const iconSize = props?.iconSize || `calc(${diameter} / 2)`;


  /* Styling */

  const bgColor = useColorModeValue('white', 'purple.700');
  const shadow  = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(12, 44, 55, 0.18)',
  );


  /* Define common button attributes */

  const buttonAttributes: ButtonProps = {
    "variant":        "transparent",
    "color":          "menuIcon.icon",
    "border":         "1px solid",
    "borderColor":    "menuIcon.border",
    "borderRadius":   "full",
    "w":              diameter,
    "h":              diameter,
    "minW":           diameter,
    "p":              "0px",
    "me":             "10px",
    "justifyContent": "center",
    "alignItems":     "center",
    "cursor":         "default",
  }

  const iconElement = (
    <Icon as={ icon } width={ iconSize } height={ iconSize } color="inherit" />
  );


  /* Main Component */

  return !children

    // If no children elements, just render as a button
    ? (
        <Button { ...buttonAttributes }>{ iconElement }</Button>
      )

    // If children elements, render as a menu button with a popup containing the children
    : (
        <Menu>

          {/* Menu Button */}
          <MenuButton as={Button} aria-label="" { ...buttonAttributes }>
            <Flex align="center" justifyContent="center">
              { iconElement }
            </Flex>
          </MenuButton>
          {/* End of Menu Button */}

          {/* Menu Popup */}
          <MenuList
            ms="-20px"
            pt="25px"
            pb="35px"
            px="20px"
            w="246px"
            borderRadius="16px"
            transform="translate(40px, -12px)!important"
            border="0px"
            boxShadow={shadow}
            bg={bgColor}
          >
            { children }
          </MenuList>
          {/* End of Menu Popup */}

        </Menu>
      )
}

export default SidebarMenuButton;
