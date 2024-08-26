import { Icon } from './lib/chakra';
import {
  MdFileCopy,
  MdHome,
  MdLock,
  MdLayers,
  MdAutoAwesome,
  MdOutlineManageAccounts,
  MdMessage,
  MdOutlineHelp,
  MdPerson,
} from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { IoIosHelpCircle } from "react-icons/io";
import { LuHistory } from 'react-icons/lu';
import { RoundedChart } from '@/components/icons/Icons';

// Auth Imports
import { IRoute } from './types/navigation';



const API_URL = process.env.API_URL;


export const ROUTES: Record<string, IRoute> = {

  // Default homepage
  'home': {
    name: 'Home',
    path: '/',
    icon: (
      <Icon as={MdHome} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },

  // Login page
  'login': {
    name: '',
    path: '/auth/login',
    isPublic: true,
  },

  // Error page
  'error': {
    name: 'Error',
    path: '/error',
  },

  // Contacts page
  'contacts': {
    name: 'Contacts',
    path: '/contacts',
    icon: (
      <Icon as={MdPerson} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },

  'instructions': {
    name: 'Instructions',
    path: '/instructions',
    icon: (
      <Icon as={IoIosHelpCircle} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },
};


export const API_ROUTES: Record<string, (...urlVars: string[]) => string> = {
  "login":
    (continue_to?: string) => continue_to
      ? `/auth/login?continue_to=${continue_to}`
      : "/auth/login",

  "get_user":
    () => "/user",

  "list_conversations":
    () => "/conversations",

  "list_all_conversations":
    () => "/conversations/all",

  "show_conversation":
    (conversation_id: string) => `/conversation/${conversation_id}`,

  "message":
    (conversation_id: string) => `/conversation/${conversation_id}/message`,
}



const routes: IRoute[] = [

  // --- Main Pages ---
  {
    name: 'Home',
    path: '/',
    icon: (
      <Icon as={MdHome} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },
  {
    name: 'Olivia, Andrew, Me',
    path: '/conversation/test_conversation',
    icon: (
      <Icon as={MdMessage} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },
  {
    name: 'Instructions',
    path: '/instructions',
    icon: (
      <Icon as={IoIosHelpCircle} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },

  // --- Others ---
  {
    name: 'Other Pages',
    invisible: true,
    disabled: true,
    path: '/others',
    icon: <Icon as={MdFileCopy} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: 'Prompt Page',
        layout: '/others',
        path: '/prompt',
      },
      {
        name: 'Register',
        layout: '/others',
        path: '/register',
      },
      {
        name: 'Sign In',
        layout: '/others',
        path: '/sign-in',
      },
    ],
  },

  // --- Admin Pages ---
  {
    name: 'Admin Pages',
    invisible: true,
    disabled: true,
    path: '/admin',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: 'All Templates',
        layout: '/admin',
        path: '/all-admin-templates',
      },
      {
        name: 'New Template',
        layout: '/admin',
        path: '/new-template',
      },
      {
        name: 'Edit Template',
        layout: '/admin',
        path: '/edit-template',
      },
      {
        name: 'Users Overview',
        layout: '/admin',
        path: '/overview',
      },
    ],
  },
  {
    name: 'Profile Settings',
    disabled: true,
    path: '/settings',
    icon: (
      <Icon
        as={MdOutlineManageAccounts}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    invisible: true,
    collapse: false,
  },
  {
    name: 'History',
    disabled: true,
    path: '/history',
    icon: <Icon as={LuHistory} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Usage',
    disabled: true,
    path: '/usage',
    icon: <Icon as={RoundedChart} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'My plan',
    disabled: true,
    path: '/my-plan',
    icon: <Icon as={RoundedChart} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
];



export async function fetchRoutes(): Promise<IRoute[][]> {

  // Fetch the list of conversations available to this user from the API
  let conversations = []
  try {
    conversations = await (
      await fetch(
        `${API_URL}/${API_ROUTES.list_conversations()}`,
        {
          credentials: 'include',
        }
      )
    ).json()
  }

  // If API lookup fails, don't show any routes in the sidebar
  catch (e) {
    return [];
  }

  // Map the list of conversations to a list of route objects
  const conversationRoutes = conversations
    .map(({scenario, conversations}: {scenario: any, conversations: any}) => ({

      // Top-level name is the title of the scenario
      name: scenario?.title || scenario?.ds_key,
      path: `/scenario/${scenario?.ds_key}`,

      // Chat icon
      icon: (
        <Icon as={MdMessage} width="20px" height="20px" color="inherit" />
      ),

      // Add a sub-route for each conversation in this scenario
      collapse: true,
      items: [
        ...conversations.map((conversation: any) => ({
          secondary: true,

          // If the conversation has a title, use it, otherwise name it after the date it was started
          name: conversation?.title || `Chat from ${new Date(Date.parse(conversation?.created_on)).toDateString()}`,

          // Use the scenario title as the page title for each conversation
          title: scenario?.title || '',

          // Link to the conversation
          path: `/conversation/${conversation.ds_key}`,
        })),
      ],
    }))

  // Insert the list of conversations into the routes list
  return [
    [
      ROUTES.home,
      ROUTES.contacts,
    ],
    conversationRoutes,
  ];
}


export default { ROUTES, API_ROUTES, fetchRoutes }
