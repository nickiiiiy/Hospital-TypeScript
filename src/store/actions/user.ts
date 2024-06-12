import userEnums from "../enums/user";

export interface UserAction {
  type: string;
  payload?: any;
  error?: string;
}

export type Dispatch = (action: UserAction) => void;

export const startRegisterUser = (): UserAction => {
  return {
    type: userEnums.REGISTER,
  };
};

export const registerSuccess = (payload: any): UserAction => {
  return {
    type: userEnums.REGISTER_SUCCESS,
    payload,
  };
};

export const registerError = (error: string): UserAction => {
  return {
    type: userEnums.REGISTER_ERROR,
    error,
  };
};

export const startAuthorizationUser = (): UserAction => {
  return {
    type: userEnums.LOGIN,
  };
};

export const loginSuccess = (payload: any): UserAction => {
  return {
    type: userEnums.LOGIN_SUCCESS,
    payload,
  };
};

export const loginError = (error: string): UserAction => {
  return {
    type: userEnums.LOGIN_ERROR,
    error,
  };
};

export const startLogoutUser = (): UserAction => {
  return {
    type: userEnums.LOGOUT,
  };
};

export const logoutSuccess = (payload: any): UserAction => {
  return {
    type: userEnums.LOGOUT_SUCCES,
    payload,
  };
};

export const logoutError = (error: string): UserAction => {
  return {
    type: userEnums.LOGOUT_ERROR,
    error,
  };
};
