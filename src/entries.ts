type ObjectEntries<T extends object> = [keyof T, T[keyof T]][]

export const entries = <T extends object>(
  value: T
) => Object.entries(value) as ObjectEntries<T>
