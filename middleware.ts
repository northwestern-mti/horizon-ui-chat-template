// NextJS Imports
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Project Imports
import { WEB_ROUTES, API_ROUTES } from '@/route_spec';



// The domain of the API
const API_URL = process.env.API_URL;

// List of routes available to the public
// Middleware function will not be called on these
const publicRoutes = Object.entries(WEB_ROUTES).flatMap(([routeName, route]) => {
  return route.isPublic ? [route.makeURL()] : []
})



/**
 * Middleware
 *
 * Runs before routes are loaded, and performs user authentication:
 *   - If user is not logged in, redirects to login page
 */
export default async function middleware(req: NextRequest) {

  // Check the intended next URL
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)

  // Try getting a user object from the current session cookie
  // This involves calling the API and forwarding all cookies
  let userData = null
  try {
    userData = await (
      await fetch(new URL(API_ROUTES.get_user.makeURL(), API_URL), {
        credentials: 'include',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Cookie": cookies().getAll().map(({name, value}) => `${name}=${value}`).join('; '),
        }
      })
    ).json()
  }

  // If the API is not available, redirect to the error page
  catch (e) {
    return (path === WEB_ROUTES.error.makeURL())
      ? NextResponse.next()
      : NextResponse.redirect(new URL(WEB_ROUTES.error.makeURL(), req.nextUrl))
  }

  // If user not logged in, redirect to the login route
  if (!isPublicRoute && !(userData)) {
    return NextResponse.redirect(new URL(WEB_ROUTES.login.makeURL(), req.nextUrl))
  }

  // If user is logged in, redirect login page to default route
  const response = (isPublicRoute && userData)
    ? NextResponse.redirect(new URL(WEB_ROUTES.home.makeURL(), req.nextUrl))
    : NextResponse.next()

  // Add the retrieved user data to the response object, so we can use it to render the new page
  response.cookies.set( 'userData', JSON.stringify(userData) )

  // Return the next page
  return response
}


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.png$).*)'],
}
