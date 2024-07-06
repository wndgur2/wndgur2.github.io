import { createContext } from "react";

export const DeviceContext = createContext({
    isDark: false,
    setIsDark: (isDark: boolean) => { },
    innerWidth: 0,
});