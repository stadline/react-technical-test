import { createContext, useState, PropsWithChildren, useContext } from "react";

const IssueContext = createContext({
  issue: "",
  setIssue: (_issueId: string) => {},
});
export const useIssueState = () => useContext(IssueContext);

export const IssueProvider = ({ children }: PropsWithChildren<object>) => {
  const [issue, setIssue] = useState<string>("7901");

  return (
    <IssueContext.Provider
      value={{
        issue,
        setIssue,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};
