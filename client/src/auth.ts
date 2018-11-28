import { onLogin, AUTH_TOKEN } from "./vue-apollo";

const USER_KEY = "user";

interface User {
  name: string;
  email: string;
  isAdmin: boolean;
}

export function logIn(token: string, user: User, apolloClient: any) {
  // Save user data in localStorage
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // Apollo will save the token and use it to authorize all future requests
  onLogin(apolloClient, token);
}

export function isLoggedIn() {
  return (
    Boolean(localStorage.getItem(USER_KEY)) &&
    Boolean(localStorage.getItem(AUTH_TOKEN))
  );
}

export function getUser(): User | null {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem(USER_KEY) || "{}");
  }

  return null;
}
