'use client';

// Project imports
import MessageBox  from '@/components/chat/MessageBox';
import MessageIcon from '@/components/chat/MessageIcon';
import { Character, ChatMessage, ColorPalette } from '@/types/types';

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
  characters:    Character[];
  colorPalettes: Record<string, ColorPalette>;
}

export function Message({ message, characters, colorPalettes }: MessageProps) {

  const isUserMessage = message['name'] == 'Me';

  // Find the character with the matching name
  // TODO: Just pass the speaking character to this function. Return from the API, or lookup outside this component?
  const character = message['name'] == 'Me' ? null : characters.filter(c => c.name == message['name'])[0]

  return (
    <Flex
      w="100%"
      direction={ isUserMessage ? 'row-reverse' : 'row' }
      mx="-20px"
    >

      {/* Icon */}
      <MessageIcon
        message      = { message }
        icon         = { MdPerson }
        colorPalette = { isUserMessage ? colorPalettes.messages_user : colorPalettes.messages_ai }
      />
      {/* /Icon */}

      <Flex w="100%" direction="column" align={ isUserMessage ? "end" : "start" }>

        {/* Character name */}
        <Text
          color={ colorPalettes.annotations.text }
          fontSize="x-small"
          mx="8px"
        >
          { isUserMessage ? 'Me' : (character ? character.name_full : message['name']) }
        </Text>
        {/* /Character Name */}

        {/* Message Text */}
        <MessageBox
          output       = { message['text'] }
          colorPalette = { isUserMessage ? colorPalettes.messages_user : colorPalettes.messages_ai }
        />
        {/* /Message Text */}

      </Flex>
    </Flex>
  );
}



/* Export */
export default Message;
