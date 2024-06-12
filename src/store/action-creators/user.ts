import {
  startRegisterUser,
  registerSuccess,
  registerError,
  startAuthorizationUser,
  loginSuccess,
  loginError,
  startLogoutUser,
  logoutSuccess,
  logoutError,
} from "../actions/user";
import {
  registerUserService,
  loginUserService,
  logoutUserService,
} from "../../components/services/user";

// interface UserData {
//   login: string;
//   password: string;
// }

// interface ResponseData {
//   data: any;
//   accessToken: string;
// }

// type ErrorResponseData = {
//   message: string;
// };

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
export interface DispatchType {
  (action: any): void;
}
export const registerUser = (userData: RegisterUserData) => {
  return async (dispatch: DispatchType) => {
    try {
      dispatch(startRegisterUser());

      const response = await registerUserService(userData);

      dispatch(registerSuccess(response.data));
      localStorage.setItem("token", response.accessToken);
    } catch (error: any) {
      const errorText = error.response.data;

      dispatch(registerError(errorText.message));
    }
  };
};

export const loginUser = (userData: LoginUserData) => {
  return async (dispatch: DispatchType) => {
    try {
      dispatch(startAuthorizationUser());

      const response = await loginUserService(userData);

      dispatch(loginSuccess(response.data));
      localStorage.setItem("token", response.accessToken);
    } catch (error: any) {
      const errorText = error.response.data;

      dispatch(loginError(errorText.message));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: DispatchType) => {
    try {
      dispatch(startLogoutUser());
      const response = await logoutUserService();
      dispatch(logoutSuccess(response.data));
      localStorage.removeItem("token");
    } catch (error: any) {
      const errorText = error.response.data;

      dispatch(logoutError(errorText.message));
    }
  };
};
