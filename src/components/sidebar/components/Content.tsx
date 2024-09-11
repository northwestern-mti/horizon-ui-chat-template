'use client';
// chakra imports
import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import NavLink from '@/components/link/NavLink';
//   Custom components
// import avatarNU from '/public/img/avatars/nu.png';
import { NextAvatar } from '@/components/image/Avatar';
import APIModal from '@/components/apiModal';
import Brand from '@/components/sidebar/components/Brand';
import Links from '@/components/sidebar/components/Links';
import SidebarCard from '@/components/sidebar/components/SidebarCard';
import { RoundedChart } from '@/components/icons/Icons';
import { PropsWithChildren } from 'react';
import { IRoute } from '@/types/navigation';
import { IoMdPerson } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import { LuHistory } from 'react-icons/lu';
import { MdOutlineManageAccounts, MdOutlineSettings } from 'react-icons/md';

// React imports
import { useEffect, useState } from 'react';

// Cookies
import { getCookie } from "cookies-next";

import { MENU_ROUTES } from '@/routes';
import { ColorPalette, UserRole } from '@/types/types';
import { parseRolesList, hasAnyRole } from '@/utils/roles';



/* Helper Functions */


/**
 * Optionally render a button link in the settings menu, based on the user's roles.
 *
 * @param route      The route object to render.
 * @param idx        The index in the list.
 * @param userRoles  A list of the current user's access roles.
 * @param colorPalette  Color palette to use for rendering.
 *
 * @returns
 *    A menu button component, or an empty component if the current user
 *    does not have access to this route.
 */
function renderMenuButton(route: IRoute, idx: number, userRoles: Array<UserRole>, colorPalette: ColorPalette) {

  // If the route requires a role but this user doesn't have any that match, return an empty element
  if (route.requiredRole && !hasAnyRole(route.requiredRole, new Set(userRoles))) {
    return (<></>)
  }

  return (
    <Box key={idx} mt="30px">
      <Link w="100%">
        <Flex align="center" w="100%">
          <Icon
            as={route.icon}
            width="24px"
            height="24px"
            color={colorPalette.text}
            me="12px"
          />
          <Text
            color={colorPalette.text}
            fontWeight="500"
            fontSize="sm"
          >
            {route.name}
          </Text>
        </Flex>
      </Link>
    </Box>
  );
}


/* Type Interface */

interface SidebarContent extends PropsWithChildren {
  routes: IRoute[][];
  width: string;
  [x: string]: any;
}


/* Primary Component */

function SidebarContent(props: SidebarContent) {

  /* Props */

  const { routes, width } = props;


  /* Styling */

  const textColor = useColorModeValue('purple.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
  const bgColor = useColorModeValue('white', 'purple.700');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(12, 44, 55, 0.18)',
  );
  const iconColor = useColorModeValue('purple.700', 'white');
  const shadowPillBar = useColorModeValue(
    '4px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'none',
  );
  const gray = useColorModeValue('gray.500', 'white');

  const colorPalette: ColorPalette = {
    'text': useColorModeValue('purple.700', 'white'),
  }


  /* Callbacks */

  // Retrieve user data from cookie
  const userData = JSON.parse( getCookie('userData') || '{}' )
  const userDataRoles = parseRolesList(userData.user_roles);

  // Load username from cookies
  // Fill as an effect to avoid hydration error
  const [ username, setUsername ] = useState<string>('');
  useEffect(() => {
    setUsername( (userData?.name_first || ['']).join(' ') )
  }, [ userData ])

  // Load user roles (i.e. permissions) from the user data cookie
  const [ userRoles, setUserRoles ] = useState<Array<UserRole>>([]);
  useEffect(() => { setUserRoles( [...userDataRoles] ) }, [])


  /* Component(s) */

  return (
    <Flex
      direction="column"
      height="100%"
      pt="20px"
      pb="26px"
      borderRadius="30px"
      maxW={ width }
      px="20px"
    >

      {/* Logo */}
      <Brand />

      {/* Main Links */}
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="0px" pe={{ md: '0px', '2xl': '0px' }}>
          <Links routes={routes} />
        </Box>
      </Stack>

      {/* User Account Bar */}
      <Flex
        mt="8px"
        justifyContent="center"
        alignItems="center"
        boxShadow={shadowPillBar}
        borderRadius="30px"
        p="14px"
      >

        {/* User Icon and Name */}
        {/* <NextAvatar h="34px" w="34px" src={avatarNU} me="10px" /> */}
        <Text color={textColor} fontSize="xs" fontWeight="600" me="10px" flexGrow={1}>
          { username }
        </Text>
        {/* End of User Icon and Name */}


        {/* Settings Menu */}
        <Menu>

          {/* Settings Menu Button */}
          <MenuButton
            as={Button}
            variant="transparent"
            aria-label=""
            border="1px solid"
            borderColor={borderColor}
            borderRadius="full"
            w="34px"
            h="34px"
            px="0px"
            p="0px"
            minW="34px"
            me="10px"
            justifyContent={'center'}
            alignItems="center"
            color={iconColor}
          >
            <Flex align="center" justifyContent="center">
              <Icon
                as={MdOutlineSettings}
                width="18px"
                height="18px"
                color="inherit"
              />
            </Flex>
          </MenuButton>
          {/* End of Settings Menu Button */}

          {/* Settings Menu Popup */}
          <MenuList
            ms="-20px"
            pt="25px"
            pb="35px"
            px="20px"
            w="246px"
            borderRadius="16px"
            transform="translate(40px, -12px)!important"
            border="0px"
            boxShadow={shadow}
            bg={bgColor}
          >
            <Box>
                {
                  !userRoles.length ? <></> :
                    <Text fontSize="sm">
                      You have {userRoles[0].article} {' '}
                      <Text as="b" color={colorPalette.text}>{userRoles[0].displayName}</Text> {' '}
                      account.
                    </Text>
                }
            </Box>
            {
              Object.values(MENU_ROUTES).map((route, idx) =>
                renderMenuButton(route, idx, userRoles, colorPalette)
              )
            }
          </MenuList>
          {/* End of Settings Menu Popup */}

        </Menu>
        {/* End of Settings Menu */}


        {/* Logout Button */}
        <Button
          variant="transparent"
          border="1px solid"
          borderColor={borderColor}
          borderRadius="full"
          w="34px"
          h="34px"
          px="0px"
          minW="34px"
          justifyContent={'center'}
          alignItems="center"
        >
          <Icon as={FiLogOut} width="16px" height="16px" color="inherit" />
        </Button>
        {/* End of Logout Button */}

      </Flex>
      {/* End of User Account Bar */}

    </Flex>
  );
}

export default SidebarContent;
