import { useEffect, useState } from "react";
import { Config, ConfigContextProvider, DBConfig } from "ui";
import { getConfig } from "./events";

interface ConfigEditorProps {
    children: React.ReactNode;
}

function ConfigEditor({ children }: ConfigEditorProps) {
  const [config, setConfig] = useState<Config | null>(null);
  const [dbSelected, setDBSelected] = useState<DBConfig | null>(null);

  useEffect(() => {
    getConfig()
        .then(v => {
            setConfig(v)
        })
        .catch(() => {
            console.log('config.json not found');
        });
  }, []);

  useEffect(() => {
    if (dbSelected || !config || !config.dbs) return;

    setDBSelected(config.dbs[0]);
  }, [config]);

  return (
    <ConfigContextProvider
      config={config}
      dbSelected={dbSelected}
    >
      {children}
    </ConfigContextProvider>
  );
}

export default ConfigEditor;
