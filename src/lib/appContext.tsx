import React, {
  ReactChild,
  ReactFragment,
  ReactPortal,
  useCallback,
  useEffect,
  useState,
} from "react";

const AppContext = React.createContext<any>(undefined);

type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

export const AppWrapper: React.FC<ReactNode> = ({ children }) => {
  const [volumeLevel, setVolume] = useState(30);

  const changeVolume = (value: number) => {
    setVolume(value);
    localStorage.setItem("volume", value.toString());
  };

  const getInitialVolume = useCallback(() => {
    const volume = localStorage.getItem("volume");
    setVolume(volume ? Number(volume) : volumeLevel);
  }, [volumeLevel]);

  useEffect(() => {
    getInitialVolume();
  }, []);

  return (
    <AppContext.Provider
      value={{
        volume: volumeLevel,
        changeVolume,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
