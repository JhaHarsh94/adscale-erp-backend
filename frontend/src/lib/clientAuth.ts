import type { ClientUser } from "../types/clientPortal";

const TOKEN_KEY = "adscale_client_token";
const USER_KEY = "adscale_client_user";

export function saveClientAuth(token: string, user: ClientUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getClientToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getClientUser(): ClientUser | null {
  const user = localStorage.getItem(USER_KEY);

  if (!user) return null;

  try {
    return JSON.parse(user) as ClientUser;
  } catch {
    return null;
  }
}

export function clientLogout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isClientAuthenticated() {
  return Boolean(getClientToken());
}
