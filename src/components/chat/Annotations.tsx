'use client';

// Project imports
import { Character } from '@/types/types';

// Chakra imports
import {
  Text,
  TextProps,
} from '@chakra-ui/react';



/*
 * Now Typing Component
 */

export type NowTypingProps = {
  character: Character | string | null;
} & TextProps

export function NowTyping({ character, ...props }: NowTypingProps) {

  // If name is empty, no one is currently typing
  if (!character) {
    return <></>
  }

  // Make sure the character is a Character object
  character = Character(character);

  return (
    <Text
      as='i'
      color="text.annotation"
      fontWeight="500"
      fontSize="sm"
      textAlign={'left'}
      {...props}
    >
      { character.name_full } is typing...
    </Text>
  );
}



/*
 * Chat Beginning Component
 */

export type ChatBeginningProps = {
  characters: Character[];
} & TextProps

export function ChatBeginning({ characters, ...props }: ChatBeginningProps) {

  // If no characters listed, print a default message
  if (!characters || !characters.length) {
    return (
      <Text fontSize="xs" textAlign="center" color="text.annotation" {...props}>
        This is the beginning of your conversation.
      </Text>
    );
  }

  // Format the names with commas and "and"
  const formatted_names = (characters ?? [])
    .map<React.ReactNode>(
      (character) => <Text key={character.name_full} as="b">{character.name_full}</Text>
    )
    .reduce(
      (prev, curr, i) => [prev, (i >= (characters ?? []).length - 1) ? ' and ' : ', ', curr]
    )

  return (
    <Text fontSize="xs" textAlign="center" color="text.annotation" {...props}>
      This is the beginning of your conversation with { formatted_names }.
    </Text>
  );
}



/* Export */
export default {NowTyping, ChatBeginning};
