import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import useFetch from "./useFetch";
import { useIssue } from "./IssueProvider";
import { groupBy } from "lodash";
import { Avatar } from "@mui/joy";

type User = {
  login: string;
  avatar_url: string;
};

type Issue = {
  id: number;
  created_at: string;
  user: User;

  number: number;
  title: string;
  body: string;
  comments_url: string;
};

type Comment = {
  id: number;
  created_at: string;
  user: User;
  body: string;
};

export default function UsersList() {
  const { value, filteredUsers, toggleFilteredUser } = useIssue();

  const issue = useFetch<Issue>({ url: `https://api.github.com/repos/${value}` });
  const comments = useFetch<Comment[]>({ url: issue.data?.comments_url }, { enabled: issue.isFetched });

  const groupedUsers = groupBy(comments.data, (comment: Comment) => comment.user.login);
  const users = Object.keys(groupedUsers).map((login) => ({
    user: groupedUsers[login][0].user,
    count: groupedUsers[login].length,
  }));

  return (
    <Sheet
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {!(issue.isError || comments.isError || issue.isLoading || comments.isLoading) && users.length > 0 && (
        <Stack spacing={1}>
          <Typography level="body-xs" sx={{ color: "text.secondary" }} fontWeight="bold">
            Users in this issue
          </Typography>
          {users.map((item) => (
            <Stack
              key={item.user.login}
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                mb: 0.25,
                textDecoration: filteredUsers.includes(item.user.login) ? "line-through" : "none",
                opacity: filteredUsers.includes(item.user.login) ? 0.4 : 1,
                cursor: "pointer",
              }}
              onClick={() => toggleFilteredUser(item.user.login)}
            >
              <Avatar size="sm" variant="solid" src={item.user.avatar_url} />
              <Typography
                level="body-xs"
                fontWeight="bold"
                color={item.user.login === issue.data?.user.login ? "primary" : "neutral"}
              >
                {item.user.login}{" "}
                <Typography level="body-xs">
                  ({item.count}) {item.user.login === issue.data?.user.login && " - Author"}
                </Typography>
              </Typography>
            </Stack>
          ))}
          <Typography level="body-xs">(Click on a user to toggle visibility)</Typography>
        </Stack>
      )}
    </Sheet>
  );
}
