'use client';

// Project imports
import MessageIcon from '@/components/chat/MessageIcon';
import { Character, ColorPalette } from '@/types/types';

// Chakra imports
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Text,
  TextProps,
} from '@chakra-ui/react';

import { MdPerson } from 'react-icons/md';



/*
 * Contact Card Component
 */

export type ContactCardProps = {
  // character:    Character | string | null;
  name:         string,
  nickname:     string,
  description:  string,
  colorPalette: ColorPalette;
} & TextProps

export function ContactCard({ name, nickname, description, colorPalette, ...props }: ContactCardProps) {

  return (
    <Card>

      <CardHeader>
        <Heading as="h4"
          size='md'
          color={colorPalette.text}
        >{ name }</Heading>
        <Text as="i"
          size="sm"
          color="gray.600"
        >"{ nickname }"</Text>
      </CardHeader>

      <CardBody pt="0px">

        <MessageIcon
          character    = ""
          icon         = {MdPerson}
          colorPalette = {colorPalette}
          diameter     = "60px"
        ></MessageIcon>

        <Text pt="20px" {...props}>
          { description }
        </Text>
      </CardBody>
    </Card>
  )
}