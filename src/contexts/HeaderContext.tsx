import { createContext } from "react";

export type HeaderContextType = {
  title: string;
};

export const HeaderContext = createContext<HeaderContextType>({ title: "" });
