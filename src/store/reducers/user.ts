import userEnums from "../enums/user";

interface User {
  id: string;
  login: string;
}

interface UserState {
  error: string | null;
  user: User | {};
  isAuth: boolean;
}

const initialState: UserState = {
  error: null,
  user: {},
  isAuth: false,
};

type UserAction = {
  type: string;
  user?: User;
  error?: string;
};

// action?
export const userReducer = (
  state: UserState = initialState,
  action: UserAction
) => {
  switch (action.type) {
    case userEnums.REGISTER:
      return {
        ...state,
        error: null,
      };

    case userEnums.REGISTER_SUCCESS:
      return {
        error: null,
        isAuth: true,
        user: action.user,
      };

    case userEnums.REGISTER_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case userEnums.LOGIN:
      return {
        ...state,
        error: null,
      };
    case userEnums.LOGIN_SUCCESS:
      return {
        error: null,
        isAuth: true,
        user: action.user,
      };
    case userEnums.LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case userEnums.LOGOUT:
      return {
        ...state,
        error: null,
      };
    case userEnums.LOGOUT_SUCCES:
      return {
        error: null,
        isAuth: false,
        user: {},
      };
    case userEnums.LOGOUT_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
