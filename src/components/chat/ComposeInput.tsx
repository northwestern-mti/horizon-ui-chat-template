'use client';

// Project imports
import { ColorPalette } from '@/types/types';

// Chakra imports
import {
  Button,
  Flex,
  Icon,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';

// React imports
import { MdSend } from 'react-icons/md';



/*
 * Compose Input Component
 */

export type ComposeInputProps = {
  placeholderText?: string;
  onChange:         any;
  onSubmit:         any;
  loading:          boolean;
  colorPalette:     ColorPalette;
}

export function ComposeInput({placeholderText, onChange, onSubmit, loading, colorPalette}: ComposeInputProps) {

  if (!placeholderText) placeholderText = "Type your message here..."

  return (
    <Flex>
      <Input
        minH="54px"
        h="100%"
        border="1px solid"
        borderColor={ colorPalette.border }
        borderRadius="45px"
        p="15px 20px"
        me="10px"
        fontSize="sm"
        fontWeight="500"
        _focus={{ borderColor: 'none' }}
        color={ colorPalette.text }
        _placeholder={{ color: colorPalette.placeholder }}
        placeholder={placeholderText}
        onChange={onChange}
      />
      <Button
        variant="primary"
        py="20px"
        px="16px"
        fontSize="sm"
        borderRadius="45px"
        ms="auto"
        w={{ base: '80px', md: '120px' }}
        h="54px"
        _hover={{
          boxShadow:
            '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
          bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
          _disabled: {
            bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
          },
        }}
        onClick={onSubmit}
        isLoading={loading ? true : false}
      >
        {/* Submit */}
        <Icon
          as={MdSend}
          width="24px"
          height="24px"
        />
      </Button>
    </Flex>
  )
}



/* Export */
export default ComposeInput;
