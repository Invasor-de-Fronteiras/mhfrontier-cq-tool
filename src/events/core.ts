import { invoke } from "@tauri-apps/api";

interface Result<T> {
  success: boolean;
  data: T;
  error?: string;
}

export const tryParse = <T>(value: string): Result<T> => {
  try {
    return JSON.parse(value) as Result<T>;
  } catch(err) {
    throw Error(`Failed to parse response: ${err}`);
  }
}

export const prepareEventPayload = <T>(payload?: T): string | undefined => {
  if (!payload) {
    return undefined;
  }

  if (typeof payload === 'string') {
    return payload;
  }

  return JSON.stringify(payload);
}

export const invokeEvent = async <T, R>(command: string, payload?: T): Promise<R> => {
  console.log(command, ':', payload);
  const event = prepareEventPayload(payload);
  const response: string = await invoke(command, {
    event
  });

  console.log(command, ' (response):', response);

  if (!response) {
    throw Error("No response!");
  }

  const result = tryParse<R>(response);

  if (result.error) {
    throw Error(result.error);
  }

  if (!result.success) {
    throw Error("Unexpected error");
  }

  return result.data;
}
