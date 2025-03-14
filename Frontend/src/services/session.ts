import { Role, roles } from "./auth";

export const startSession = (token: string, role: Role, id: number) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("id", `${id}`);

  localStorage.setItem("exp", `${Date.now() + 3600 * 1000}`);
  console.log(Date.now() + (3600 - 10) * 1000);
};

export const getToken = (): string => {
  const token = localStorage.getItem("token");
  return token ? token : "";
};

export const getRole = (): Role | null => {
  const role = localStorage.getItem("role");

  for (let i = 0; i < roles.length; i++) {
    if (role === roles[i]) return roles[i];
  }
  return null;
};
export const getId = (): string => {
  const id = localStorage.getItem("id");
  return id ? id : "";
};

export const destroySession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("exp");
  localStorage.removeItem("id");
  window.location.reload();
};
export const isLoggedIn = (): boolean => {
  const exp_ms_str: string | null = localStorage.getItem("exp");
  if (!exp_ms_str) return false;
  const exp_ms: number = Number(exp_ms_str);
  if (Date.now() >= exp_ms) {
    destroySession();
    return false;
  }

  return true;
};
