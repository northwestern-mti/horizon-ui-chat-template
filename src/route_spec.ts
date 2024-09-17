import { RouteSpec } from './types/navigation';
import { UserRoles } from './utils/roles';



export const WEB_ROUTES: Record<string, RouteSpec> = {

  // Default homepage
  'home': {
    makeURL: () => '/',
  },

  // Login page
  'login': {
    makeURL: () => '/auth/login',
    isPublic: true,
  },

  // Error page
  'error': {
    makeURL: () => '/error',
  },

  // Contacts page
  'contacts': {
    makeURL: () => '/contacts',
  },

  'instructions': {
    makeURL: () => '/instructions',
  },

  'admin_pages': {
    makeURL: () => '/admin',
    requiredRole: new Set([UserRoles.dev, UserRoles.admin]),
  },
};


/**
 * API endpoints
 */
export const API_ROUTES: Record<string, RouteSpec> = {
  "login": {
    makeURL: (continue_to?: string) =>
      continue_to
        ? `/auth/login?continue_to=${continue_to}`
        : "/auth/login",
  },

  "get_user": {
    makeURL: () => "/user",
  },

  "list_conversations": {
    makeURL: () => "/conversations",
  },

  "list_all_conversations": {
    makeURL: () => "/conversations/all",
  },

  "show_conversation": {
    makeURL: (conversation_id: string) => `/conversation/${conversation_id}`,
  },

  "message": {
    makeURL: (conversation_id: string) => `/conversation/${conversation_id}/message`,
  },

  "create_user": {
    makeURL: () => `/user/create`,
  },
}


export default { WEB_ROUTES, API_ROUTES }
