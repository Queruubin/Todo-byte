import { appSaveUser } from "@/store/userStore";
import type { User } from "../types/types";
import axiosInstance from "./api";

export async function isAuth() {
  try {
    const { data } = await axiosInstance.get<User>('auth/isAuth')
    if (!data) {
      return undefined;
    }
    appSaveUser(data);
    window.location.href = '/tasks';
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}