'use client';

// Project imports
import { Character } from '@/types/types';

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
  character?: Character | string;
  icon?:      IconType;
  diameter?:  string;
}

/*
 * Chat Message Component
 */
export function MessageIcon({ character, icon, diameter, ...props }: ChatMessageIconProps) {

  // Make sure the character is a Character object (or undefined)
  character = (character !== undefined) ? Character(character) : character;

  const iconStyle = character !== undefined ? (character.name == 'Me' ? 'user' : 'character') : 'character';

  diameter = diameter || "40px";

  const displayIcon = icon
    ? (
        <Icon
          as     = { icon }
          width  = {`calc(${diameter} - 20px)`}
          height = {`calc(${diameter} - 20px)`}
          color  = {`icon.${iconStyle}.text`}
        />
      )
    : (
        <Text
          color      = {`icon.${iconStyle}.text`}
          fontWeight = "600"
          fontSize   = {{ base: 'sm', md: 'md' }}
          lineHeight = {{ base: '24px', md: '26px' }}
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
        bg={`icon.${iconStyle}.fill`}
        border="1px solid"
        borderColor={`icon.${iconStyle}.border`}
        h    = {diameter}
        w    = {diameter}
        minH = {diameter}
        minW = {diameter}
        { ...props }
      >
        { displayIcon }
      </Flex>
      {/* /Icon */}

    </Flex>
  );
}

export default MessageIcon;
