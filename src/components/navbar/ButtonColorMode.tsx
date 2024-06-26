'use client';

// Chakra Imports
import {
  Button,
  Icon,
} from '@chakra-ui/react';

// React imports
import React from 'react'
import { IoMdMoon, IoMdSunny } from 'react-icons/io';



export type ButtonColorModeProps = {
  onClick:   React.MouseEventHandler;
  color:     string;
  colorMode: string;
}

export default function ButtonColorMode({ onClick, color, colorMode }: ButtonColorModeProps) {
  return (
    <Button
      variant="no-hover"
      bg="transparent"
      p="0px"
      minW="unset"
      minH="unset"
      h="18px"
      w="max-content"
      onClick={onClick}
    >
      <Icon
        me="10px"
        h="18px"
        w="18px"
        color={color}
        as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
      />
    </Button>
  );
}
