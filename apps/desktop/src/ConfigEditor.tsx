import { useEffect, useState } from "react";
import { Config, ConfigContextProvider } from "ui";
import { getConfig } from "./events";

interface ConfigEditorProps {
    children: React.ReactNode;
}

function ConfigEditor({ children }: ConfigEditorProps) {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    getConfig()
        .then(v => {
            setConfig(v)
        })
        .catch(() => {
            console.log('config.json not found');
        });
  }, []);

  return (
    <ConfigContextProvider
      config={config}
    >
      {children}
    </ConfigContextProvider>
  );
}

export default ConfigEditor;
