"use client";
import React, { createContext, useContext, ReactNode } from "react";

interface RepoContextType {
  repo: any;
}
const RepoContext = createContext<RepoContextType>({ repo: null });
interface RepoProviderProps {
  repo: any;
  children: ReactNode;
}

const RepoProvider: React.FC<RepoProviderProps> = ({ repo, children }) => {
  return <RepoContext.Provider value={repo}>{children}</RepoContext.Provider>;
};

export const useRepo = () => useContext(RepoContext);

export default RepoProvider;
