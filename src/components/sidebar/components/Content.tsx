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
  SkeletonText,
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

import SidebarMenuButton from '@/components/sidebar/components/SidebarMenuButton';

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
 *
 * @returns
 *    A menu button component, or an empty component if the current user
 *    does not have access to this route.
 */
function renderMenuButton(route: IRoute, idx: number, userRoles: Array<UserRole>) {

  // If the route requires a role but this user doesn't have any that match, return an empty element
  if (route.requiredRole && !hasAnyRole(route.requiredRole, new Set(userRoles))) {
    return (<></>)
  }

  return (
    <Box key={idx} mt="30px">
      <Link
        w="100%"
        color="sidebarLink.inactive"
        _hover = {{
          "color": "sidebarLink.focused",
        }}
      >
        <Flex align="center" w="100%">
          <Icon
            as={route.icon}
            width="24px"
            height="24px"
            me="12px"
          />
          <Text
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
  isLoaded?: boolean;
  width: string;
  [x: string]: any;
}


/* Primary Component */

function SidebarContent(props: SidebarContent) {

  /* Props */

  const { routes, isLoaded, width } = props;


  /* Styling */

  const shadowPillBar = useColorModeValue(
    '4px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'none',
  );


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
          <Links isLoaded={isLoaded} routes={routes} />
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
        <Text color="heading" fontSize="xs" fontWeight="600" me="10px" flexGrow={1}>
          { username }
        </Text>
        {/* End of User Icon and Name */}

        <SidebarMenuButton icon={MdOutlineSettings}>
          <SkeletonText isLoaded={isLoaded} noOfLines={3} spacing={4}>
            <Box>
              {
                !userRoles.length ? <></> :
                  <Text fontSize="sm">
                    You have {userRoles[0].article} {' '}
                    <Text as="b" color="text.emphasis">{userRoles[0].displayName}</Text> {' '}
                    account.
                  </Text>
              }
            </Box>
            {
              Object.values(MENU_ROUTES).map((route, idx) => renderMenuButton(route, idx, userRoles) )
            }
          </SkeletonText>
        </SidebarMenuButton>

        {/* Logout Button */}
        <SidebarMenuButton icon={FiLogOut} />

      </Flex>
      {/* End of User Account Bar */}

    </Flex>
  );
}

export default SidebarContent;
