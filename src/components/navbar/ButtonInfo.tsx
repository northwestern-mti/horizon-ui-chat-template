'use client';
// Chakra Imports
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdInfoOutline } from 'react-icons/md';



export default function ButtonInfo() {

  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.500', 'white');
  let menuBg = useColorModeValue('white', 'purple.800');
  const textColor = useColorModeValue('purple.700', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '0px 41px 75px #081132',
  );
  const buttonBg = useColorModeValue('transparent', 'purple.800');
  const hoverButton = useColorModeValue(
    { bg: 'gray.100' },
    { bg: 'whiteAlpha.100' },
  );
  const activeButton = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.200' },
  );

  return (
    <Menu>
      <MenuButton p="0px">
        <Icon
          mt="6px"
          as={MdInfoOutline}
          color={navbarIcon}
          w="18px"
          h="18px"
          me="10px"
        />
      </MenuButton>
      <MenuList
        boxShadow={shadow}
        p="20px"
        me={{ base: '30px', md: 'unset' }}
        borderRadius="20px"
        bg={menuBg}
        border="none"
        mt="22px"
        minW={{ base: 'unset' }}
        maxW={{ base: '360px', md: 'unset' }}
      >
        {/* <Flex bgImage={navImage} borderRadius="16px" mb="28px" alt="" /> */}
        <Flex flexDirection="column">
          <Link
            isExternal
            w="100%"
            href="https://horizon-ui.com/ai-template/"
          >
            <Button
              variant="primary"
              py="20px"
              px="16px"
              fontSize="sm"
              borderRadius="45px"
              mb="10px"
              w="100%"
              h="54px"
            >
              Buy Horizon AI Template
            </Button>
          </Link>
          <Link
            isExternal
            w="100%"
            href="https://horizon-ui.com/docs-ai-template/"
          >
            <Button
              bg={buttonBg}
              border="1px solid"
              color={textColor}
              mt={{ base: '20px', md: '0px' }}
              borderColor={useColorModeValue('gray.200', 'whiteAlpha.100')}
              fontSize="sm"
              borderRadius="45px"
              w="100%"
              minW="44px"
              h="44px"
              _placeholder={{ color: 'gray.500' }}
              _hover={hoverButton}
              _active={activeButton}
              _focus={activeButton}
            >
              See Documentation
            </Button>
          </Link>
          <Link
            w="100%"
            isExternal
            href="https://github.com/horizon-ui/chatgpt-ai-template"
          >
            <Button
              w="100%"
              h="44px"
              variant="no-hover"
              color={textColor}
              fontSize="sm"
              borderRadius="45px"
              bg="transparent"
            >
              Try Free Version
            </Button>
          </Link>
        </Flex>
      </MenuList>
    </Menu>
  );
}
