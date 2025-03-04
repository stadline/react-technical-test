import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import ChatBubble from "./ChatBubble";
import useFetch from "./useFetch";
import { useIssue } from "./IssueProvider";
import { CircularProgress, Box } from "@mui/joy";
import EventItem from "./EventItem";

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
  closed_at?: string;
  closed_by?: User;
};

type Comment = {
  id: number;
  created_at: string;
  user: User;
  body: string;
};

type Event = {
  id: number;
  event: string;
  created_at: string;
  actor: User;
  label?: {
    name: string;
    color: string;
  };
};

type MergedItem = (Comment & { type: "comment" }) | (Event & { type: "event" });

export default function MessagesPane() {
  const { value, filteredUsers } = useIssue();

  const issue = useFetch<Issue>({ url: `https://api.github.com/repos/${value}` });
  const comments = useFetch<Comment[]>({ url: issue.data?.comments_url }, { enabled: issue.isFetched });
  const events = useFetch<Event[]>(
    { url: `https://api.github.com/repos/${value}/events` },
    { enabled: issue.isFetched },
  );

  if (issue.isLoading || comments.isLoading || events.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (issue.isError || comments.isError || events.isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography level="body-sm" sx={{ p: 2 }}>
          No issue for {value}
        </Typography>
      </Box>
    );
  }

  const mergedData: MergedItem[] = [
    ...(comments.data || []).map((comment) => ({ ...comment, type: "comment" as const })),
    ...(events.data || []).map((event) => ({ ...event, type: "event" as const })),
  ];

  if (issue.data?.closed_at && issue.data?.closed_by) {
    mergedData.push({
      id: issue.data.id,
      event: "closed",
      created_at: issue.data.closed_at,
      actor: issue.data.closed_by,
      type: "event" as const,
    });
  }

  mergedData.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  return (
    <Sheet
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      {issue.data && (
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.body",
          }}
          py={{ xs: 2, md: 2 }}
          px={{ xs: 1, md: 2 }}
        >
          <Typography
            fontWeight="lg"
            fontSize="lg"
            component="h2"
            noWrap
            endDecorator={
              <Chip
                variant="outlined"
                size="sm"
                color="neutral"
                sx={{
                  borderRadius: "sm",
                }}
              >
                #{issue.data?.number}
              </Chip>
            }
          >
            {issue.data.title}
          </Typography>
          <Typography level="body-sm">{issue.data.user.login}</Typography>
        </Stack>
      )}
      <Stack spacing={2} justifyContent="flex-end" px={2} py={3}>
        <ChatBubble variant="solid" {...issue.data!} />
        {mergedData
          .filter((item) =>
            item.type === "comment"
              ? !filteredUsers.includes(item.user.login)
              : !filteredUsers.includes(item.actor.login),
          )
          .map((item) => {
            if (item.type === "comment") {
              return (
                <ChatBubble
                  key={item.id}
                  variant={item.user.login === issue.data!.user.login ? "solid" : "outlined"}
                  {...item}
                />
              );
            } else if (item.type === "event") {
              return <EventItem key={item.id} {...item} />;
            }
            return null;
          })}
      </Stack>
    </Sheet>
  );
}
