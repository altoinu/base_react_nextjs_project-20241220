export interface ConfigData {
  env: string;
  envLongName: string;
  envName: string;
  ip: string;
}

export function isConfigData(value: unknown): value is ConfigData {
  return (
    value !== undefined &&
    value !== null &&
    (value as ConfigData).env != undefined &&
    typeof (value as ConfigData).env === "string" &&
    (value as ConfigData).envLongName != undefined &&
    typeof (value as ConfigData).envLongName === "string" &&
    (value as ConfigData).envName != undefined &&
    typeof (value as ConfigData).envName === "string" &&
    (value as ConfigData).ip != undefined &&
    typeof (value as ConfigData).ip === "string"
  );
}
