import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  path: string;
  component: JSX.Element;
}
interface RootState {
  user: {
    isAuth: boolean;
  };
}

const WithAuthCheck = ({ path, component }: Props) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return navigate(path);
    }
  }, [isAuth]);

  return component;
};

export default WithAuthCheck;
