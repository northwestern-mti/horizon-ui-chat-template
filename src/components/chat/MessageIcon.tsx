'use client';

// Project imports
import { ChatMessage, ColorPalette } from '@/types/types';

// Chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';



export type ChatMessageIconProps = {
  message:      ChatMessage;
  colorPalette: ColorPalette;
}

/*
 * Chat Message Component
 */
export function MessageIcon({ message, colorPalette, ...props }: ChatMessageIconProps) {

  return (
    <Flex
      direction="column"
      align="center"
      mx="20px"
      mt="8px"
      gap="2px"
    >

      {/* Icon */}
      <Flex
        borderRadius="full"
        justify="center"
        align="center"
        h="40px"
        w="40px"
        minH="40px"
        minW="40px"
        { ...props }
      >
        <Text
          color="white"
          fontWeight="600"
          fontSize={{ base: 'sm', md: 'md' }}
          lineHeight={{ base: '24px', md: '26px' }}
        >
          { message['name'].slice(0, 1) }
        </Text>
      </Flex>
      {/* /Icon */}

      {/* Name */}
      <Text
        color={ colorPalette.text }
        fontSize="x-small"
      >
        { message['name'] }
      </Text>
      {/* /Name */}

    </Flex>
  );
}

export default MessageIcon;
