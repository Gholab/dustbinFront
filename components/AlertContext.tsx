import React, { createContext, useContext, useState } from "react";

export type Alert = {
  type: string;
  title: string;
  message: string;
  date: string;
  time: string;
};

type AlertContextType = {
  alerts: Alert[];
  addAlert: (type: string, title: string, message: string) => void;
  removeAlert: (index: number) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (type: string, title: string, message: string) => {
    const now = new Date();
    setAlerts((prev) => [
      ...prev,
      {
        type,
        title,
        message,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
      },
    ]);
  };

  const removeAlert = (index: number) => {
    setAlerts((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used inside AlertProvider");
  return context;
};
