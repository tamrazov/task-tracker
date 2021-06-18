export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const debounce = <F extends ((...args: any) => any)>(func: F, waitFor: number) => {
  let timeout: number = 0;
  const debounced = (...args: any) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), waitFor);
  };
  
  return debounced as (...args: Parameters<F>) => ReturnType<F>;
}

export const pingServer = <F extends ((...args: any[]) => void)>(func: F, limit: number) => {
  let interval: any;

  return function (...args: any) {
    interval = setInterval(() => func(...args), limit);
  };
};

export const getRandomArg = (...args: any[]) => {
  let random = Math.floor(Math.random() * args.length);

  return args[random];
};
