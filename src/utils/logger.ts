export const log = (message: string, ...rest: string[]) => {
  console.log(`[${Date.now().toString()}]`, message, ...rest);
};
