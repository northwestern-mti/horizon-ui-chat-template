'use client';

// Project imports
import MessageBox  from '@/components/chat/MessageBox';
import MessageIcon from '@/components/chat/MessageIcon';
import { ChatMessage, ColorPalette } from '@/types/types';

// Chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';



/*
 * Chat Message Component
 */

export type MessageProps = {
  message:      ChatMessage;
  colorPalette: ColorPalette;
}

export function Message({ message, colorPalette }: MessageProps) {

  const isUserMessage = message['name'] == 'Me';

  const iconProps =
    isUserMessage
      ? {
          bg: "transparent",
          border: "1px solid",
          borderColor: useColorModeValue('gray.200', 'whiteAlpha.200'),
        }
      : { 
          bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
        }

  const textProps =
    isUserMessage
      ? {
          bg: "transparent",
          border: "1px solid",
          borderColor: useColorModeValue('gray.200', 'whiteAlpha.200'),
        }
      : { 
          bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
        }

  return (
    <Flex
      w="100%"
      direction={ isUserMessage ? 'row-reverse' : 'row' }
      mx="-20px"
    >
      <MessageIcon
        message      = { message }
        colorPalette = { colorPalette }
        { ...iconProps }
      />
      <MessageBox
        output       = { message['text'] }
        colorPalette = { colorPalette }
        { ...textProps }
      />
    </Flex>
  );
}



/* Export */
export default Message;
