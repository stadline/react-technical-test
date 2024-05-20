import { useEffect, useState } from "react";

const useGetIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  useEffect(() => {
    const headers = { Authorization: `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}` };

    fetch("https://api.github.com/repos/facebook/react/issues?per_page=100", {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        }
        return data;
      })
      .then((data) => setIssues(data))
      .catch((error) => console.error("Error fetching issues: ", error));
  }, []);

  return issues || [];
};

export default useGetIssues;
