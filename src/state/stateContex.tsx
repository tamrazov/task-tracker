import React, { useState, createContext } from 'react';

type StateProviderProps = {children: React.ReactNode};

const StateContext = createContext<any>(undefined);

const worker = new SharedWorker("/sharedWorker.js");
worker.port.start();
 
function StateProvider ({children}: StateProviderProps) {
  const [state, setState] = useState({
    isLogin: false,
    id: undefined,
    tasks: [],
    worker
  });

  return (
    <StateContext.Provider value={[state, setState]}>
      {children}
    </StateContext.Provider>
  );
};

export {StateProvider, StateContext};