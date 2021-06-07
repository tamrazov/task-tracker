import React, { useState, createContext } from 'react';

type StateProviderProps = {children: React.ReactNode};

const StateContext = createContext<any>(undefined);
 
function StateProvider ({children}: StateProviderProps) {
  const [state, setState] = useState({
    isLogin: false,
    id: undefined,
    tasks: []
  });

  return (
    <StateContext.Provider value={[state, setState]}>
      {children}
    </StateContext.Provider>
  );
};

export {StateProvider, StateContext};