"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";

interface RepoContextType {
  repo: any;
}
const RepoContext = createContext<RepoContextType>({ repo: null });
interface RepoProviderProps {
  init: any;
  children: ReactNode;
}

const RepoProvider: React.FC<RepoProviderProps> = ({ init, children }) => {
  const [repo, setRepo] = useState(init);
  return (
    <RepoContext.Provider value={{ ...repo, setRepo }}>
      {children}
    </RepoContext.Provider>
  );
};

export const useRepo = () => useContext(RepoContext);

export default RepoProvider;
