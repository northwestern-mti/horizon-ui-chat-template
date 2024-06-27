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

import NavLink from '@/components/link/NavLink';



export default function ButtonUser() {

  // Chakra Color Mode
  let menuBg = useColorModeValue('white', 'purple.800');
  const textColor = useColorModeValue('purple.700', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '0px 41px 75px #081132',
  );

  return (
    <Menu>
      <MenuButton p="0px" style={{ position: 'relative' }}>
        <Box
          _hover={{ cursor: 'pointer' }}
          color="white"
          bg="#11047A"
          w="40px"
          h="40px"
          borderRadius={'50%'}
        />
        <Center top={0} left={0} position={'absolute'} w={'100%'} h={'100%'}>
          <Text fontSize={'xs'} fontWeight="bold" color={'white'}>
            AP
          </Text>
        </Center>
      </MenuButton>
      <MenuList
        boxShadow={shadow}
        p="0px"
        mt="10px"
        borderRadius="20px"
        bg={menuBg}
        border="none"
      >
        <Flex w="100%" mb="0px">
          <Text
            ps="20px"
            pt="16px"
            pb="10px"
            w="100%"
            borderBottom="1px solid"
            borderColor={borderColor}
            fontSize="sm"
            fontWeight="700"
            color={textColor}
          >
            👋&nbsp; Hey, User
          </Text>
        </Flex>
        <Flex flexDirection="column" p="10px">
          <NavLink href="/settings">
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              color={textColor}
              borderRadius="8px"
              px="14px"
            >
              <Text fontWeight="500" fontSize="sm">
                Profile Settings
              </Text>
            </MenuItem>
          </NavLink>
          <MenuItem
            _hover={{ bg: 'none' }}
            _focus={{ bg: 'none' }}
            color={textColor}
            borderRadius="8px"
            px="14px"
          >
            <Text fontWeight="500" fontSize="sm">
              Newsletter Settings
            </Text>
          </MenuItem>
          <MenuItem
            _hover={{ bg: 'none' }}
            _focus={{ bg: 'none' }}
            color="red.400"
            borderRadius="8px"
            px="14px"
          >
            <Text fontWeight="500" fontSize="sm">
              Log out
            </Text>
          </MenuItem>
        </Flex>
      </MenuList>
    </Menu>
  );
}
