import api from "../../axios";

export interface RegisterUserData {
  login: string;
  password: string;
}

export interface LoginUserData {
  login: string;
  password: string;
}

export interface ResponseData {
  data: any;
  accessToken: string;
}

export const registerUserService = async (
  userData: RegisterUserData
): Promise<ResponseData> => {
  const response = await api.post("/user/registration", userData);
  return response.data;
};

export const loginUserService = async (
  userData: LoginUserData
): Promise<ResponseData> => {
  const response = await api.post("/user/authorization", userData);
  return response.data;
};

export const logoutUserService = async (): Promise<{ data: any }> => {
  const response = await api.get("/user/logout");
  return response.data;
};
