import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FormData from "../../FormData";
import Header from "../../Header";
import CustomInput from "../../CustomInput";
import useAutoFocus from "../../../hooks/useAutoFocus";
import { Snackbar } from "@mui/material";
import useAction from "../../../hooks/useAction";
import { validateInput } from "../../../helpers/validatePassword";
import { StyledWrapper } from "./style";

type User = {
  login: string;
  password: string;
  passwordConfirm: string;
};

type Error = {
  loginError: string;
  passwordError: string;
  passwordConfirmError: string;
};

type Snackbar = {
  open: boolean;
  message: string;
};

type RootReduxState = {
  user: {
    error: string[];
  };
};

const Registration = () => {
  const [newUser, setNewUser] = useState<User>({
    login: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState<Error>({
    loginError: "",
    passwordError: "",
    passwordConfirmError: "",
  });
  const [snackbar, setSnackbar] = useState<Snackbar>({
    open: false,
    message: "",
  });

  const errors = useSelector((state: RootReduxState) => state.user.error);

  const { registerUser } = useAction();

  const inputRef = useAutoFocus();

  useEffect(() => {
    if (errors && errors.length > 0) {
      setSnackbar({
        ...snackbar,
        open: true,
        message:
          "Извините, произошла ошибка. Данный логин уже занят другим пользователем.",
      });
    }
  }, [errors]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newUser.login.trim().length < 6) {
      setError({
        ...error,
        loginError: "Длина логина должна быть не менее 6 символов.",
      });
      return;
    }

    if (!validateInput(newUser.password.trim())) {
      setError({
        ...error,
        passwordError:
          "Пароль должен быть длиной не менее 6 символов, содержать хотя бы одну латинскую букву и одну цифру.",
      });
      return;
    }

    if (newUser.passwordConfirm.trim() !== newUser.password.trim()) {
      setError({
        ...error,
        passwordConfirmError: "Пароли не совпадают, попробуйте ещё раз",
      });
      return;
    }
    const trimmedLogin = newUser.login.trim();
    const trimmedPassword = newUser.password.trim();

    registerUser({
      ...newUser,
      login: trimmedLogin,
      password: trimmedPassword,
    });

    setError({
      loginError: "",
      passwordError: "",
      passwordConfirmError: "",
    });
    setNewUser({
      login: "",
      password: "",
      passwordConfirm: "",
    });
  };

  return (
    <StyledWrapper>
      <Header isShowButton={false} />
      <FormData
        handleSubmit={handleSubmit}
        title="Регистрация"
        buttonText="Зарегистрироваться"
        linkText="Авторизоваться"
        linkUrl="/authorization"
      >
        <CustomInput
          error={error}
          name="login"
          type="text"
          value={newUser.login}
          refValue={inputRef}
          handleChangeInput={handleChangeInput}
          placeholder="Логин"
          label="Логин:"
          required
        />
        <CustomInput
          error={error}
          name="password"
          type="password"
          value={newUser.password}
          handleChangeInput={handleChangeInput}
          placeholder="Пароль"
          label="Пароль:"
          required
        />
        <CustomInput
          error={error}
          name="passwordConfirm"
          type="password"
          value={newUser.passwordConfirm}
          handleChangeInput={handleChangeInput}
          placeholder="Повторить пароль"
          label="Повторить пароль:"
          required
        />
      </FormData>
      {snackbar.open && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ open: false, message: "" })}
          message={snackbar.message}
        />
      )}
    </StyledWrapper>
  );
};

export default Registration;
