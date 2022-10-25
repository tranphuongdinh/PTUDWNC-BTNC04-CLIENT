import { request } from "./index";

export const register = async (data) => request("POST", "/register", data);

export const login = async (data) => request("POST", "/login", data);
