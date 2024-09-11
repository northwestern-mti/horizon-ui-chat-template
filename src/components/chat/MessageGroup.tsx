'use client';

// Project imports
import MessageBox  from '@/components/chat/MessageBox';
import MessageIcon from '@/components/chat/MessageIcon';
import { ChatMessageGroup } from '@/types/types';

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

export type MessageGroupProps = {
  messages: ChatMessageGroup;
}

export function MessageGroup({ messages }: MessageGroupProps) {

  // Check whether the current speaker is the user
  const isUserMessage = messages.speaker.name == 'Me';

  return (
    <Flex
      w="100%"
      direction={ isUserMessage ? 'row-reverse' : 'row' }
      mx="-20px"
    >

      {/* Icon */}
      <MessageIcon
        character = { messages.speaker }
        icon      = { MdPerson }
      />
      {/* /Icon */}

      <Flex w="100%" direction="column" align={ isUserMessage ? "end" : "start" } gap="8px">

        {/* Character name */}
        <Text
          color    = "text.annotation"
          fontSize = "x-small"
          mx       = "8px"
        >
          { messages.speaker.name_full }
        </Text>
        {/* /Character Name */}

        {/* Message Text(s) */}
        {
          messages.messages.map((message, key) => 
            <MessageBox
              key      = { key }
              output   = { message }
              fromUser = { isUserMessage }
            />
          )
        }
        {/* /Message Text(s) */}

      </Flex>
    </Flex>
  );
}



/* Export */
export default MessageGroup;
