import React, { useEffect, useRef } from "react";

const useAutoFocus = (): React.RefObject<HTMLInputElement> => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return inputRef;
};

export default useAutoFocus;
