export const debounce = (func: { (newSettings: any): Promise<void>; (token: any, settings: any): Promise<void>; apply?: any; }, delay = 1000) => {
  let timeoutId: any;
  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
