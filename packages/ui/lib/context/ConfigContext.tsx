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
    dbSelected?: DBConfig | null;
    setDBSelected: (db: DBConfig | null) => void;
}

interface ConfigContextProps extends ConfigState {
  children: React.ReactNode;
}

const context = createContext<ConfigState>({} as ConfigState);

export function ConfigContextProvider({
  children,
  ...props
}: ConfigContextProps) {
  return (
    <context.Provider value={{ ...props }}>{children}</context.Provider>
  );
}

export const useConfig = () => useContext(context);

export const useDatabaseSelected = (): DBConfig | null => {
  const { dbSelected } = useConfig();

  return dbSelected || null;
}
