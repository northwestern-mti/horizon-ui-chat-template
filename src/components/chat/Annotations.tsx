'use client';

// Project imports
import { ColorPalette } from '@/types/types';

// Chakra imports
import {
  Text,
  TextProps,
} from '@chakra-ui/react';



/*
 * Now Typing Component
 */

export type NowTypingProps = {
  name:         string;
  colorPalette: ColorPalette;
} & TextProps

export function NowTyping({ name, colorPalette, ...props }: NowTypingProps) {

  // If name is empty, no one is currently typing
  if (!name) {
    return <></>
  }

  return (
    <Text
      as='i'
      color={colorPalette.text}
      fontWeight="500"
      fontSize="sm"
      textAlign={'left'}
      {...props}
    >
      { name } is typing...
    </Text>
  );
}



/*
 * Chat Beginning Component
 */

export type ChatBeginningProps = {
  names:        string[];
  colorPalette: ColorPalette;
} & TextProps

export function ChatBeginning({ names, colorPalette, ...props }: ChatBeginningProps) {

  // Format the names with commas and "and"
  const formatted_names = names
    .map<React.ReactNode>(
      (name) => <Text as="b">{name}</Text>
    )
    .reduce(
      (prev, curr, i) => [prev, (i >= names.length - 1) ? ' and ' : ', ', curr]
    )

  return (
    <Text fontSize="xs" textAlign="center" color={colorPalette.text} {...props}>
      This is the beginning of your conversation with { formatted_names }.
    </Text>
  );
}



/* Export */
export default {NowTyping, ChatBeginning};
