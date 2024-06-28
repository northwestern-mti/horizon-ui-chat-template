'use client';

// Project imports
import { Character, ColorPalette } from '@/types/types';

// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

// React imports
import { IconType } from 'react-icons'



export type ChatMessageIconProps = {
  character?:   Character | string;
  icon?:        IconType;
  colorPalette: ColorPalette;
}

/*
 * Chat Message Component
 */
export function MessageIcon({ character, icon, colorPalette, ...props }: ChatMessageIconProps) {

  // Make sure the character is a Character object (or undefined)
  character = (character !== undefined) ? Character(character) : character;

  const displayIcon = icon
    ? (
        <Icon
          as={ icon }
          width="20px"
          height="20px"
          color={ colorPalette.icon_text }
        />
      )
    : (
        <Text
          color={ colorPalette.icon_text }
          fontWeight="600"
          fontSize={{ base: 'sm', md: 'md' }}
          lineHeight={{ base: '24px', md: '26px' }}
        >
          { character ? character.name.slice(0, 1) : '' }
        </Text>
      )

  return (
    <Flex
      direction="column"
      align="center"
      justify="end"
      mx="20px"
      mt="8px"
      gap="2px"
    >

      {/* Icon */}
      <Flex
        borderRadius="full"
        justify="center"
        align="center"
        bg={ colorPalette.icon_bg }
        border="1px solid"
        borderColor={ colorPalette.icon_border }
        h="40px"
        w="40px"
        minH="40px"
        minW="40px"
        { ...props }
      >
        { displayIcon }
      </Flex>
      {/* /Icon */}

    </Flex>
  );
}

export default MessageIcon;
