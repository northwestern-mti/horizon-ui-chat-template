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

// React imports
import { MdPerson } from 'react-icons/md';



/*
 * Chat Message Component
 */

export type MessageProps = {
  message:       ChatMessage;
  colorPalettes: Record<string, ColorPalette>;
}

export function Message({ message, colorPalettes }: MessageProps) {

  const isUserMessage = message['name'] == 'Me';

  return (
    <Flex
      w="100%"
      direction={ isUserMessage ? 'row-reverse' : 'row' }
      mx="-20px"
    >
      <MessageIcon
        message      = { message }
        icon         = { MdPerson }
        colorPalette = { isUserMessage ? colorPalettes.messages_user : colorPalettes.messages_ai }
      />
      <MessageBox
        output       = { message['text'] }
        colorPalette = { isUserMessage ? colorPalettes.messages_user : colorPalettes.messages_ai }
      />
    </Flex>
  );
}



/* Export */
export default Message;
