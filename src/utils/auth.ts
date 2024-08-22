// Adapted from https://stackoverflow.com/a/65374098
export function getCookie(key: string): string {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? (b.pop() ?? "") : "";
}


export function login(gotoURL: RequestInfo | URL = '', returnURL: RequestInfo | URL = '') {

  // Define the return URL on the API after successful authorization
  if (!gotoURL) {
    gotoURL = `${process.env.API_URL}/auth/login`;
  }

  // Define the return URL on the client after a successful login
  if (!returnURL) {
    returnURL = `${window.location.origin}/`;
  }

  // Redirect to the SSO provider
  const login_url = `${ process.env.SSO_URL }?goto=${ gotoURL }?continue_to=${ returnURL }`;
  window.location.href = login_url;
}
