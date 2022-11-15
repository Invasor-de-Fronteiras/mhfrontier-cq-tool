import { useContext } from "react";
import { createContext } from "react";

export interface DBConfig {
    name: string;
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export interface Config {
    dbs: DBConfig[];
    bin_path: string;
}

export interface ConfigState {
    config?: Config | null;
    dbSelected?: DBConfig;
}

interface ConfigContextProps extends ConfigState {
  children: React.ReactNode;
}

const context = createContext<ConfigState>({});

export function ConfigContextProvider({
  children,
  ...props
}: ConfigContextProps) {
  return (
    <context.Provider value={{ ...props }}>{children}</context.Provider>
  );
}

export const useConfig = () => useContext(context);
