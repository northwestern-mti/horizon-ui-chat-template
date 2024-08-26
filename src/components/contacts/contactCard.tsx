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
  description:  string,
  colorPalette: ColorPalette;
} & TextProps

export function ContactCard({ name, description, colorPalette, ...props }: ContactCardProps) {

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>{ name }</Heading>
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