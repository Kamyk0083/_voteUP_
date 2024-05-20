import { createContext, useContext, useState, ReactNode } from "react";

interface VotingContextType {
  votingEnded: boolean;
  setVotingEnded: (ended: boolean) => void;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export const VotingProvider = ({ children }: { children: ReactNode }) => {
  const [votingEnded, setVotingEnded] = useState(false);

  return (
    <VotingContext.Provider value={{ votingEnded, setVotingEnded }}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error("useVoting must be used within a VotingProvider");
  }
  return context;
};
