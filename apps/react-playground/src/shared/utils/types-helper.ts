export type ObjectValue<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
}[keyof T];
