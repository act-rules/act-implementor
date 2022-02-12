export function assert(bool: any, msg: string): asserts bool {
  if (!bool) {
    throw new Error(msg);
  }
}
