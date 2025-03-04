import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface IssueContextProps {
  value: string;
  setValue: (value: string) => void;
  filteredUsers: string[];
  toggleFilteredUser: (users: string) => void;
}

const IssueContext = createContext<IssueContextProps | undefined>(undefined);

export const IssueProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<string>("facebook/react/issues/7901");
  const [filteredUsers, setFilteredUsers] = useState<string[]>([]);

  useEffect(() => {
    setFilteredUsers([]);
  }, [value]);

  const toggleFilteredUser = (user: string) => {
    setFilteredUsers((prevFilteredUsers) => {
      if (prevFilteredUsers.includes(user)) {
        return prevFilteredUsers.filter((u) => u !== user);
      } else {
        return [...prevFilteredUsers, user];
      }
    });
  };

  return (
    <IssueContext.Provider value={{ value, setValue, filteredUsers, toggleFilteredUser }}>
      {children}
    </IssueContext.Provider>
  );
};

export const useIssue = () => {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error("useIssue must be used within an IssueProvider");
  }
  return context;
};
