import { Stack, Typography, Avatar } from "@mui/joy";

type EventItemProps = {
  event: string;
  created_at: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  label?: {
    name: string;
    color: string;
  };
};

export default function EventItem({ actor, created_at, event, label }: EventItemProps) {
  return (
    <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar size="sm" variant="solid" src={actor.avatar_url} />
      <Typography level="body-sm">
        <Typography fontWeight="bold">{actor.login}</Typography> {event}
      </Typography>
      {label && (
        <Typography
          sx={{
            backgroundColor: `#${label.color}`,
            color: "white",
            px: 1,
            borderRadius: "sm",
          }}
        >
          {label.name}
        </Typography>
      )}
      <Typography level="body-xs" sx={{ opacity: 0.5 }}>
        {created_at}
      </Typography>
    </Stack>
  );
}
