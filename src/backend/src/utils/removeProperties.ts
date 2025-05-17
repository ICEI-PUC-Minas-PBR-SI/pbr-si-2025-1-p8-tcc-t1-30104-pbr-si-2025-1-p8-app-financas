export default function removeProperties<T, K extends keyof T>(
  obj: T,
  ...propsToRemove: K[]
): Omit<T, K> {
  const newObj = { ...obj };
  for (const prop of propsToRemove) {
    delete newObj[prop];
  }
  return newObj;
}
