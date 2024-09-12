import { RouteSpec } from "@/types/navigation";
import { UserRole } from "@/types/types"



export const UserRoles: Record<string, UserRole> = {

  // Developer
  "dev": {
    "id":          "dev",
    "displayName": "developer",
    "article":     "a",
    "order":       0,
  },

  // Admin
  "admin": {
    "id":          "admin",
    "displayName": "administrator",
    "article":     "an",
    "order":       1,
  },

  "professor": {
    "id":          "professor",
    "displayName": "professor",
    "article":     "a",
    "order":       2,
  },

  "student": {
    "id":          "student",
    "displayName": "student",
    "article":     "a",
    "order":       3,
  },
}


/**
 * Get the RouteSpec object representing the given path from the given collection of possible routes.
 * TODO: This might have to be smarter e.g. for RegEx style matching?
 */
export function getRouteFromPath(possibleRoutes: Record<any, RouteSpec>, path: string): RouteSpec | null {
  for (let [route_name, route] of Object.entries(possibleRoutes)) {
    if (route.makeURL() == path) {
      return route;
    }
  }
  return null;
}


/**
 * Convert a list of UserRole identifier strings to a list of UserRole objects.
 * Sorts by precedence: the first element will be the highest role in the array, for display purposes.
 */
export function parseRolesList(rolesList: Array<string>) {
  return rolesList.map(role => UserRoles[role.toLowerCase()]).sort((a, b) => a.order - b.order)
}


/**
 * Check whether any of the required roles are possessed by the user in question.
 */
export function hasAnyRole(requiredRoles: Set<UserRole>, userRoles: Set<UserRole>) {
  return requiredRoles.intersection( userRoles ).size > 0
}
