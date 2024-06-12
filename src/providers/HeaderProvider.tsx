import React, { useState, useEffect } from "react";
import { HeaderContext } from "../contexts/HeaderContext";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const HeaderProvider = ({ children }: Props) => {
  const [title, setTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTitle("Приёмы");
        break;
      case "/registration":
        setTitle("Зарегистрироваться в системе");
        break;
      case "/authorization":
        setTitle("Вход в систему");
        break;
      default:
        setTitle("");
    }
  }, [location.pathname]);

  return (
    <HeaderContext.Provider value={{ title }}>
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
