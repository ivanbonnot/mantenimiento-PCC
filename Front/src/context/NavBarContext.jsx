import React, { createContext, useContext, useState } from 'react';

const NavBarContext = createContext();

export function useNavBarContext() {
  return useContext(NavBarContext);
}

export function NavBarContextProvider({ children }) {
  const [shouldRenderNavBar, setShouldRenderNavBar] = useState(true);

  return (
    <NavBarContext.Provider value={{ shouldRenderNavBar, setShouldRenderNavBar }}>
      {children}
    </NavBarContext.Provider>
  );
}
