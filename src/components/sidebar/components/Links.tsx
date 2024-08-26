'use client';
/* eslint-disable */

// chakra imports
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  HStack,
  Text,
  List,
  Icon,
  ListItem,
  VStack,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { PiArrowElbowDownRight } from "react-icons/pi";
import NavLink from '@/components/link/NavLink';
import { HSeparator } from '@/components/separator/Separator';
import { IRoute } from '@/types/navigation';
import { PropsWithChildren, useCallback } from 'react';
import { usePathname } from 'next/navigation';



interface SidebarLinksProps extends PropsWithChildren {
  routes: IRoute[][];
}



export function SidebarLinks(props: SidebarLinksProps) {

  // Extract routes from props
  const { routes }  = props;

  // Get the current browser path
  const pathname    = usePathname();

  // Chakra color mode
  let activeColor   = useColorModeValue('purple.700', 'white');
  let inactiveColor = useColorModeValue('gray.500',   'gray.500');
  let borderColor   = useColorModeValue('gray.200',   'whiteAlpha.300');
  let activeIcon    = useColorModeValue('purple.500', 'white');
  let iconColor     = useColorModeValue('purple.700', 'white');
  let gray          = useColorModeValue('gray.500',   'gray.500');
  let hoverColor    = useColorModeValue('purple.400',  'purple.200');

  // For secondary routes, use a default bullet-style arrow as the default icon
  const defaultSecondaryIcon = (
    <Icon as={PiArrowElbowDownRight} width="12px" height="12px" color="inherit" mb="4px" />
  )



  //
  // Helper functions for link attributes
  //


  /**
   * Verifies if routeName is the one active (in browser input)
   */
  const activeRoute = useCallback(
    (route: IRoute) => {

      // Consider the route path
      let routes = [ route?.path.toLowerCase() ]

      // If route has nested sub-routes, consider all of their paths as well
      if (route.items) {
        routes = routes.concat(
          route.items.map((subRoute: IRoute) => subRoute?.path.toLowerCase())
        )
      }

      // Check if the current path is any of the routes above
      return routes.includes(pathname)
    },
    [pathname],
  );

  /**
   * Return the given color if the route is currently active,
   * or the appropriate inactive / disabled color otherwise.
   */
  function getRouteColorIfActive(route: IRoute, color: string, hover: boolean = false) {
    return route.disabled ? gray : (activeRoute(route) || hover) ? color : inactiveColor
  }



  //
  // Helper functions for rendering route / link components.
  //


  /**
   * Render a link with an href to the given path.
   */
  function linkWithHref(route: IRoute, fontSize: string = "sm") {
    return (
      <NavLink
        href   = { route.layout ? route.layout + route.path : route.path }
        styles = {{ width: '100%' }}
      >
        { linkWithIcon(route, fontSize )}
      </NavLink>
    )
  }


  /**
   * Render the link text with an icon on the left-hand side.
   */
  function linkWithIcon(route: IRoute, fontSize: string = "sm") {

    // If this route defines an icon, use it, otherwise fallback to the default secondary icon
    // for secondary links or no icon otherwise
    const icon = route.icon ? route.icon : (route.secondary ? defaultSecondaryIcon : null)

    // Create an element for the icon, if applicable
    const iconElement = icon
      ? <Box
          color = "inherit"
          me    = "12px"
          mt    = "6px"
        >
          {icon}
        </Box>
      : <></>

    // Wrap the optional icon and the text in a flexbox
    return (
      <Flex w="100%" alignItems="center" justifyContent="center">
        { iconElement }
        { linkText(route, fontSize) }
      </Flex>
    );
  }


  /**
   * Render the route name as text with the appropriate styling.
   */
  function linkText(route: IRoute, fontSize: string = "sm") {
    return (
      <Text
        me            = "auto"
        fontWeight    = "500"
        letterSpacing = "0px"
        fontSize      = { fontSize }
        color         = "inherit"
      >
        {route.name}
      </Text>
    );
  }



  //
  // Helper function for rendering routes / links.
  //


  /**
   * Render a single primary route (top-level, visually).
   */
  function linkContainer(route: IRoute, isHeader: boolean) {
    return (
      <Flex
        w              = "100%"
        maxW           = "100%"
        pt             = {isHeader ? "8px" : "4px"}
        pb             = "6px"
        ps             = {isHeader ? "0px" : "17px"}
        align          = "center"
        alignItems     = "center"
        justifyContent = "space-between"
        color          = { getRouteColorIfActive(route, activeColor) }
        _hover = {{
          "color":       getRouteColorIfActive(route, hoverColor, true),
        }}
      >

        {/* Render the route name itself */}
        <HStack
          spacing = { activeRoute(route) ? '22px' : '26px' }
          w       = "100%"
        >
          { isHeader ? linkWithIcon(route) : linkWithHref(route) }
        </HStack>

        {/* If link is a header, render an accordion dropdown button next to it */}
        { isHeader
            ? <AccordionIcon
                ms    = "auto"
                color = {route.disabled ? gray : 'gray.500'}
              />
            : <></>
        }
      </Flex>
    );
  }


  /**
   * Render a single secondary route (nested under another header).
   */
  function linkContainerSecondary(route: IRoute) {
    return (
      <Flex
        ps         = "32px"
        alignItems = "center"
        mb         = "4px"
        color      = { getRouteColorIfActive(route, activeColor) }
        _hover = {{
          "color":   getRouteColorIfActive(route, hoverColor, true),
        }}
      >
        { linkWithHref(route, "xs") }
      </Flex>
    )
  }



  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes: IRoute[]) => {
    return routes.map((route, key) => {

      // If route is a header for multiple sub-pages,
      // render the link as an accordion header
      // and recursively render its children as a list in the accordion panels
      if (route.collapse && !route.invisible) {
        return (
          <Accordion defaultIndex={0} allowToggle key={key}>
            <Flex w="100%" justifyContent={'space-between'}>
              <AccordionItem border="none" w="100%">

                {/* The main route to render */}
                <AccordionButton
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{
                    bg: 'unset',
                  }}
                  _focus={{
                    boxShadow: 'none',
                  }}
                  borderRadius="8px"
                  w="100%"
                  py="0px"
                  ms={0}
                >
                  { linkContainer( route, true ) }
                </AccordionButton>

                {/* Recursively render the child routes */}
                <AccordionPanel py="0px" ps={'8px'}>
                  <List pb="8px">
                    {
                      route.icon && route.items
                        ? createLinks(route.items) // for bullet accordion links
                        : route.items
                        ? createAccordionLinks(route.items)
                        : '' // for non-bullet accordion links
                    }
                  </List>
                </AccordionPanel>

              </AccordionItem>
            </Flex>
          </Accordion>
        );
      }

      // If route is top-level, render it in its own box
      // If not (i.e. if route is nested), render it as a list item instead
      else if (!route.invisible) {
        return (route.icon && !route.secondary)

          // Top-level route
          ? (
              <Box key={key}>
                { linkContainer(route, false) }
              </Box>
          )

          // Secondary (nested) route
          : (
              <ListItem key={key} ms={0} opacity={'0.8'}>
                { linkContainerSecondary(route) }
              </ListItem>
          )
      }
    });
  };


  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createAccordionLinks = (routes: IRoute[]) => {
    return routes.map((route: IRoute, key: number) => {
      return (
        <ListItem
          ms="28px"
          display="flex"
          alignItems="center"
          mb="10px"
          key={key}
        >
          <Icon
            w="6px"
            h="6px"
            me="8px"
            as={FaCircle}
            color={route.disabled ? gray : activeIcon}
          />
          <Text
            color      = { getRouteColorIfActive(route, activeColor) }
            fontWeight = { activeRoute(route) ? 'bold' : 'normal' }
            fontSize   = "sm"
          >
            {route.name}
          </Text>
        </ListItem>
      );
    });
  };

  // Return each set of links
  return (
    <VStack spacing="20px" divider={<HSeparator></HSeparator>}>
      {routes.map((routesGroup, key) => (
        <Box
          key={key}
          w="100%"
          alignContent="left"
        >
          {createLinks(routesGroup)}
        </Box>
      ))}
    </VStack>
  );
}

export default SidebarLinks;
