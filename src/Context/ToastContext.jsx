import { createContext, useState } from "react";
import Toast from "../Toast";

export const ToastContext = createContext({});

export const ToastProvider = ({children}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }

  return (
    <ToastContext.Provider value={showHideToast}>
      <Toast open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};
