import { invokeEvent } from "./core";

interface ReFrontierPayload {
  filepath: string;
  re_frontier_path: string;
}

export const refrontier = async (filepath: string): Promise<string> => {
  return invokeEvent<ReFrontierPayload, string>(
    're_frontier',
    {
      filepath,
      re_frontier_path: "./ReFrontier/ReFrontier.exe",
    }
  );
}
